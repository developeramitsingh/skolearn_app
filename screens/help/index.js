import { Pressable, View, Text } from "react-native";
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { indexStyles } from './indexStyles';
import { useEffect, useState } from 'react';
import Chat from './chat';
import MyTickets from './myTickets';
import { HELP_TABS, HELP_TAB_TYPE, SCREENS, STORAGE_KEYS } from '../../constant/constant';
import Tabs from '../../components/tabs/tabs';
import { getFromStorage } from "../../utils/utils";

const Index = () => {
    const [activeTab, setActiveTab] = useState(HELP_TAB_TYPE.MY_TICKET);
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const user = await getFromStorage(STORAGE_KEYS.USER);

            if (!user) {
                return;
            }

            setUser(user);
        } catch (err){
            console.error(`errror in getUser: ${err}`);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleChangeTab = (tabKey) => {
        setActiveTab(tabKey);
    }

    return (
        <View style={indexStyles.CONTAINER}>
            <Tabs tabList={ HELP_TABS } screen='DASHBOARD' tabsIn={SCREENS.HELP} activeTab = {activeTab} setActiveTab={handleChangeTab}/>

            {
                activeTab === HELP_TAB_TYPE.LIVE_CHAT 
                    ? <Chat ticketId={ticketId}/>
                    : <MyTickets user={user}/>
            }
        </View>
    )
}

export default Index;