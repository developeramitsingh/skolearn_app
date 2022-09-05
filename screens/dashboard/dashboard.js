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
import { userService, notificationsService } from '../../services';

const Dashboard = ({navigation, route }) => {
    const [state, setState] = useState({
        activeTab: route?.params?.activeTab || Constant.TEST_TYPES.LIVE,
        activeScreen: route?.params?.activeScreen || Constant.SCREENS.TEST_LIST,
        isNewNotifi: false,
        user: route?.params?.user
    });

    const getUser = async () => {
        const user = await userService.getStoredUser()
        setState((prev) => {
            return {...prev, user };
        })
    }

    useEffect(()=> {
        checkIfNewNotification();
        getUser();

        navigation.addListener('beforeRemove', (e) => {
            console.info(`beforeRemove called in dashboard`);
            const action = e.data.action;
            console.info(action);
            const skipCase = action?.payload?.name === "Home" && action?.payload?.params?.calledFrom === 'drawer'
            if (!route?.params?.user || skipCase) {
              //if test is finished then only allow screen exit else not
              navigation.dispatch(e.data.action);
            }

             // Prevent default behavior of leaving the screen
            e.preventDefault();
        });

    },  [route?.params?.activeTab, route?.params?.activeScreen, route?.params?.user]);

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
        console.info(`checkIfNewNotification called`);
        //fetch from local storage
        const localAppNotiLen = await getFromStorage(Constant.STORAGE_KEYS.LOCAL_APP_NOTIFI_COUNT);

        //fetch from API
        const notifiFromDb = await notificationsService.getAllNotifications();
        const localNotifCount = localAppNotiLen?.count ?? 0;

        console.info({ localCount: localNotifCount, notifiFromDb: notifiFromDb?.data });

        const dbNotifiLen = notifiFromDb?.data?.length;

        if (localNotifCount < dbNotifiLen) {
            console.info('new notification found');
            saveToStorage(Constant.STORAGE_KEYS.LOCAL_APP_NOTIFI_COUNT, { count: dbNotifiLen });
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
            <StatusBar isNewNotifi={state.isNewNotifi} navigation={navigation} user ={ route?.params?.user || state.user}/>
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