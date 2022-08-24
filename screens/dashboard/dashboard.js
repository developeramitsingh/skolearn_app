import { SafeAreaView, View } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';
import { useEffect, useState, useRef } from 'react';
import Tabs from '../../components/tabs/tabs';
import StatusBar from '../../components/statusBar/statusBar';
import LiveTestsList from '../dashboard/testLists/liveTestsList';
import MyTestsList from '../dashboard/testLists/myTestsList';
import PracticeTestsList from './testLists/practiceTestsList';
import FooterIconBar from '../../components/footerIconBar/footerIconBar';
import dashboardStyles from './dashboardStyles';
import Wallet from '../wallet/wallet';
import Index from '../help/index';
import { saveToStorage, getFromStorage } from '../../utils/utils';

const Dashboard = ({navigation, route }) => {
    const [state, setState] = useState({
        userName: 'Amit',
        activeTab: route?.params?.activeTab || Constant.TEST_TYPES.LIVE,
        activeScreen: route?.params?.activeScreen || Constant.SCREENS.TEST_LIST,
        isNewNotifi: false,
        user: route?.params?.user
    });

    useEffect(()=> {
        checkIfNewNotification();

        navigation.addListener('beforeRemove', (e) => {
            const action = e.data.action;
            const skipCase = action?.payload?.name === "Home" && action?.source?.startsWith('Profile')
            if (!route?.params?.user || skipCase) {
              //if test is finished then only allow screen exit else not
              navigation.dispatch(e.data.action);
            }

             // Prevent default behavior of leaving the screen
            e.preventDefault();
        });

    },  [route?.params?.activeTab, route?.params?.activeScreen]);

    const setActiveTab = (key) => {
        if(route?.params?.activeTab) {
            route.params.activeTab = null;
        }

        setState(prev => {
            return { ...prev, activeTab: key }
        })
    }

    const setActiveScreen = (screenKey) => {
        if(route?.params?.activeScreen) {
            route.params.activeScreen = null;
        }
        setState(prev => {
            return { ...prev, activeScreen: screenKey }
        })
    }

    const checkIfNewNotification = async () => {
        //fetch from local storage
        const localAppNotiLen = await getFromStorage(Constant.STORAGE_KEYS.LOCAL_APP_NOTIFI_COUNT);

        //fetch from API
        const notifiFromDb = 4;
        const localNotifCount = localAppNotiLen?.count ?? 0;

        console.info({ localCount: localNotifCount, notifiFromDb });

        if (localNotifCount < notifiFromDb) {
            console.info('new notification found');
            saveToStorage(Constant.STORAGE_KEYS.LOCAL_APP_NOTIFI_COUNT, { count: notifiFromDb });
            setState((prev) => {
                return { ...prev, isNewNotifi: true }
            });
        } else {
            setState((prev) => {
                return { ...prev, isNewNotifi: false }
            });
        }

    }

    const TestList = () => {
        return (
            <>
                <Tabs tabList = { Constant.DASHBOARD_TEST_TABS } activeTab = {route?.params?.activeTab || state.activeTab} setActiveTab={setActiveTab}/>
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
            <StatusBar isNewNotifi={state.isNewNotifi} navigation={navigation} text ={state.userName}/>
            {
                route?.params?.activeScreen === Constant.SCREENS.TEST_LIST 
                    || state.activeScreen === Constant.SCREENS.TEST_LIST 
                ? <TestList/>
                : route?.params?.activeScreen === Constant.SCREENS.WALLET 
                    || state.activeScreen === Constant.SCREENS.WALLET 
                ? <Wallet/>
                : <Index/>

            }
            <FooterIconBar setActiveScreen ={setActiveScreen}/>
        </SafeAreaView>
    )
}

export default Dashboard;