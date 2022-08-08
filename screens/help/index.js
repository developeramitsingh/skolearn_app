import { Pressable, View, Text } from "react-native";
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { indexStyles } from './indexStyles';
import { useState } from 'react';
import Chat from './chat';
import MyTickets from './myTickets';

const TAB_TYPE = {
    MY_TICKET: 'my-ticket',
    LIVE_CHAT: 'live-chat',
}

const Index = () => {
    const [activeTab, setActiveTab] = useState(TAB_TYPE.MY_TICKET);

    const handleChangeTab = (tabKey) => {
        setActiveTab(tabKey);
    }

    const Tabs = () => {
        return (
            <>
                <Pressable onPress={()=>handleChangeTab(TAB_TYPE.MY_TICKET)} style={{...indexStyles.TAB_BTN, ...(activeTab === TAB_TYPE.MY_TICKET ? indexStyles.TAB_BTN_ACTIVE : {})}}>
                        <Text style={{ ...indexStyles.TAB_BTN_TEXT, ...(activeTab === TAB_TYPE.MY_TICKET ? indexStyles.TAB_BTN_TEXT_ACTIVE : {}) }}>My Tickets</Text>
                    </Pressable>
    
                <Pressable onPress={()=>handleChangeTab(TAB_TYPE.LIVE_CHAT)} style={{...indexStyles.TAB_BTN, ...(activeTab === TAB_TYPE.LIVE_CHAT ? indexStyles.TAB_BTN_ACTIVE : {})}}>
                    <Text style={{ ...indexStyles.TAB_BTN_TEXT, ...(activeTab === TAB_TYPE.LIVE_CHAT ? indexStyles.TAB_BTN_TEXT_ACTIVE : {}) }}>Live Chat</Text>
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
                activeTab === TAB_TYPE.LIVE_CHAT 
                    ? <Chat/>
                    : <MyTickets/>
            }
        </View>
    )
}

export default Index;