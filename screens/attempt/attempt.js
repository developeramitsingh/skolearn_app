import { View, Text, Alert, SafeAreaView, Switch, TouchableHighlight, BackHandler } from 'react-native';
import { attemptStyles } from './attemptStyles';
import { useState, useEffect,useRef } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';
import BackBtn from '../../components/backBtn/backBtn';
import testService from '../../services/testService';
import { freeTicketsService, sendAppLogService, transactionService, walletService } from '../../services';
import Loader from '../../components/loader/loader';
import { generateOrderId } from '../../utils/utils';

const Attempt = ({navigation, route }) => {
    const [state, setState] = useState({
        userId: '',
        walletMoney: 0,
        freeTickets: 0,
        testName: '',
        userEnrolled: 0,
        userSeats: 0,
        expireOn: '',
        entryFee: 0,
        isLangHindi: false,
    });
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const backHandler = useRef();

    const fetchInitialData = async () => {
        setLoading(true);
        await getWalletBalance();
        await getFreeTickets();
        setLoading(false);
    }

    const generateTestQuestions = async (language, testId) => {
        try {
            console.info('generateTestQuestions called');
            const query = `{ "language": "${language}", "testId": "${testId}" }`;
            const testQuesData = await testService.generateTestQues(query);

            return testQuesData?.data?.data
        } catch(err) {
            console.error(`error in generateTestQuestions: ${err}`);
        }
    }

    
    useEffect(() => {
          const backAction = () => {
            console.info(`backAction called in attempt screen`);
            navigation.navigate(Constant.ROUTES.DASHBOARD);
            return true;
          };

          backHandler.current = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => { 
            console.info(`cleaning function in attempt screen`);
            backHandler.current.remove();
          };
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(()=> {
        if(route?.params?.test && !state.testName) {
            setState((prev) => {
                return { ...prev, ...route.params.test }
            })
        }

        if (route?.params?.userId && !state.userId) {
            setState((prev) => {
                return { ...prev, userId: route?.params?.userId }
            })
        }
    }, [route?.params?.test, route?.params?.userId]);

    const createTransaction = (amount, txnTitle, txnType) => {
        const userIdStr = route?.params?.userId || state.userId;
        console.info('createTransaction called', userIdStr);
        const orderId = generateOrderId(userIdStr);
        // if success then create a transaction entry
        const txnBody = {
            orderId,
            txnAmount: `${amount}`,
            isSuccess: true,
            status: Constant.TXN_STATUS.SUCCESS,
            txnTitle,
            txnType,
            txnId: route?.params?.test?._id,
            txnDate: new Date().toISOString()
        }
        console.info({ orderId, txnBody });
        sendAppLogService.sendAppLogs({ msg: 'txnBody in create Txn of attempt', orderId, txnBody });

        transactionService.createTransaction(txnBody)
            .catch(err => {
                const erroMsg = `error in createTransaction for attempt: ${err}`;
                console.error(erroMsg);
                sendAppLogService.sendAppLogs({ erroMsg })
            });
    }


    const showAlert = (type, msg) => {
        Alert.alert(type, msg, [
            {
                text: 'Close', onPress: () => {}
            },
        ])
    };

    const handlePress = async ()=> {
        const test = route?.params?.test;
        const entryFee = +state.entryFee;
        const walletMoney = +state.walletMoney;
        const freeTickets = +state.freeTickets;

        //check wallet or free ticket if has then allow else not
        if (walletMoney < entryFee && !freeTickets) {
            showAlert('Notice', 'Wallet Money is insufficient, please add money');

            return;
        }

        const alertMsg= 'We need to use camera and microphone for security and transparency purpose, Please remove any headphone or headset before the test.';
        
        Alert.alert('Test Requirements', alertMsg, [
            {
                text: 'Cancel Attempt', onPress: () => {
                    console.info(`cancelled`);
                }
            },
            {
                text: 'Ok To Proceed', onPress: async () => {
                    try {
                        setLoading(true);
                        setDisabled(true);
                        const testId = test?._id;
                        const seatAvailableStatus = await testService.getEnrolledSeatStatus(testId);

                        //if seats not available then exit
                        if (!seatAvailableStatus?.data?.isSeatAvailable) {
                            showAlert('Info', 'Test seats full!. please attempt another test.');
                            setLoading(false);
                            setDisabled(false);

                            return;
                        }

                        const language = state.isLangHindi ? 'hindi' : 'english';

                        const testQusData = await generateTestQuestions(language, testId);

                        console.info({testQusData});

                        //if test data not found then skip the all the cases
                        if (!testQusData?.length) {
                            console.warn(`test data not found in gnerate test questions`);
                            showAlert('Info', 'Network failed, Please try again!');
                            setLoading(false);
                            setDisabled(false);

                            return;
                        }

                        //deduct the money or free ticket
                        if (freeTickets) {
                            const ticket = freeTickets - 1;
                            freeTicketsService.updateFreeTickets({ freeTickets: ticket });

                            const txnTitle = '1 Free Ticket Deducted for Attempting the Test';
                            createTransaction(entryFee, txnTitle, Constant.TXN_TYPE.FREE_TICKET_DEDUCTED_FOR_TEST);
                        } else if (state.walletMoney) {
                            
                            const balance = walletMoney - entryFee;
                            walletService.updateWallet({ balance });

                            const txnTitle = `${entryFee} Rs. Deducted from Wallet for Attempting the Test`;
                            createTransaction(entryFee, txnTitle, Constant.TXN_TYPE.WALLET_DEDUCTED_FOR_TEST);
                        }

                        //increment the user enrolled count
                        testService.incrementEnrolledCount(testId);

                        setLoading(false);
                        setDisabled(false);

                        // remove event listeners
                        if (backHandler.current) {
                            backHandler.current.remove();
                        }
                        //navigate to timer screen for test attempt
                        navigation.navigate(Constant.ROUTES.TEST_TIMER_SCREEN, { testQusData, testId });
                    } catch (err) {
                        console.error(`error while attempting: ${err}`);
                        setLoading(false);
                        setDisabled(false);
                        showAlert('Info', 'Network failed, Please try again!');
                    }
                }
            },
            
        ]);   
    }

    const getWalletBalance = async () => {
        try {
            const walletData = await walletService.getWalletBalance();

            if (walletData?.data) {
                setState((prev) => {
                    return { ...prev, walletMoney: walletData.data.balance || 0 }
                })
            }
        } catch (err) {
            console.error(`error in getWalletBalance: ${err}`);
        }
    }

    const getFreeTickets = async () => {
        try {
            const freeTickets = await freeTicketsService.getFreeTickets();

            if (freeTickets?.data) {
                setState((prev) => {
                    return { ...prev, freeTickets: freeTickets.data.freeTickets || 0 }
                })
            }
        } catch (err) {
            console.error(`error in getWalletBalance: ${err}`);
        }
    }

    const langSwitch = (val) => {
        console.info(val);
        setState(prev => {
            return { ...prev, isLangHindi: val}
        });
    }
  return (
      <SafeAreaView style={attemptStyles.container}>
        <Loader isLoading={isLoading}/>
        <BackBtn navigation={navigation} routeToGo={Constant.ROUTES.DASHBOARD} color={Constant.APP_COLORS.black}/>

        <View style={[attemptStyles.container, { justifyContent: 'space-between' } ]}>
            <View style ={COMMON_STYLES.ROW}>
                    <View style={attemptStyles.COL_LEFT}>
                        <View>
                            <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color="blue" />
                        </View>
                        <View>
                            <Text style={attemptStyles.LABEL_TEXT}>Users Joined</Text>
                            <Text style={attemptStyles.LABEL_TEXT}>{state.userEnrolled}/{state.userSeats}</Text>
                        </View>
                    </View>

                    <View style={attemptStyles.COL_RIGHT}>
                        <Text style={attemptStyles.LABEL_TEXT}>Expires On</Text>
                        <Text style={attemptStyles.LABEL_TEXT}>{state.expireOn}</Text>
                    </View>
            </View>

            <View style ={[COMMON_STYLES.CENTER, attemptStyles.highLightArea]}>
                <Text style={attemptStyles.LABEL_TEXT}>Wallet: {state.walletMoney} Rupees</Text>
                <Text style={attemptStyles.LABEL_TEXT}>Free Tickets: {state.freeTickets}</Text>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.HEADING}>
                    {state.testName}
                </Text>
            </View>

            <View>
                <Text style={[COMMON_STYLES.BODY_TITLE_BLACK, COMMON_STYLES.CENTER]}>Select Language</Text>
                <View style ={COMMON_STYLES.ROW_CENTER}>
                    <Text>Default (English)</Text>
                    <Switch
                        trackColor={{ false: Constant.APP_COLORS.blue, true: Constant.APP_COLORS.yellow }}
                        thumbColor={state.isLangHindi ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={langSwitch}
                        value={state.isLangHindi}
                    />
                    <Text>Hindi</Text>
                    </View>
            </View>

            <TouchableHighlight style ={[COMMON_STYLES.BTN_1, isDisabled && COMMON_STYLES.DISABLED_BTN]} onPress={handlePress} disabled={isDisabled}>
                <Text style = {[COMMON_STYLES.BTN_TEXT, isDisabled && COMMON_STYLES.DISABLED_TXT]}>Attempt</Text>
            </TouchableHighlight>

            <View style ={[COMMON_STYLES.CENTER, attemptStyles.highLightArea]}>
                <Text style={attemptStyles.LABEL_TEXT}>Test Fee {state.entryFee} Rupees</Text>
                <Text style={attemptStyles.LABEL_TEXT}>or 1 Ticket</Text>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.LABEL_TEXT}>1 free ticket or wallet money will be deducted for attempting the test</Text>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.NOTICE_TEXT}>
                    Your device camera and microphone will be enabled for security purpose, Please remove any headphone or headset before the test.
                </Text>
            </View>
        </View>
      </SafeAreaView>
  )
}

export default Attempt;