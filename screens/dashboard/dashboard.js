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
import { getFromStorage, saveToStorage } from '../../utils/utils';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Text, Button, Platform } from 'react-native';
import { handleLinkOpen } from '../../common/functions/commonHelper';
import { sendAppLogService, userService } from '../../services';

//push notification functions
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Dashboard = ({navigation, route }) => {
    //this holds the notification alerts
    const notificationListener = useRef();

    //this holds responses if user clicks on notification
    const responseListener = useRef();
    const [state, setState] = useState({
        userName: 'Amit',
        activeTab: route?.params?.activeTab || Constant.TEST_TYPES.LIVE,
        activeScreen: route?.params?.activeScreen || Constant.SCREENS.TEST_LIST,
        isNewNotifi: false,
    });

    useEffect(()=> {
        checkIfNewNotification();
        //--------------push notification setup ---------------------------//
        initNotificationSetup(notificationListener, responseListener, navigation);
        
        return () => {
            removeNotificationListeners(notificationListener, responseListener);
        };
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

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  
  //get the push token and subscribe the push service
  const initNotificationSetup = (notificationListener, responseListener, navigation) => {
    registerForPushNotificationsAsync().then(token => {
      //save the token in local storage and on server
      saveExpoToken(token);
    });
  
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      //setNotification(notification);
      console.info(notification);
    });
  
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //handle click of notificaton by user
      if (response?.notification?.request?.content) {
        handleClickNotification(response.notification.request.content, navigation);
      }
    });
  }
  
  const removeNotificationListeners = (notificationListener, responseListener) => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  }
  
  //save expo push token to local and on server
  const saveExpoToken = async (_expoToken) => {
    const expoKey = Constant.STORAGE_KEYS.EXPO_USER_PUSH_TOKEN;
    const existingExpoToken = await getFromStorage(expoKey);
    const userId = await getFromStorage(Constant.STORAGE_KEYS.USER_ID) || '62fa249d4417d040e30571e3';
  
    console.info({ existingExpoToken, userId});
    sendAppLogService.sendAppLogs({ msg: { existingExpoToken, userId} });
    
    //if token is not found and user is logged in or regisered then save the token
    if (!existingExpoToken && userId) {
      const logMsg = `expo push token is not saved, saving now:: userId ${userId}::${existingExpoToken}`;
      console.info(logMsg);
      sendAppLogService.sendAppLogs({ msg: logMsg });
  
      saveToStorage(expoKey, _expoToken);
      userService.updateUser({ id: userId, expoPushToken: _expoToken }).then(res => console.info('sercie updated', res));
  
    } else if (existingExpoToken && userId && existingExpoToken !== _expoToken?.toString()) {
      /* if token is found but not matching with new token and
        user is loggedIn or regisered then save the token
      */
      const logMsg = `expo push token is not matching:: userId ${userId}::${JSON.stringify({ existingExpoToken, _expoToken })}`;
      console.info(logMsg);
      sendAppLogService.sendAppLogs({ msg: logMsg });
  
      saveToStorage(expoKey, _expoToken);
      userService.updateUser({ id: userId, expoPushToken: _expoToken });
    } else if (existingExpoToken && userId) {
      const getUser =  await userService.getUserById(userId);

      if (!getUser?.data?.expoPushToken) {
        const logMsg = `server expo push token not found then updating on server:: userId ${userId}::${JSON.stringify({ existingExpoToken, _expoToken })}`;
        console.info(logMsg);
        userService.updateUser({ id: userId, expoPushToken: _expoToken });
      }
    }
  }
  
  const handleClickNotification = (notificationContent, navigation) => {
    const data = notificationContent?.data;
  
    console.info({data});
    //if link type is internal screen then navigate to it
    if (data?.type === Constant.NOTIFICATION_DATA_KEYS.ROUTE) {
      console.info(`notificaton data type: ${data.type}`);
      const routeName = data.link;
      const props = data.props;
  
      //open the link internaly
      handleLinkOpen(navigation, routeName, props);
    }
  }