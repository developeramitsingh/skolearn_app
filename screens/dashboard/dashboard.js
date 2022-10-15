import { SafeAreaView, View, Image, ScrollView, Pressable } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';
import { useEffect, useState, useRef, useCallback } from 'react';
import Tabs from '../../components/tabs/tabs';
import StatusBar from '../../components/statusBar/statusBar';
import LiveTestsList from '../dashboard/testLists/liveTestsList';
import MyTestsList from '../dashboard/testLists/myTestsList';
import PracticeTestsList from './testLists/practiceTestsList';
import FooterIconBar from '../../components/footerIconBar/footerIconBar';
import dashboardStyles from './dashboardStyles';
import Wallet from '../wallet/wallet';
import Index from '../help/index';
import Profile from '../profile/profile';
import { saveToStorage, getFromStorage } from '../../utils/utils';
import { userService, notificationsService } from '../../services';
import { LANGUAGES_DATA } from '../../constant/language';
import { onShare, setCurrentLanguage } from '../../common/functions/commonHelper';
import ScrollTabs from '../../components/scrollTabs/scrollTabs';
import Slideshow from '../../components/slideshow/slideshow';

const Dashboard = ({navigation, route }) => {
    const [state, setState] = useState({
        activeTab: route?.params?.activeTab || Constant.TEST_TYPES.LIVE,
        activeScreen: route?.params?.activeScreen || Constant.SCREENS.TEST_LIST,
        isNewNotifi: false,
        user: route?.params?.user
    });
    const [lang, setLang] = useState();

    const getUser = async () => {
        const user = await userService.getStoredUser()
        setState((prev) => {
            return {...prev, user };
        })
    }

    useEffect(()=> {
        setCurrentLanguage(setLang);
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

    const setActiveTab = useCallback((key) => {
        if(route?.params?.activeTab) {
            route.params.activeTab = null;
        }

        setState(prev => {
            return { ...prev, activeTab: key }
        })
    }, [state.activeTab, route?.params?.activeTab]);

    const setActiveScreen = useCallback((screenKey) => {
        if(route?.params?.activeScreen) {
            route.params.activeScreen = null;
        }
        setState(prev => {
            return { ...prev, activeScreen: screenKey }
        })
    }, [state.activeScreen]);

    const checkIfNewNotification = async () => {
        console.info(`checkIfNewNotification called`);
        //fetch from local storage
        const localAppNotiLen = await getFromStorage(Constant.STORAGE_KEYS.LOCAL_APP_NOTIFI_COUNT);

        //fetch from API
        const notifiFromDb = await notificationsService.getAllNotifications('{ "isRead": false }');
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

    const settestGroup = useCallback((key) => {
        if(route?.params?.testGroup) {
            route.params.testGroup = null;
        }

        setState(prev => {
            return { ...prev, testGroup: key }
        })
    }, [state.testGroup]);


    const TestList = () => {
        const isLiveActive = (route?.params?.activeTab === Constant.TEST_TYPES.LIVE) ||  (!route?.params?.activeTab && state.activeTab === Constant.TEST_TYPES.LIVE);
        const isMyTestActive = (route?.params?.activeTab === Constant.TEST_TYPES.MY_TEST) || (!route?.params?.activeTab && state.activeTab === Constant.TEST_TYPES.MY_TEST);

        return (
            <>
                <ScrollView style={{ maxHeight: '8%' }} horizontal={true}>
                    <Pressable onPress={()=> onShare(Constant.SHARE_TEXT(state?.user?.referralCode))} style={{ paddingHorizontal: 20, marginVertical: 10, width: 360 }}>
                        <Image source={{ uri: Constant.ASSEST_URLS.REFERRAL_IMAGE }} style={{height: 40, width: '100%', borderRadius: 10 }}/>
                    </Pressable>
                 </ScrollView>
                <Tabs tabList = { Constant.DASHBOARD_TEST_TABS } activeTab = {route?.params?.activeTab || state.activeTab} setActiveTab={setActiveTab} screen='DASHBOARD' tabsIn={Constant.SCREENS.TEST_LIST}/>
                
                 {
                    !isMyTestActive 
                    ? <ScrollTabs tabList = { Constant.DASHBOARD_TEST_GROUP_TABS } activeTab = { state.testGroup || Constant.TEST_GROUPS.GENERAL.VALUE } setActiveTab={settestGroup} screen='DASHBOARD' tabsIn={Constant.SCREENS.TEST_LIST}/>
                    : null
                 }

                <View style={[COMMON_STYLES.CONTAINER_LIGHT ]}>
                    {
                        isLiveActive
                        ? <LiveTestsList userId = { route?.params?.user?._id || state.user?._id} navigation={navigation} testGroup={state.testGroup || Constant.TEST_GROUPS.GENERAL.VALUE}/>
                        : isMyTestActive
                        ? <MyTestsList userId = { route?.params?.user?._id || state.user?._id} navigation={navigation}/>
                        : <PracticeTestsList userId = { route?.params?.user?._id || state.user?._id} navigation={navigation} testGroup={state.testGroup || Constant.TEST_GROUPS.GENERAL.VALUE}/>
                    
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
                ? <Wallet userId ={ route?.params?.user?._id || state.user?._id}/>
                : route?.params?.activeScreen === Constant.SCREENS.WALLET 
                || state.activeScreen === Constant.SCREENS.PROFILE 
                ? <Profile navigation={navigation} route={{ params: { user: route?.params?.user || state.user, isBackButtonHide: true } }}/>
                : <Index navigation={navigation}/>

            }
            <FooterIconBar setActiveScreen ={setActiveScreen} langData={LANGUAGES_DATA?.[route?.params?.lang || lang]?.FOOTER_ICON_BAR}/>
        </SafeAreaView>
    )
}

export default Dashboard;