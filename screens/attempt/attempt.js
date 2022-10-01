import { View, Text, Alert, SafeAreaView, Switch, Pressable, BackHandler } from 'react-native';
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
import { LANGUAGES_DATA } from '../../constant/language';
import { setCurrentLanguage } from '../../common/functions/commonHelper';

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
    const [lang, setLang] = useState();

    const fetchInitialData = async () => {
        setCurrentLanguage(setLang);
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

            return testQuesData?.data
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
        const isPracticeTest = state.testType === Constant.TEST_TYPES.PRACTICE;

        //check wallet or free ticket if has then allow else not
        if (walletMoney < entryFee && !freeTickets && !isPracticeTest) {
            showAlert(LANGUAGES_DATA[lang]?.ALERT?.NOTICE, LANGUAGES_DATA[lang]?.ATTEMPT?.LESS_BALANCE);
            console.log({ walletMoney, entryFee, freeTickets });

            return;
        }

        const langData = LANGUAGES_DATA[lang];

        const testReqTxt= langData?.ATTEMPT?.TEST_REQ_TEXT;
        const textReqTitle = langData?.ATTEMPT?.TEST_REQUIREMENTS;
        const cancelBtnTxt = langData?.ATTEMPT.CANCEL_ATTEMPT;
        const okBtnTxt = langData?.ATTEMPT.OK_TO_PROCEED;
        
        Alert.alert(textReqTitle, testReqTxt, [
            {
                text: cancelBtnTxt, onPress: () => {}
            },
            {
                text: okBtnTxt, onPress: async () => {
                    try {
                        setLoading(true);
                        setDisabled(true);
                        const testId = test?._id;

                        if (!isPracticeTest) {
                            const seatAvailableStatus = await testService.getEnrolledSeatStatus(testId);

                            //if seats not available then exit
                            if (!seatAvailableStatus?.data?.isSeatAvailable) {
                                showAlert(LANGUAGES_DATA[lang]?.ALERT.NOTICE, LANGUAGES_DATA[lang]?.ATTEMPT?.SEAT_FULL);
                                setLoading(false);
                                setDisabled(false);

                                return;
                            }
                        }

                        const language = state.isLangHindi ? 'hindi' : 'english';

                        const testQusData = await generateTestQuestions(language, testId);

                        console.info({testQusData});

                        //if test data not found then skip the all the cases
                        if (!testQusData?.length) {
                            console.warn(`test data not found in gnerate test questions`);
                            showAlert(LANGUAGES_DATA[lang]?.ALERT.ERROR, LANGUAGES_DATA[lang]?.ALERT?.ERROR_TXT);
                            setLoading(false);
                            setDisabled(false);

                            return;
                        }

                        if (!isPracticeTest) {
                            //deduct the money or free ticket
                            if (freeTickets) {
                                const ticket = freeTickets - 1;
                                freeTicketsService.updateFreeTickets({ freeTickets: ticket });

                                //const txnTitle = '1 Free Ticket Deducted for Attempting the Test';
                                const txnTitle = LANGUAGES_DATA[lang]?.ATTEMPT?.TXN_TICKET_TXT;
                                createTransaction(entryFee, txnTitle, Constant.TXN_TYPE.FREE_TICKET_DEDUCTED_FOR_TEST);
                            } else if (state.walletMoney) {
                                
                                const balance = walletMoney - entryFee;
                                walletService.updateWallet({ balance });

                                //const txnTitle = `${entryFee} Rs. Deducted from Wallet for Attempting the Test`;
                                const txnTitle = `${entryFee} ${LANGUAGES_DATA[lang]?.ATTEMPT?.TXN_WALLET_TXT}`;
                                createTransaction(entryFee, txnTitle, Constant.TXN_TYPE.WALLET_DEDUCTED_FOR_TEST);
                            }
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
                        navigation.navigate(Constant.ROUTES.TEST_TIMER_SCREEN, { testQusData, testId, test });
                    } catch (err) {
                        console.error(`error while attempting: ${err}`);
                        setLoading(false);
                        setDisabled(false);
                        showAlert(LANGUAGES_DATA[lang]?.ALERT.ERROR, LANGUAGES_DATA[lang]?.ALERT?.ERROR_TXT);
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
        <BackBtn navigation={navigation} routeToGo={Constant.ROUTES.DASHBOARD} color={Constant.APP_COLORS.white}/>

        <View style={[attemptStyles.container, { justifyContent: 'space-between' } ]}>
            <View style ={[COMMON_STYLES.ROW, state.testType === Constant.TEST_TYPES.PRACTICE && { justifyContent: 'center'}]}>
                    <View style={attemptStyles.COL_LEFT}>
                        <View>
                            <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color={Constant.APP_COLORS.white} />
                        </View>
                        <View>
                            <Text style={attemptStyles.LABEL_TEXT}>{LANGUAGES_DATA[lang]?.ATTEMPT?.STUDENTS_JOINED}</Text>
                            {
                                state.testType === Constant.TEST_TYPES.PRACTICE 
                                    ? <Text style={attemptStyles.LABEL_TEXT}>{state.userEnrolled}</Text>
                                    : <Text style={attemptStyles.LABEL_TEXT}>{state.userEnrolled}/{state.userSeats}</Text>
                            }
                        </View>
                    </View>

                    {
                        state.testType !== Constant.TEST_TYPES.PRACTICE 
                        ? <View style={attemptStyles.COL_RIGHT}>
                            <Text style={attemptStyles.LABEL_TEXT}>{LANGUAGES_DATA[lang]?.ATTEMPT?.EXPIRES_ON}</Text>
                            <Text style={attemptStyles.LABEL_TEXT}>{state.expireOn}</Text>
                        </View>
                        : null
                    }
            </View>

            <View style ={[COMMON_STYLES.CENTER, attemptStyles.highLightArea]}>
                <Text style={attemptStyles.LABEL_TEXT_WHITE}>{LANGUAGES_DATA[lang]?.ATTEMPT?.WALLET}: {state.walletMoney} {LANGUAGES_DATA[lang]?.ATTEMPT?.RUPEES}</Text>
                <Text style={attemptStyles.LABEL_TEXT_WHITE}>{LANGUAGES_DATA[lang]?.ATTEMPT?.FREE_TICKETS}: {state.freeTickets}</Text>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.HEADING}>
                    {state.testName}
                </Text>
            </View>

            <View>
                <Text style={[COMMON_STYLES.BODY_TITLE_WHITE, COMMON_STYLES.CENTER]}>{LANGUAGES_DATA[lang]?.ATTEMPT?.SELECT_LANGUAGE}</Text>
                <View style ={COMMON_STYLES.ROW_CENTER}>
                    <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>{LANGUAGES_DATA[lang]?.ATTEMPT?.DEFAULT_ENGLISH}</Text>
                    <Switch
                        trackColor={{ false: Constant.APP_COLORS.blue, true: Constant.APP_COLORS.yellow }}
                        thumbColor={state.isLangHindi ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={langSwitch}
                        value={state.isLangHindi}
                    />
                    <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>{LANGUAGES_DATA[lang]?.ATTEMPT?.HINDI}</Text>
                    </View>
            </View>

            <Pressable elevation={3} style ={[COMMON_STYLES.BTN_1, isDisabled && COMMON_STYLES.DISABLED_BTN]} onPress={handlePress} disabled={isDisabled}>
                <Text style = {[COMMON_STYLES.BTN_TEXT, isDisabled && COMMON_STYLES.DISABLED_TXT]}>{LANGUAGES_DATA[lang]?.ATTEMPT?.ATTEMPT}</Text>
            </Pressable>

            {
                state.testType !== Constant.TEST_TYPES.PRACTICE 
                    ?   <View style ={[COMMON_STYLES.CENTER, attemptStyles.highLightArea]}>
                            <Text style={attemptStyles.LABEL_TEXT_WHITE}>{LANGUAGES_DATA[lang]?.ATTEMPT?.TEST_FEE} {state.entryFee} {LANGUAGES_DATA[lang]?.ATTEMPT?.RUPEES}</Text>
                            <Text style={attemptStyles.LABEL_TEXT_WHITE}>{LANGUAGES_DATA[lang]?.ATTEMPT?.OR_1_TICKET}</Text>
                        </View>
                    :   <View style ={[COMMON_STYLES.CENTER, attemptStyles.highLightArea]}>
                            <Text style={attemptStyles.LABEL_TEXT_WHITE}>{LANGUAGES_DATA[lang]?.ATTEMPT?.FREE_ENTRY}</Text>
                        </View>
            }
            
            

            {
                state.testType !== Constant.TEST_TYPES.PRACTICE 
                 ?  <View style ={COMMON_STYLES.CENTER}>
                        <Text style={attemptStyles.LABEL_TEXT}>{LANGUAGES_DATA[lang]?.ATTEMPT?.ATTEMPT_DESC}</Text>
                    </View>
                 : null
            }
            
            {
                state.testType !== Constant.TEST_TYPES.PRACTICE 
                ? <View style ={COMMON_STYLES.CENTER}>
                    <Text style={attemptStyles.NOTICE_TEXT}>
                        {LANGUAGES_DATA[lang]?.ATTEMPT?.ATTEMPT_NOTICE}
                    </Text>
                 </View>
                : null
            }
            
        </View>
      </SafeAreaView>
  )
}

export default Attempt;