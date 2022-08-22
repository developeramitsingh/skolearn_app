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



export default function App() {  
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