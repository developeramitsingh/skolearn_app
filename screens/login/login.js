import { View, Text, Image, Pressable, SafeAreaView, TextInput } from 'react-native';
import { loginStyles } from './loginStyles';
import { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from  '../../constant/constant';
import userService from '../../services/userService';
import { saveToStorage } from '../../utils/utils';
import Loader from '../../components/loader/loader';

const Login = ({navigation}) => {
    const [state, setState] = useState({
        login: false,
        mobile: '',
        disabled: true,
        error: '',
        isLoading: false,
    });

    const handlePress = async ()=> {
        if (!state.mobile) {
            console.info(`Mobile should not be blank`);
            return;
        }

        // disable login button
        setState((prev) => { return {...prev, disabled: true, isLoading: true }});
        try {
            const data = await userService.login({ mobile: state.mobile });
            // enable login button
            setState((prev) => { return {...prev, disabled: false, error: '', isLoading: false }});
            console.info({data: data.data.otpToken });

            //save the otp token to storage
            saveToStorage(Constant.STORAGE_KEYS.OTP_TOKEN, data?.data?.otpToken);

            //navigate to verity otp page
            navigation.navigate(Constant.ROUTES.VERIFY_OTP, { requestType: 'login' });
            
        } catch (err) {
            console.error(`error while login`, err);
            const msg = err?.response?.data?.message;
            setState((prev) => { return {...prev, error: msg, disabled: false, isLoading: false  }});
        }
    }

    const handleChange = (val) => {
        let disabled = true;
        if (val.length === 10) {
          disabled = false;
        }

        setState((prev) => { return {...prev, mobile: val, disabled }})
        
    }
  return (
      <SafeAreaView style={loginStyles.container}>
        <Loader isLoading={state.isLoading}/>
       <Image style ={loginStyles.logo} source={{ uri: Constant.ASSEST_URLS.LOGO }}/>
        <Text style={[COMMON_STYLES.TITLE_TEXT, COMMON_STYLES.MARGIN_TOP]}>
                Login
        </Text>

        <View style={loginStyles.loginContainter}>
            <TextInput maxLength={10} style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Mobile" keyboardType="numeric" onChangeText= {handleChange} value={state.mobile}/>

            <Pressable elevation={3} disabled={ state.disabled } onPress= {handlePress} style={[COMMON_STYLES.BTN_1, state.disabled && COMMON_STYLES.DISABLED_BTN]}>
                <Text style={[COMMON_STYLES.BTN_TEXT, state.disabled && COMMON_STYLES.DISABLED_TEXT]}>Login</Text>
            </Pressable>

            <Text style={[COMMON_STYLES.ERROR_TXT, COMMON_STYLES.MARGIN_TOP]}>{state.error}</Text>
            
        </View>
      </SafeAreaView>
  )
}

export default Login;