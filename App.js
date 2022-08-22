import { StyleSheet } from 'react-native';
import Home from './screens/home/home';
import Login from './screens/login/login';
import VerifyOtp from './screens/verifyOtp/verifyOtp';
import Register from './screens/register/register';
import Dashboard from './screens/dashboard/dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Constant from './constant/constant';
import Attempt from './screens/attempt/attempt';
import Test from './screens/test/test';
import ResultScreen from './screens/resultScreen/resultScreen';
import TimerScreen from './screens/timerScreen/timerScreen';

import Profile from './screens/profile/profile';
import Notification from './screens/notification/notification';

import { useEffect, useState, useRef } from 'react';
import { getFromStorage, saveToStorage } from './utils/utils';
import { enrolledTestsService, sendAppLogService, userService } from './services/index';
import 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform } from 'react-native';
import { handleLinkOpen } from './common/functions/commonHelper';

const prefix = Linking.createURL('/');

const retryFailedTestToSave = async () => {
  try {
    //console.info('retryFailedTestToSave called in app.js');
    const getAllFailedResponses = await getFromStorage(Constant.STORAGE_KEYS.FAILED_TEST_RESPONSE);

    const failedTestIdLen = getAllFailedResponses && Object.keys(getAllFailedResponses)?.length ? true : false;

    sendAppLogService.sendAppLogs({ msg: `is Pending Test failed res found: ${failedTestIdLen}` });

    //console.info(`is Pending Test failed res found: ${failedTestIdLen}`);

    if(!failedTestIdLen) {
      return;
    }

    const allTestResponseData = getAllFailedResponses ? Object.values(getAllFailedResponses) : [];

    const failedRes = {};
    for (const resData of allTestResponseData) {
      try {
        await enrolledTestsService.updateEnrolledTests(resData);
      } catch(err) {
        const msg = `error while saving data in retryFailedTestToSave: ${resData.testId}:: ${err}`;
        console.error(msg);

        sendAppLogService.sendAppLogs({ msg });
        failedRes[resData.testId] = resData;
      }
    }

    const msg = `is Pending failed res left after retry: ${Object.keys(failedRes).length ? true : false}`
    //console.info(msg);

    sendAppLogService.sendAppLogs({ msg });
    //updating failed res for later attempt
    saveToStorage(Constant.STORAGE_KEYS.FAILED_TEST_RESPONSE, failedRes);
  } catch(err) {
    console.error(`error in retryFailedTestToSave:: ${err}`);
  }
};

const Stack = createNativeStackNavigator();

//push notification functions
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  //this holds the notification alerts
  const notificationListener = useRef();

  //this holds responses if user clicks on notification
  const responseListener = useRef();

  const config = {
    initialRouteName: 'Home',
    screens: {
      Home: {
        path: 'Home'
      },
      Register: {
        path: 'Register'
      },
      Dashboard: {
        path: 'Dashboard'
      }
    }
  };
 
  const linking = {
    prefixes: [prefix],
    config
  };

  useEffect(()=> {
    sendAppLogService.sendAppLogs({ msg: linking });
    //check for failed responses on startup
    retryFailedTestToSave();

    //--------------push notification setup ---------------------------//
    initNotificationSetup(notificationListener, responseListener, setExpoPushToken, setNotification);
    
    return () => {
      removeNotificationListeners(notificationListener, responseListener);
    };
  });

  return (
      <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }} initialRouteName={Constant.ROUTES.HOME}>
        <Stack.Screen name={Constant.ROUTES.HOME} component ={Home}/>
        <Stack.Screen name={Constant.ROUTES.LOGIN} component ={Login}/>
        <Stack.Screen name={Constant.ROUTES.REGISTER} component ={Register}/>
        <Stack.Screen name={Constant.ROUTES.VERIFY_OTP} component ={VerifyOtp}/>

        <Stack.Screen name={Constant.ROUTES.DASHBOARD} component ={Dashboard}/>
        <Stack.Screen name={Constant.ROUTES.ATTEMPT} component ={Attempt}/>
        <Stack.Screen name={Constant.ROUTES.TEST} component={Test}/>
        <Stack.Screen name={Constant.ROUTES.RESULT_SCREEN} component={ResultScreen}/>
        <Stack.Screen name={Constant.ROUTES.TEST_TIMER_SCREEN} component={TimerScreen}/>


        <Stack.Screen name={Constant.ROUTES.PROFILE} component={Profile}/>
        <Stack.Screen name={Constant.ROUTES.NOTIFICATION} component={Notification}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
const initNotificationSetup = (notificationListener, responseListener, setExpoPushToken, setNotification) => {
  registerForPushNotificationsAsync().then(token => {
    //set the token in state;
    setExpoPushToken(token);
    //save the token in local storage and on server
    saveExpoToken(token);
  });

  // This listener is fired whenever a notification is received while the app is foregrounded
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
    //console.info(notification);
  });

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //handle click of notificaton by user
    if (response?.notification?.request?.content) {
      handleClickNotification(response.notification.request.content);
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
  const tempExpoKey = Constant.STORAGE_KEYS.TEMP_EXPO_PUSH_TOKEN;

  const existingExpoToken = await getFromStorage(expoKey);
  const userId = await getFromStorage(Constant.STORAGE_KEYS.USER_ID);
  const tempExpoToken = await getFromStorage(tempExpoKey);

  console.info({tempExpoToken, existingExpoToken, userId});
  sendAppLogService.sendAppLogs({ msg: {tempExpoToken, existingExpoToken, userId} });
  
  //if token is not found and user is logged in or regisered then save the token
  if (!existingExpoToken && userId) {
    const logMsg = `expo push token is not saved, saving now:: userId ${userId}::${existingExpoToken}`;
    console.info(logMsg);
    sendAppLogService.sendAppLogs({ msg: logMsg });

    saveToStorage(expoKey, _expoToken);
    userService.updateUser({ id: userId, expoPushToken: _expoToken });

  } else if (existingExpoToken && userId && existingExpoToken !== _expoToken?.toString()) {
    /* if token is found but not matching with new token and
      user is loggedIn or regisered then save the token
    */
    const logMsg = `expo push token is not matching:: userId ${userId}::${JSON.stringify({ existingExpoToken, _expoToken })}`;
    console.info(logMsg);
    sendAppLogService.sendAppLogs({ msg: logMsg });

    saveToStorage(expoKey, _expoToken);
    userService.updateUser({ id: userId, expoPushToken: _expoToken });
  } else if (!tempExpoToken) {
    const logMsg = `expo temp push token is not saved, saving now`;
    console.info(logMsg);
    sendAppLogService.sendAppLogs({ msg: logMsg });
    //save token for later use while registering the user
    saveToStorage(tempExpoKey, _expoToken);
  }
}

const handleClickNotification = (notificationContent) => {
  const data = notificationContent?.data;

  //if link type is internal screen then navigate to it
  if (data?.type === Constant.NOTIFICATION_DATA_KEYS.ROUTE) {
    console.info(`notificaton data type: ${data.type}`);
    const routeName = data.link;
    const props = data.props;

    //open the link internaly
    handleLinkOpen(navigation, routeName, props);
  }
}