import { StyleSheet, SafeAreaView } from 'react-native';
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
import * as Updates from 'expo-updates' // Updates*

import Profile from './screens/profile/profile';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();
export default function App() {

  const updateThis = async () => {
    try {
      console.info('checking update');
      const update = await Updates.checkForUpdateAsync();
      console.info({update});
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        // NOTIFY USER HERE
        Updates.reloadAsync()
      }
    } catch (e) {
        // HANDLE ERROR HERE
    }
  }

  useEffect(()=> {
    updateThis();
  }, [])
  
  return (
      <NavigationContainer>
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
        
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
