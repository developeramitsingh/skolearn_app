import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { walletStyles } from './walletStyles';
import ModalWindow from "../../components/modals/modalWindow";
import ModalTicket from "../../components/modals/modalTicket";
import { CLOSE_MODAL, ACTION_TYPES, APP_ENV, ENVS, PAYTM_MERCHANT_ID, PAYTMENT_CALLBACK_BACKEND, TXN_TYPE, TXN_STATUS } from '../../constant/constant';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { freeTicketsService, paymentGatewayService, sendAppLogService, transactionService, walletService } from "../../services";
import { generateOrderId } from "../../utils/utils";
import Loader from '../../components/loader/loader';

const Wallet = ({ userId }) => {
    const [walletBalance, setWalletBalance] = useState(0);
    const [freeTickets, setFreeTickets] = useState(0);
    const [transactionList, setTransactionList] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [userUserId, setUserId] = useState(null);
    const [showAddMoney, setAddMoney] = useState(false);
    const [showWithdrawMoney, setWithdrawMoney] = useState(false);
    const [createTicketModal, setCreateTicket] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getWalletBalance = async () => {
        try {
            const walletData = await walletService.getWalletBalance();

            if (walletData?.data) {
                setWalletBalance(walletData.data.balance || 0);
            }
        } catch (err) {
            console.error(`error in getWalletBalance in wallet: ${err}`);
        }
    }

    const getFreeTickets = async () => {
        try {
            const freeTickets = await freeTicketsService.getFreeTickets();

            if (freeTickets?.data) {
                setFreeTickets(freeTickets.data.freeTickets || 0);
            }
        } catch (err) {
            console.error(`error in getWalletBalance in wallet: ${err}`);
        }
    }

    const getTransactionList = async () => {
        try {
            const allTxns = await transactionService.getAllTransaction("{}", ["_id", "txnTitle", "status", "isSuccess", "txnDate"]);

            console.info(allTxns.data);
            if (allTxns?.data) {
                setTransactionList(allTxns.data || 0);
            }
        } catch (err) {
            console.error(`error in getTransactionList in wallet: ${err}`);
        }
    }
    const fetchInitialData = async () => {
        setLoading(true);
        await getWalletBalance();
        await getFreeTickets();
        await getTransactionList();
        setLoading(false);
    }

    useEffect(() => {
        if (userId && !userUserId) {
          setUserId(userId);
        }

        fetchInitialData();
    }, [userId, walletBalance]);

    const showAlert = (msg, type) => {
        Alert.alert(type, msg, [
            {
                text: 'close', 'onPress': () => {}
            }
        ]);
    }

    const createTransaction = (amount, orderId) => {
        console.info('createTransaction called');
        // if success then create a transaction entry
        const txnBody = {
            orderId,
            userId: userUserId,
            mid: PAYTM_MERCHANT_ID,
            txnAmount: amount,
            isSuccess: false,
            status: TXN_STATUS.INITIATED,
            txnTitle: `Adding ${amount} Rs. in wallet`,
            txnType: TXN_TYPE.ADD_MONEY, 
            txnDate: new Date().toISOString()
        }
        console.info({ txnBody });
        transactionService.createTransaction(txnBody)
            .catch(err => {
                const erroMsg = `error in createTransaction for init txn paytm: ${err}`;
                console.error(erroMsg);
                sendAppLogService.sendAppLogs({ erroMsg })
            });
    }

    const updateSuccessTransaction = (transDataBody, amount, orderId) => {
        const updateTransaction = {
            orderId,
            txnTitle: `Added ${amount} Rs. in wallet`,
            userId: userUserId,
            status: TXN_STATUS.SUCCESS,
            paytmTxnStatus: transDataBody?.STATUS,
            isSuccess: true,
            bankName: transDataBody.BANKNAME,
            bankTxnId: transDataBody.BANKTXNID,
            txnAmount: transDataBody.txnAmount,
            currency: transDataBody.CURRENCY,
            gatewayName: transDataBody.GATEWAYNAME,
            paymentMode: transDataBody.PAYMENTMODE,
            respCode: transDataBody.RESPCODE,
            respMsg: transDataBody.RESPMSG,
            txnDate: transDataBody.TXNDATE,
            txnType: TXN_TYPE.ADD_MONEY,
            txnId: transDataBody.TXNID,
        }

        sendAppLogService.sendAppLogs({ updateTransaction });
        //update the transaction status by order id
        transactionService.updateTransaction(updateTransaction)
            .catch(err => {
                const erroMsg = `error in updateTransaction for init txn paytm: ${err}`;
                console.error(erroMsg);
                sendAppLogService.sendAppLogs({ erroMsg })
            });
    }

    const addMoney = async (amount) => {
        try {
            setLoading(true);
            const orderId = generateOrderId(userUserId);
            setOrderId(orderId);
            const mid = PAYTM_MERCHANT_ID;
            const callbackUrl = PAYTMENT_CALLBACK_BACKEND;
            const isStaging = APP_ENV !== ENVS.PROD ? true : false;

            const logs = { orderId, amount, isStaging, callbackUrl, mid };
            console.info(logs);
            sendAppLogService.sendAppLogs({ msg: `Addmoney logs`, logs });

            const getTokenData = await paymentGatewayService.getTxnToken({ orderId, amount });
            setLoading(false);

            if (!getTokenData.data.success) {
                showAlert('An Error Occured, Please try again', 'Error');

                return;
            }


            const resBody = getTokenData?.data?.data?.body;
            const txnToken =  resBody?.txnToken;

            console.info({txnToken});
            sendAppLogService.sendAppLogs({ txnToken });

            if (!txnToken) {
                showAlert('An Error Occured, Please try again', 'Error');

                return;
            }

            //call create transaction api
            createTransaction(amount, orderId);

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

            const transDataBody = transData;
            const paytmTxnStatus = transDataBody?.STATUS;

            sendAppLogService.sendAppLogs({ transData, paytmTxnStatus });

            //if success
            if (paytmTxnStatus === 'TXN_SUCCESS') {
                //call the verify status api
                const paymentStatus = await paymentGatewayService.verifyTxnStatus({ orderId });

                //send logs to backend
                sendAppLogService.sendAppLogs({ totalAmount, paymentStatus1: paymentStatus?.data });

                // if status is not success then return
                if (!paymentStatus?.data?.data?.isPaymentSuccess) {
                    showAlert(`Transaction successfull! However we are still verifying your payment from bank. We will notify once done`);

                    return;
                }

                //call the wallet update api
                const totalAmount = +walletBalance + Number(amount);

                sendAppLogService.sendAppLogs({ totalAmount, amount: Number(amount), walletBalance, userId: userUserId });

                //call the success update transaction api
                updateSuccessTransaction(transDataBody, amount, orderId);

                sendAppLogService.sendAppLogs({ 'msg': 'updating wallet', data: { userId: userUserId, totalAmount } });
                //update the wallet balance
                walletService.updateWallet({ userId: userUserId, balance: totalAmount });

                //update the state wallet
                setWalletBalance(totalAmount);
                // show success transaction alert
                showAlert(`Money Added to Wallet!`, 'Info');
            } else {
                showAlert(`Transaction Failed!`, 'Warning');
            }

            setAddMoney(false);
        } catch (err) {
            setLoading(false);
            console.error(`error in addmoney: ${err}`);
            sendAppLogService.sendAppLogs({ errorMsg: `error in add money payment gateway::err:: ${err}` });

            const errorMsg = err?.message || err?.data?.message
            const updateTransaction = {
                orderId,
                userId: userUserId,
                status: TXN_STATUS.FAILED,
                paytmTxnStatus: 'failed',
                isSuccess: false,
                respMsg: errorMsg || `${err}`
            }
            //update the transaction status by order id
            transactionService.updateTransaction(updateTransaction);
            showAlert(updateTransaction.respMsg, 'Error');
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

    const RenderTxnsItems = ({item })=> {
        return (
            <View key={item._id} style={walletStyles.CARD}>
                <View style={walletStyles.LEFT_COL}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{item.txnTitle}</Text>
                    <Text style={walletStyles.CARD_TEXT}>{item.txnDate}</Text>
                    <Text style={walletStyles.CARD_TEXT}>Reference number</Text>
                    <Text style={walletStyles.CARD_TEXT}>{item._id}</Text>
                </View>
    
                <View style={walletStyles.RIGHT_COL}>
                    <TouchableOpacity onPress ={() => setCreateTicket(true)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Raise Tickets</Text>
                    </TouchableOpacity>
                    <Text style={walletStyles.CARD_TEXT}>{item.status}</Text>
                </View>
            </View>
        )
    };

    
    return (
        <SafeAreaView style={COMMON_STYLES.CONTAINER}>
            <Loader isLoading={isLoading}/>
            <ModalWindow modalVisible={showAddMoney} handleModalPress={handlePress} title="Add Money to Wallet" keyboardType='numeric' actionType= "addMoney" btnTxt = 'Add to Wallet' placeholder='Enter Amount to add'/>

            <ModalWindow modalVisible={showWithdrawMoney} handleModalPress={handlePress} title="Request Widthdraw Money" keyboardType='numeric'  actionType= "withdraw"  btnTxt = 'Request Withdraw' placeholder='Enter Amount to withdraw'/>

            <ModalTicket modalVisible={createTicketModal} handleModalPress={handlePress} title="Create New Ticket" actionType= {ACTION_TYPES.CREATE_TICKET} btnTxt = 'Create' placeholder='Enter Subject'/>

            <View style={{...COMMON_STYLES.ROW_CENTER, marginTop: 20 }}>
                <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>Total Balance</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_HEADING_1_WHITE}>{walletBalance} Rs.</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>Free Tickets {freeTickets}</Text>
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
                    data = { transactionList || []}
                    renderItem ={RenderTxnsItems}
                    keyExtractor ={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>        
    )
};

export default Wallet;