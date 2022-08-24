import { View, Text, Image, TouchableHighlight, SafeAreaView, TextInput } from 'react-native';
import { verifyOtpStyles } from './verifyOtpStyles';
import { useState } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from  '../../constant/constant';
import userService from '../../services/userService';
import { saveToStorage } from '../../utils/utils';

const VerifyOtp = ({navigation, route }) => {
    const [state, setState] = useState({
        otp: '',
        disabled: true,
        error: '',/*  */
    });

    const handleVerify = async ()=> {
        // disable verify button
        setState((prev) => { return {...prev, disabled: true }});
        try {
            const requestData = {
                otp: state.otp, 
                requestType: route?.params?.requestType
            }
            console.info({ OTPDATA: requestData });

            const data = await userService.verifyOtp(requestData);
            // enable button
            setState((prev) => { return {...prev, disabled: false, error: '' }});
            console.info({data: data.data });

            //save the otp token to storage
            saveToStorage(Constant.STORAGE_KEYS.USER_TOKEN, data?.data?.token);

            //navigate to verity otp page
            navigation.navigate(Constant.ROUTES.DASHBOARD, { user: data?.data?.data  });
            
        } catch (err) {
            console.error(`error while login`, err);
            const msg = err?.response?.data?.message;
            setState((prev) => { return {...prev, error: msg, disabled: false }});
        }
    }

    const handleChange = (val) => {
        let disabled = true;
        if (val.length === 6) {
          disabled = false;
        }

        if (val.length > 6) {
            return;
        }

        setState((prev) => { return {...prev, otp: val, disabled }})
    }
  return (
      <SafeAreaView style={verifyOtpStyles.container}>
       <Image style ={verifyOtpStyles.logo} source={{ uri: Constant.ASSEST_URLS.LOGO }}/>
        <Text style={[COMMON_STYLES.TITLE_TEXT, COMMON_STYLES.MARGIN_TOP]}>
                Verify OTP
        </Text>

        <View style={verifyOtpStyles.verifyOtpContainter}>
            <TextInput placeholderTextColor ="#333333" style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here OTP" keyboardType="numeric" onChangeText={handleChange} maxLength={6} value={state.otp}/>

            <TouchableHighlight disabled={state.disabled} onPress= {handleVerify} style={[COMMON_STYLES.BTN_1, state.disabled && COMMON_STYLES.DISABLED_BTN]}>
                <Text style={[COMMON_STYLES.BTN_TEXT, state.disabled && COMMON_STYLES.DISABLED_TEXT]}>Verify</Text>
            </TouchableHighlight>

            <Text style={[COMMON_STYLES.ERROR_TXT, COMMON_STYLES.MARGIN_TOP]}>{state.error}</Text>
            
        </View>
      </SafeAreaView>
  )
}

export default VerifyOtp;