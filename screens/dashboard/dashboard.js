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
import Wallet from '../wallet/wallet';

const Dashboard = ({navigation, route }) => {
    const [state, setState] = useState({
        userName: 'Amit',
        activeTab: route?.params?.activeTab || Constant.TEST_TYPES.LIVE,
        activeScreen: Constant.SCREENS.TEST_LIST
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

    const setActiveScreen = (screenKey) => {
        setState(prev => {
            return { ...prev, activeScreen: screenKey }
        })
    }

    const TestList = () => {
        return (
            <>
                <Tabs activeTab = {route?.params?.activeTab || state.activeTab} setActiveTab={setActiveTab}/>
                <View style={COMMON_STYLES.CONTAINER}>
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
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={dashboardStyles.DASH_CONTAINER}>
            <StatusBar text ={state.userName}/>
            {
                state.activeScreen === Constant.SCREENS.TEST_LIST 
                ? <TestList/>
                : state.activeScreen === Constant.SCREENS.WALLET 
                ? <Wallet/>
                : null

            }
            <FooterIconBar setActiveScreen ={setActiveScreen}/>
        </SafeAreaView>
    )
}

export default Dashboard;