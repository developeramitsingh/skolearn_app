import { SafeAreaView, View } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';
import { useState } from 'react';
import Tabs from '../../components/tabs/tabs';
import StatusBar from '../../components/statusBar/statusBar';
import LiveTestsList from '../dashboard/testLists/liveTestsList';
import MyTestsList from '../dashboard/testLists/myTestsList';
import PracticeTestsList from './testLists/practiceTestsList';
import FooterIconBar from '../../components/footerIconBar/footerIconBar';
import dashboardStyles from './dashboardStyles';

const Dashboard = ({navigation}) => {
    const [state, setState] = useState({
        userName: 'Amit',
        activeTab: Constant.TEST_TYPES.LIVE,
    });

    const setActiveTab = (key) => {
        setState(prev => {
            return { ...prev, activeTab: key }
        })
    }

    return (
        <SafeAreaView style={dashboardStyles.DASH_CONTAINER}>
            <StatusBar text ={state.userName}/>
            <Tabs setActiveTab={setActiveTab}/>
            <SafeAreaView style={COMMON_STYLES.CONTAINER}>
                
                {
                    state.activeTab === Constant.TEST_TYPES.LIVE 
                    ? <LiveTestsList navigation={navigation}/>
                    : state.activeTab === Constant.TEST_TYPES.MY_TEST
                    ? <MyTestsList navigation={navigation}/>
                    : <PracticeTestsList navigation={navigation}/>
                
                }
                <FooterIconBar navigation={navigation}/>

            </SafeAreaView>
        </SafeAreaView>
    )
}

export default Dashboard;