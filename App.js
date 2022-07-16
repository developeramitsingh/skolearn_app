import { StyleSheet, SafeAreaView } from 'react-native';
import Home from './screens/home/home';
import Login from './screens/login/login';
import VerifyOtp from './screens/verifyOtp/verifyOtp';
import Register from './screens/register/register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }} initialRouteName="Home">
        <Stack.Screen name="Home" component ={Home}/>
        <Stack.Screen name="Login" component ={Login}/>
        <Stack.Screen name="Register" component ={Register}/>
        <Stack.Screen name="VerifyOtp" component ={VerifyOtp}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
