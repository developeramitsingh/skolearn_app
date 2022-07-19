import { View, Text, Image, TouchableHighlight, SafeAreaView, TextInput } from 'react-native';
import { loginStyles } from './loginStyles';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from  '../../constant/constant';

const Login = ({navigation}) => {
    const [state, setState] = useState({
        login: false,
        mobile: '',
    });

    const handlePress = ()=> {
        //sets color when btn pressed
        navigation.navigate(Constant.ROUTES.VERIFY_OTP);
    }

    const handleChange = (val) => {
        setState((prev) => { return {...prev, mobile: val }})
    }
  return (
      <SafeAreaView style={loginStyles.container}>
       <Image style ={loginStyles.logo} source={logo}/>
        <Text style={COMMON_STYLES.TITLE_TEXT}>
                Login
        </Text>

        <View style={loginStyles.loginContainter}>
            <TextInput maxLength={10} style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Mobile" keyboardType="numeric" onChangeText= {handleChange} value={state.mobile}/>

            <TouchableHighlight handlePress={handlePress} onPressOut={handlePress} onPressIn={handlePress} style={COMMON_STYLES.BTN_1}>
                <Text style={COMMON_STYLES.BTN_TEXT}>Login</Text>
            </TouchableHighlight>

            
        </View>
      </SafeAreaView>
  )
}

export default Login;