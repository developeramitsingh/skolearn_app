import { Pressable, View, Text } from "react-native";
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { indexStyles } from './indexStyles';
import { useState } from 'react';
import Chat from './chat';
import MyTickets from './myTickets';
import { HELP_TABS, HELP_TAB_TYPE } from '../../constant/constant';
import Tabs from '../../components/tabs/tabs';

const Index = () => {
    const [activeTab, setActiveTab] = useState(HELP_TAB_TYPE.MY_TICKET);
    const [ticketId, setTicketId] = useState(null);

    const handleChangeTab = (tabKey) => {
        setActiveTab(tabKey);
    }

    const handleOpenTicket = (ticketId) => {
        setActiveTab(HELP_TAB_TYPE.LIVE_CHAT);
        setTicketId(ticketId);
    }

    const TabsOld = () => {
        return (
            <>
                <Pressable onPress={()=>handleChangeTab(HELP_TAB_TYPE.MY_TICKET)} style={{...indexStyles.TAB_BTN, ...(activeTab === HELP_TAB_TYPE.MY_TICKET ? indexStyles.TAB_BTN_ACTIVE : {})}}>
                        <Text style={{ ...indexStyles.TAB_BTN_TEXT, ...(activeTab === HELP_TAB_TYPE.MY_TICKET ? indexStyles.TAB_BTN_TEXT_ACTIVE : {}) }}>My Tickets</Text>
                    </Pressable>
    
                <Pressable onPress={()=>handleChangeTab(HELP_TAB_TYPE.LIVE_CHAT)} style={{...indexStyles.TAB_BTN, ...(activeTab === HELP_TAB_TYPE.LIVE_CHAT ? indexStyles.TAB_BTN_ACTIVE : {})}}>
                    <Text style={{ ...indexStyles.TAB_BTN_TEXT, ...(activeTab === HELP_TAB_TYPE.LIVE_CHAT ? indexStyles.TAB_BTN_TEXT_ACTIVE : {}) }}>Live Chat</Text>
                </Pressable>
            </>
        )
    }

    return (
        <View style={indexStyles.CONTAINER}>
            {/* <View style={indexStyles.BOARD_ROW}>
                <Tabs/>
            </View> */}
            <Tabs tabList={ HELP_TABS } activeTab = {activeTab} setActiveTab={handleChangeTab}/>

            {
                activeTab === HELP_TAB_TYPE.LIVE_CHAT 
                    ? <Chat ticketId={ticketId}/>
                    : <MyTickets handleOpenTicket={handleOpenTicket}/>
            }
        </View>
    )
}

export default Index;