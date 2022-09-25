import { Pressable, View, Text } from "react-native";
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { indexStyles } from './indexStyles';
import { useState } from 'react';
import Chat from './chat';
import MyTickets from './myTickets';
import { HELP_TABS, HELP_TAB_TYPE, SCREENS } from '../../constant/constant';
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

    return (
        <View style={indexStyles.CONTAINER}>
            <Tabs tabList={ HELP_TABS } screen='DASHBOARD' tabsIn={SCREENS.HELP} activeTab = {activeTab} setActiveTab={handleChangeTab}/>

            {
                activeTab === HELP_TAB_TYPE.LIVE_CHAT 
                    ? <Chat ticketId={ticketId}/>
                    : <MyTickets handleOpenTicket={handleOpenTicket}/>
            }
        </View>
    )
}

export default Index;