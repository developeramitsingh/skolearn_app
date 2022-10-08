import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { walletStyles } from './walletStyles';
import ModalWindow from "../../components/modals/modalWindow";
import ModalTicket from "../../components/modals/modalTicket";
import { CLOSE_MODAL, ACTION_TYPES, APP_ENV, ENVS, PAYTM_MERCHANT_ID, PAYTMENT_CALLBACK_BACKEND, TXN_TYPE, TXN_STATUS, APP_COLORS } from '../../constant/constant';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { freeTicketsService, paymentGatewayService, sendAppLogService, transactionService, walletService, withdrawService } from "../../services";
import { generateOrderId } from "../../utils/utils";
import Loader from '../../components/loader/loader';
import { LANGUAGES_DATA, TXN_STATUSES } from '../../constant/language';
import { raiseNewTicket, setCurrentLanguage } from '../../common/functions/commonHelper';

const Wallet = ({ userId }) => {
    const [walletBalance, setWalletBalance] = useState(0);
    const [freeTickets, setFreeTickets] = useState(0);
    const [transactionList, setTransactionList] = useState([]);
    const [userUserId, setUserId] = useState(null);
    const [showAddMoney, setAddMoney] = useState(false);
    const [showWithdrawMoney, setWithdrawMoney] = useState(false);
    const [createTicketModal, setCreateTicket] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [errOccured, setErrorOccured] = useState(false);
    const [lang, setLang] = useState();
    const [txnId, setTxnId] = useState(null);

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
            const allTxns = await transactionService.getAllTransaction("{}", ["_id", "txnTitle", "status", "isSuccess", "createdAt"]);

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
        setCurrentLanguage(setLang);
    },  [])

    useEffect(() => {
        if (userId && !userUserId) {
          setUserId(userId);
        }

        fetchInitialData();
    }, [userId, walletBalance, errOccured]);

    const showAlert = (type, msg) => {
        Alert.alert(type, msg, [
            {
                text: LANGUAGES_DATA[lang]?.WALLET?.CLOSE, 'onPress': () => {}
            }
        ]);
    }

    const createTransaction = (amount, orderId) => {
        console.info('createTransaction called');
        const langTxt = LANGUAGES_DATA[lang]?.WALLET?.TXN_TXT;
        // if success then create a transaction entry
        const txnBody = {
            orderId,
            userId: userUserId,
            mid: PAYTM_MERCHANT_ID,
            txnAmount: amount,
            isSuccess: false,
            status: TXN_STATUS.INITIATED,
            txnTitle: `${langTxt?.FIRST} ${amount} ${langTxt?.LAST}`,
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

    const updateTransactionStatus = (orderId, userUserId, respMsg, status) => {
        const updateTransaction = {
            orderId,
            userId: userUserId,
            status,
            paytmTxnStatus: status,
            isSuccess: false,
            respMsg,
        }

        sendAppLogService.sendAppLogs({ 'updateTransactionStatus': updateTransaction });
        //update the transaction status by order id
        transactionService.updateTransaction(updateTransaction).catch(err2 => {
            const errMsgCatch = `error in updateTransactionStatus for adding money :: ${err2}`;
            console.error(errMsgCatch);
            sendAppLogService.sendAppLogs({ errMsgCatch });
        });
    }

    const addMoney = async (amount) => {
        setDisabled(true);
        setLoading(true);
        const orderId = generateOrderId(userUserId);
        try {
            const mid = PAYTM_MERCHANT_ID;
            const callbackUrl = PAYTMENT_CALLBACK_BACKEND;
            const isStaging = APP_ENV !== ENVS.PROD ? true : false;

            const logs = { orderId, amount, isStaging, callbackUrl, mid };
            console.info(logs);
            sendAppLogService.sendAppLogs({ msg: `Addmoney logs`, logs });

            const getTokenData = await paymentGatewayService.getTxnToken({ orderId, amount });
            setLoading(false);

            if (!getTokenData.data.success) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT.INFO, LANGUAGES_DATA[lang]?.ALERT?.ERROR_TXT);

                return;
            }

            const resBody = getTokenData?.data?.data?.body;
            const txnToken =  resBody?.txnToken;

            console.info({txnToken});
            sendAppLogService.sendAppLogs({ txnToken });

            if (!txnToken) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT.INFO, LANGUAGES_DATA[lang]?.ALERT?.ERROR_TXT);

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
                    showAlert(LANGUAGES_DATA[lang]?.ALERT.INFO, LANGUAGES_DATA[lang]?.WALLET?.TXN_PENDING_TXT);

                    updateTransactionStatus(orderId, userUserId, `${msgPending}::paytmTxnStatus::${paytmTxnStatus}`, TXN_STATUS.PENDING);
                    setErrorOccured(true);
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
                showAlert(LANGUAGES_DATA[lang]?.ALERT.INFO, LANGUAGES_DATA[lang]?.WALLET?.TXN_MONEY_SUCCESS_TXT);
            } else {
                updateTransactionStatus(orderId, userUserId, paytmTxnStatus, TXN_STATUS.FAILED);
                showAlert(LANGUAGES_DATA[lang]?.ALERT.WARNING, LANGUAGES_DATA[lang]?.WALLET?.TXN_MONEY_FAILED_TXT);
                setErrorOccured(true);
            }

            setDisabled(false);
            setAddMoney(false);
        } catch (err) {
            setDisabled(false);
            setLoading(false);
            console.error(`error in addmoney: ${err}`);
            sendAppLogService.sendAppLogs({ errorMsg: `error in add money payment gateway:: error here:: ${err}` });

            const errorMsg = err?.message || err?.data?.message
            updateTransactionStatus(orderId, userUserId, errorMsg, TXN_STATUS.FAILED);

            showAlert(LANGUAGES_DATA[lang]?.ALERT.WARNING, LANGUAGES_DATA[lang]?.WALLET?.TXN_MONEY_FAILED_TXT);
            setErrorOccured(true);
        }
    }

    const withDrawAmount = async (amount) => {
        try {
            if (!+amount) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT.WARNING, LANGUAGES_DATA[lang]?.WALLET?.MONEY_VALIDATION);

                return;
            }

            if (+amount > +walletBalance) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT.WARNING, LANGUAGES_DATA[lang]?.WALLET?.LESS_BALANCE_TO_WITHDRAW);

                return;
            }

            await withdrawService.createWithdraw({ amount });

            setWalletBalance(+walletBalance - +amount)
            showAlert(LANGUAGES_DATA[lang]?.ALERT.INFO, LANGUAGES_DATA[lang]?.WALLET?.MONEY_WITHDRAW_SUCCESS);
        } catch (err) {
            console.error(`error in withDrawAmount of wallet: ${err}`);
            const errorMsg = err?.response?.data?.statusCode;
            console.info({ errorMsg });

            showAlert(LANGUAGES_DATA[lang]?.ALERT?.NOTICE, LANGUAGES_DATA[lang]?.WALLET?.[errorMsg]);
        }
        setWithdrawMoney(false);
    }
    const handlePress = async (actionType, payload) => {
        if (actionType === 'addMoney') {
            console.info('add money');
            await addMoney(payload);
        } else if(actionType === 'withdraw') {
            console.info('withdraw');
            await withDrawAmount(payload);
        } else if(actionType === ACTION_TYPES.CREATE_TICKET) {
            console.info('createTicket');
            //call api to create ticket entry
            await raiseNewTicket(payload, lang, userUserId);
        }  else if(actionType === CLOSE_MODAL) {
            console.info('modal closed');
            setAddMoney(false);
            setWithdrawMoney(false);
            setCreateTicket(false);
        }
    };

    const RenderTxnsItems = ({item })=> {
        const txnStatusStyle = item.status === TXN_STATUS.FAILED 
            ? walletStyles.STATUS_FAILED
            : item.status === TXN_STATUS.PENDING
            ? walletStyles.STATUS_PENDING
            : item.status === TXN_STATUS.SUCCESS
            ? walletStyles.STATUS_SUCCESS
            : walletStyles.STATUS_INITIATED
        return (
            <>
                <View key={item._id} style={walletStyles.CARD}>
                    <View style={walletStyles.LEFT_COL}>
                        <Text style={COMMON_STYLES.BODY_TITLE}>{item.txnTitle}</Text>
                        <Text style={[walletStyles.CARD_TEXT, { marginTop: 10 }]}>{item.createdAt}</Text>
                    </View>
        
                    <View style={walletStyles.RIGHT_COL}>
                        <TouchableOpacity onPress ={() => {
                            setTxnId(item._id);
                            setCreateTicket(true)
                        }} style={COMMON_STYLES.SUB_BTN_2}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>{LANGUAGES_DATA[lang]?.WALLET?.RAISE_TICKET}</Text>
                        </TouchableOpacity>

                        <Text style={[walletStyles.TXN_STATUS, txnStatusStyle]}>{TXN_STATUSES?.[lang]?.[item.status]}</Text>
                    </View>
                </View>
                <View style={COMMON_STYLES.SEPARATOR}></View>
            </>
        )
    };

    
    return (
        <SafeAreaView style={COMMON_STYLES.CONTAINER}>
            <Loader isLoading={isLoading}/>
            <ModalWindow isDisabled ={isDisabled} setDisabled={setDisabled} modalVisible={showAddMoney} handleModalPress={handlePress} validRegex={/[^0-9]+/g} title={LANGUAGES_DATA[lang]?.WALLET?.ADD_MONEY_TO_WALLET} keyboardType='numeric' actionType= "addMoney" btnTxt = {LANGUAGES_DATA[lang]?.WALLET?.ADD} placeholder={LANGUAGES_DATA[lang]?.WALLET?.ENTER_AMOUNT_TO_ADD} closeTxt={LANGUAGES_DATA[lang]?.WALLET?.CLOSE}/>

            <ModalWindow modalVisible={showWithdrawMoney} handleModalPress={handlePress} title={LANGUAGES_DATA[lang]?.WALLET?.REQUEST_WITHDRAW_MONEY} keyboardType='numeric'  actionType= "withdraw"  btnTxt = {LANGUAGES_DATA[lang]?.WALLET?.WITHDRAW} placeholder={LANGUAGES_DATA[lang]?.WALLET?.ENTER_AMOUNT_TO_WITHDRAW} closeTxt={LANGUAGES_DATA[lang]?.WALLET?.CLOSE}/>

            <ModalTicket modalVisible={createTicketModal} handleModalPress={handlePress} title={LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE_NEW_TICKET} actionType= {ACTION_TYPES.CREATE_TICKET} btnTxt = {LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE} placeholder={LANGUAGES_DATA[lang]?.HELP?.TICKET?.ENTER_SUBJECT} fullMsgPlaceholder={LANGUAGES_DATA[lang]?.HELP?.TICKET?.ENTER_FULL_MESSAGE} closeTxt={LANGUAGES_DATA[lang]?.HELP?.TICKET?.CANCEL} uploadTxt={LANGUAGES_DATA[lang]?.HELP?.TICKET?.UPLOAD_TXT} txnId ={txnId} lang={lang}/>

            <View style={{...COMMON_STYLES.ROW_CENTER, marginTop: 20 }}>
                <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>{LANGUAGES_DATA[lang]?.WALLET?.TOTAL_BALANCE}</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_HEADING_1_WHITE}>{walletBalance} Rs.</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_TITLE_WHITE}>{LANGUAGES_DATA[lang]?.WALLET?.FREE_TICKETS} {freeTickets}</Text>
            </View>

            <View style={[COMMON_STYLES.ROW, { marginTop: 10 }]}>
                <TouchableOpacity  onPress={()=>setAddMoney(true)} style={[COMMON_STYLES.SUB_BTN_1, { backgroundColor: APP_COLORS.green, minWidth: 180 }]}>
                    <Text style={[COMMON_STYLES.SUB_BTN_TXT, { color: 'white'}]}>{LANGUAGES_DATA[lang]?.WALLET?.ADD_MONEY}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> setWithdrawMoney(true)} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>{LANGUAGES_DATA[lang]?.WALLET?.WITHDRAW}</Text>
                </TouchableOpacity>
            </View>

            <View style={walletStyles.CONTAINER}>
                <View style={{...COMMON_STYLES.ROW, paddingHorizontal: 0 }}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{LANGUAGES_DATA[lang]?.WALLET?.TXN_HISTORY}</Text>
                </View>

                <FlatList
                    data = { transactionList || []}
                    renderItem ={RenderTxnsItems}
                    keyExtractor ={item => item._id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>        
    )
};

export default Wallet;