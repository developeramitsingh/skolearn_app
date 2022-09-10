import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { walletStyles } from './walletStyles';
import ModalWindow from "../../components/modals/modalWindow";
import ModalTicket from "../../components/modals/modalTicket";
import { CLOSE_MODAL, ACTION_TYPES, APP_ENV, ENVS, PAYTM_MERCHANT_ID, PAYTMENT_CALLBACK_BACKEND } from '../../constant/constant';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { paymentGatewayService, sendAppLogService, walletService } from "../../services";

const Wallet = ({ userId }) => {
    const [state, setState] = useState({
        walletBalance: 0,
        freeTickets: 0,
        transactionList: [
            {
                transactionTitle: '100 start rupess added',
                transactionTime: new Date().toISOString().split('.')?.[0],
                transactionStatus: 'Success',
                id: '#38498348938948',
            },
            {
                transactionTitle: '200 rupess added',
                transactionTime: new Date().toISOString().split('.')?.[0],
                transactionStatus: 'Success',
                id: '#384983333938948',
            },
            {
                transactionTitle: '49 rupess added',
                transactionTime: new Date().toISOString().split('.')?.[0],
                transactionStatus: 'Success',
                id: '#384498333938948',
            },
            {
                transactionTitle: '50 rupess added',
                transactionTime: new Date().toISOString().split('.')?.[0],
                transactionStatus: 'Success',
                id: '#3849835333938948',
            },
            {
                transactionTitle: '100 rupess added',
                transactionTime: new Date().toISOString().split('.')?.[0],
                transactionStatus: 'Success',
                id: '#3298333938948',
            },
        ]
    });

    const [walletBalance, setWalletBalance] = useState(0);
    const [transactionList, setTransactionList] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [userUserId, setUserId] = useState(null);
    const [showAddMoney, setAddMoney] = useState(false);
    const [showWithdrawMoney, setWithdrawMoney] = useState(false);
    const [createTicketModal, setCreateTicket] = useState(false);

    useEffect(() => {
        if (userId && !userUserId) {
          setUserId(userId);
        }
    }, [userId]);

    const showErrorAlert = () => {
        Alert.alert('Warning', `An error occured please try again.`, [
            {
                text: 'close', 'onPress': () => {}
            }
        ]);
    }

    const showAlert = (msg) => {
        Alert.alert('Info', msg, [
            {
                text: 'close', 'onPress': () => {}
            }
        ]);
    }
    
    const generateOrderId = () => {
        const r = Math.random() * new Date().getMilliseconds();

        const id = 'TRANS' + userUserId + '_' +
            (1 + Math.floor(r % 2000) + 10000) +
            'b' +
            (Math.floor(r % 100000) + 10000);

        setOrderId(id);

        return id;
    };

    const addMoney = async (amount) => {
        try {
            const orderId = generateOrderId();
            const mid = PAYTM_MERCHANT_ID;
            const callbackUrl = PAYTMENT_CALLBACK_BACKEND;
            const isStaging = APP_ENV !== ENVS.PROD ? true : false;

            const logs = { orderId, amount, isStaging, callbackUrl, mid };
            console.info(logs);
            sendAppLogService.sendAppLogs({ msg: `Addmoney logs`, logs });

            const getTokenData = await paymentGatewayService.getTxnToken({ orderId, amount });

            if (!getTokenData.data.success) {
                showErrorAlert();

                return;
            }


            const resBody = getTokenData?.data?.data?.body;
            const txnToken =  resBody?.txnToken;

            console.info({txnToken});
            sendAppLogService.sendAppLogs({ txnToken });

            if (!txnToken) {
                showErrorAlert();

                return;
            }

            const transData = await AllInOneSDKManager.startTransaction(
                orderId,
                mid,
                txnToken,
                amount,
                callbackUrl,
                isStaging,
                false,
                'skolearn://'
            );

            sendAppLogService.sendAppLogs({ msg: transData?.data });
            //if success
            if (transData?.data?.STATUS === 'TXN_SUCCESS') {
                //call the verify status api
                const paymentStatus = await paymentGatewayService.verifyTxnStatus({ orderId });

                //send logs to backend
                sendAppLogService.sendAppLogs({ totalAmount, paymentStatus: paymentStatus?.data });

                if (paymentStatus?.data?.data?.isPaymentSuccess) {
                    //call the wallet update api
                    const totalAmount = +state.walletBalance + parseInt(amount, 2);

                    sendAppLogService.sendAppLogs({ totalAmount, userUserId });
                    walletService.updateWallet({ userId: userUserId, balance: totalAmount });
                    // show success transaction alert
                    showAlert(`Transaction successfull!`);
                } else {
                    showAlert(`Transaction successfull! However we are still verifying your payment from bank. We will notify once done`);
                }
            } else {
                showAlert(`Transaction Failed!`);
            }

            setAddMoney(false);
        } catch (err) {
            console.error(`error in addmoney: ${err}`);
            showErrorAlert();
        }
    }
    const handlePress = (actionType, payload) => {
        if (actionType === 'addMoney') {
            console.info('add money');
            addMoney(payload)
        } else if(actionType === 'withdraw') {
            console.info('withdraw');
            setWithdrawMoney(false);
        } else if(actionType === ACTION_TYPES.CREATE_TICKET) {
            console.info('createTicket');
            //call api to create ticket entry
            setCreateTicket(false);
        }  else if(actionType === CLOSE_MODAL) {
            console.info('modal closed');
            setAddMoney(false);
            setWithdrawMoney(false);
            setCreateTicket(false);
        }
    };

    const RenderList = ({item })=> {
        return (
            <View key={item.id} style={walletStyles.CARD}>
                <View style={walletStyles.LEFT_COL}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{item.transactionTitle}</Text>
                    <Text style={walletStyles.CARD_TEXT}>{item.transactionTime}</Text>
                    <Text style={walletStyles.CARD_TEXT}>Reference number</Text>
                    <Text style={walletStyles.CARD_TEXT}>{item.id}</Text>
                </View>
    
                <View style={walletStyles.RIGHT_COL}>
                    <TouchableOpacity onPress ={() => setCreateTicket(true)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Raise Tickets</Text>
                    </TouchableOpacity>
                    <Text style={walletStyles.CARD_TEXT}>{item.transactionStatus}</Text>
                </View>
            </View>
        )
    };

    
    return (
        <SafeAreaView style={COMMON_STYLES.CONTAINER}>
            <ModalWindow modalVisible={showAddMoney} handleModalPress={handlePress} title="Add Money to Wallet" keyboardType='numeric' actionType= "addMoney" btnTxt = 'Add to Wallet' placeholder='Enter Amount to add'/>

            <ModalWindow modalVisible={showWithdrawMoney} handleModalPress={handlePress} title="Request Widthdraw Money" keyboardType='numeric'  actionType= "withdraw"  btnTxt = 'Request Withdraw' placeholder='Enter Amount to withdraw'/>

            <ModalTicket modalVisible={createTicketModal} handleModalPress={handlePress} title="Create New Ticket" actionType= {ACTION_TYPES.CREATE_TICKET} btnTxt = 'Create' placeholder='Enter Subject'/>

            <View style={{...COMMON_STYLES.ROW_CENTER, marginTop: 20 }}>
                <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>Total Balance</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_HEADING_1_WHITE}>{state.walletBalance} Rs.</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>Free Tickets {state.freeTickets}</Text>
            </View>

            <View style={[COMMON_STYLES.ROW, { marginTop: 10 }]}>
                <TouchableOpacity onPress={()=>setAddMoney(true)} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>Add Money</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setWithdrawMoney(true)} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>Withdraw</Text>
                </TouchableOpacity>
            </View>

            <View style={walletStyles.CONTAINER}>
                <View style={{...COMMON_STYLES.ROW, paddingHorizontal: 0 }}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Transaction History</Text>
                </View>

                <FlatList
                    data = { state.transactionList || []}
                    renderItem ={RenderList}
                    keyExtractor ={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>        
    )
};

export default Wallet;