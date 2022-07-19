import { StyleSheet, SafeAreaView } from 'react-native';
import Home from './screens/home/home';
import Login from './screens/login/login';
import VerifyOtp from './screens/verifyOtp/verifyOtp';
import Register from './screens/register/register';
import Dashboard from './screens/dashboard/dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Constant from './constant/constant';

const Stack = createNativeStackNavigator();
export default function App() {
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
        
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
