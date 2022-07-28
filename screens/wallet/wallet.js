import { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { walletStyles } from './walletStyles';
import ModalWindow from "../../components/modals/modalWindow";

const RenderList = ({item})=> {
    return (
        <View key={item.id} style={walletStyles.CARD}>
            <View style={walletStyles.LEFT_COL}>
                <Text style={COMMON_STYLES.BODY_TITLE}>{item.transactionTitle}</Text>
                <Text style={walletStyles.CARD_TEXT}>{item.transactionTime}</Text>
                <Text style={walletStyles.CARD_TEXT}>Reference number</Text>
                <Text style={walletStyles.CARD_TEXT}>{item.id}</Text>
            </View>

            <View style={walletStyles.RIGHT_COL}>
                <TouchableOpacity style={COMMON_STYLES.SUB_BTN_2}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Raise Tickets</Text>
                </TouchableOpacity>
                <Text style={walletStyles.CARD_TEXT}>{item.transactionStatus}</Text>
            </View>
        </View>
    )
};

const Wallet = () => {
    const [state, setState] = useState({
        walletBalance: 100,
        freeTickets: 1,
        transactionList: [
            {
                transactionTitle: '100 rupess added',
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

    const [showAddMoney, setAddMoney] = useState(false);
    const [showWithdrawMoney, setWithdrawMoney] = useState(false);

    const handlePress = (actionType) => {
        if(actionType === 'addMoney') {
            setAddMoney(true);
        } else if(actionType === 'withdraw') {
            setWithdrawMoney(true);
        }
    };

    
    return (
        <SafeAreaView style={COMMON_STYLES.CONTAINER}>
            <ModalWindow modalVisible={showAddMoney} handleModalPress={setAddMoney} title="Add Money to Wallet" btnTxt = 'Add to Wallet' placeholder='Enter Amount to add'/>

            <ModalWindow modalVisible={showWithdrawMoney} handleModalPress={setWithdrawMoney} title="Request Widthdraw Money" btnTxt = 'Request Withdraw' placeholder='Enter Amount to withdraw'/>

            <View style={{...COMMON_STYLES.ROW_CENTER, marginTop: 20 }}>
                <Text style={COMMON_STYLES.BODY_TITLE}>Total Balance</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_HEADING_1}>{state.walletBalance} Rs.</Text>
            </View>

            <View style={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_TITLE}>Free Tickets {state.freeTickets}</Text>
            </View>

            <View style={COMMON_STYLES.ROW}>
                <TouchableOpacity onPress={()=>handlePress('addMoney')} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>Add Money</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>handlePress('withdraw')} style={COMMON_STYLES.SUB_BTN_1}>
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
                />
            </View>
        </SafeAreaView>        
    )
};

export default Wallet;