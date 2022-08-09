import { Pressable, View, Text } from "react-native";
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { indexStyles } from './indexStyles';
import { useState } from 'react';
import Chat from './chat';
import MyTickets from './myTickets';
import { HELP_TABS } from '../../constant/constant';

const Index = () => {
    const [activeTab, setActiveTab] = useState(HELP_TABS.MY_TICKET);
    const [ticketId, setTicketId] = useState(null);

    const handleChangeTab = (tabKey) => {
        setActiveTab(tabKey);
    }

    const handleOpenTicket = (ticketId) => {
        setActiveTab(HELP_TABS.LIVE_CHAT);
        setTicketId(ticketId);
    }

    const Tabs = () => {
        return (
            <>
                <Pressable onPress={()=>handleChangeTab(HELP_TABS.MY_TICKET)} style={{...indexStyles.TAB_BTN, ...(activeTab === HELP_TABS.MY_TICKET ? indexStyles.TAB_BTN_ACTIVE : {})}}>
                        <Text style={{ ...indexStyles.TAB_BTN_TEXT, ...(activeTab === HELP_TABS.MY_TICKET ? indexStyles.TAB_BTN_TEXT_ACTIVE : {}) }}>My Tickets</Text>
                    </Pressable>
    
                <Pressable onPress={()=>handleChangeTab(HELP_TABS.LIVE_CHAT)} style={{...indexStyles.TAB_BTN, ...(activeTab === HELP_TABS.LIVE_CHAT ? indexStyles.TAB_BTN_ACTIVE : {})}}>
                    <Text style={{ ...indexStyles.TAB_BTN_TEXT, ...(activeTab === HELP_TABS.LIVE_CHAT ? indexStyles.TAB_BTN_TEXT_ACTIVE : {}) }}>Live Chat</Text>
                </Pressable>
            </>
        )
    }

    return (
        <View style={indexStyles.CONTAINER}>
            <View style={indexStyles.BOARD_ROW}>
                <Tabs/>
            </View>

            {
                activeTab === HELP_TABS.LIVE_CHAT 
                    ? <Chat ticketId={ticketId}/>
                    : <MyTickets handleOpenTicket={handleOpenTicket}/>
            }
        </View>
    )
}

export default Index;