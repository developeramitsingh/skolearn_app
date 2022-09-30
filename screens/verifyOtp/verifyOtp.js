import { View, Text, Image, Pressable, SafeAreaView, TextInput } from 'react-native';
import { verifyOtpStyles } from './verifyOtpStyles';
import { useEffect, useState } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from  '../../constant/constant';
import userService from '../../services/userService';
import { saveToStorage } from '../../utils/utils';
import Loader from '../../components/loader/loader';
import { LANGUAGES_DATA } from '../../constant/language';
import { setCurrentLanguage } from '../../common/functions/commonHelper';

const VerifyOtp = ({navigation, route }) => {
    const [state, setState] = useState({
        otp: '',
        disabled: true,
        error: '',
        isLoading: false,
    });
    const [lang, setLang] = useState();

    useEffect(() => {
        setCurrentLanguage(setLang);
    }, []);

    const handleVerify = async ()=> {
        // disable verify button
        setState((prev) => { return {...prev, disabled: true, isLoading: true }});
        try {
            const requestData = {
                otp: state.otp, 
                requestType: route?.params?.requestType
            }
            console.info({ OTPDATA: requestData });

            const data = await userService.verifyOtp(requestData);
            // enable button
            setState((prev) => { return {...prev, disabled: false, error: '', isLoading: false }});

            const user = JSON.parse(JSON.stringify(data?.data?.data));

            //save the otp token to storage
            saveToStorage(Constant.STORAGE_KEYS.USER_TOKEN, data?.data?.token);
            //save the userId to storage
            saveToStorage(Constant.STORAGE_KEYS.USER_ID, user?._id);

            //save the user to storage
            saveToStorage(Constant.STORAGE_KEYS.USER, user);

            //navigate to dashboard page
            navigation.navigate(Constant.ROUTES.DASHBOARD, { user });
            
        } catch (err) {
            console.error(`error while login`, err);
            const msg = err?.response?.data?.message;
            setState((prev) => { return {...prev, error: LANGUAGES_DATA[lang]?.VERIFY_OTP?.ERRORS?.OTP_VALID, disabled: false, isLoading: false }});
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
        <Loader isLoading={state.isLoading}/>
       <Image style ={verifyOtpStyles.logo} source={{ uri: Constant.ASSEST_URLS.LOGO }}/>
        <Text style={[COMMON_STYLES.TITLE_TEXT, COMMON_STYLES.MARGIN_TOP]}>
                {LANGUAGES_DATA[lang]?.VERIFY_OTP?.HEADING}
        </Text>

        <View style={verifyOtpStyles.verifyOtpContainter}>
            <TextInput placeholderTextColor ="#333333" style={COMMON_STYLES.TEXT_INPUT} placeholder= {LANGUAGES_DATA[lang]?.VERIFY_OTP?.PLACEHOLDER} keyboardType="numeric" onChangeText={handleChange} maxLength={6} value={state.otp}/>

            <Pressable elevation={3} disabled={state.disabled} onPress= {handleVerify} style={[COMMON_STYLES.BTN_1, state.disabled && COMMON_STYLES.DISABLED_BTN]}>
                <Text style={[COMMON_STYLES.BTN_TEXT, state.disabled && COMMON_STYLES.DISABLED_TEXT]}>{LANGUAGES_DATA[lang]?.VERIFY_OTP?.BTN_TXT}</Text>
            </Pressable>

            <Text style={[COMMON_STYLES.ERROR_TXT, COMMON_STYLES.MARGIN_TOP]}>{state.error}</Text>
            
        </View>
      </SafeAreaView>
  )
}

export default VerifyOtp;