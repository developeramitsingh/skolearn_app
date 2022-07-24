import { SafeAreaView, View } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';
import { useEffect, useState } from 'react';
import Tabs from '../../components/tabs/tabs';
import StatusBar from '../../components/statusBar/statusBar';
import LiveTestsList from '../dashboard/testLists/liveTestsList';
import MyTestsList from '../dashboard/testLists/myTestsList';
import PracticeTestsList from './testLists/practiceTestsList';
import FooterIconBar from '../../components/footerIconBar/footerIconBar';
import dashboardStyles from './dashboardStyles';

const Dashboard = ({navigation, route }) => {
    const [state, setState] = useState({
        userName: 'Amit',
        activeTab: route?.params?.activeTab || Constant.TEST_TYPES.LIVE,
    });

    useEffect(()=> {

    },  [route?.params?.activeTab]);

    const setActiveTab = (key) => {
        if(route?.params?.activeTab) {
            route.params.activeTab = null;
        }

        setState(prev => {
            return { ...prev, activeTab: key }
        })
    }

    return (
        <SafeAreaView style={dashboardStyles.DASH_CONTAINER}>
            <StatusBar text ={state.userName}/>
            <Tabs activeTab = {route?.params?.activeTab || state.activeTab} setActiveTab={setActiveTab}/>

            <SafeAreaView style={COMMON_STYLES.CONTAINER}>
                
                {
                    (route?.params?.activeTab === Constant.TEST_TYPES.LIVE) || 
                    (!route?.params?.activeTab && 
                        state.activeTab === Constant.TEST_TYPES.LIVE)
                    ? <LiveTestsList navigation={navigation}/>
                    : (route?.params?.activeTab === Constant.TEST_TYPES.MY_TEST) || 
                        (!route?.params?.activeTab && state.activeTab === Constant.TEST_TYPES.MY_TEST)
                    ? <MyTestsList navigation={navigation}/>
                    : <PracticeTestsList navigation={navigation}/>
                
                }
                <FooterIconBar navigation={navigation}/>

            </SafeAreaView>
        </SafeAreaView>
    )
}

export default Dashboard;