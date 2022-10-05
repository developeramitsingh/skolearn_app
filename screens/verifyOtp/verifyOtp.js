import { View, Text, Image, Pressable, SafeAreaView, TextInput, Alert } from 'react-native';
import { verifyOtpStyles } from './verifyOtpStyles';
import { useEffect, useState } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from  '../../constant/constant';
import userService from '../../services/userService';
import { getFromStorage, removeFromStorage, saveToStorage } from '../../utils/utils';
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

        removeFromStorage(Constant.STORAGE_KEYS.OTP_RESEND_COUNT);
    }

    const handleResendOtp = async () => {
        try {
            setState(prev => {
                return { ...prev, infoMsg: '' }
            });

            let { resendCount, lastSentTime } = await getFromStorage(Constant.STORAGE_KEYS.OTP_RESEND_COUNT) || {}; 
            const currentTime = new Date().getTime();

            console.info({ resendCount, lastSentTime, currentTime });

            // stop user for calling the resend api if sent before lessthan 1 minute 
            if ((+lastSentTime + 60000) > +currentTime && resendCount && resendCount < 3) {
                Alert.alert('', LANGUAGES_DATA[lang]?.VERIFY_OTP?.ERRORS?.OTP_RESENT_1, [
                    {
                        text: LANGUAGES_DATA[lang]?.VERIFY_OTP?.OK
                    }
                ]);
                return;
            }

            // stop user for calling the resend api if sent count 3 and before 15 minutes
            if (resendCount && resendCount === 3 && (+lastSentTime + 6000) > +currentTime) {
                Alert.alert('', LANGUAGES_DATA[lang]?.VERIFY_OTP?.ERRORS?.OTP_RESENT_2, [
                    {
                        text: LANGUAGES_DATA[lang]?.VERIFY_OTP?.OK
                    }
                ]);
                return;
            }
            const data = await userService.resendOtp();

            //save the otp token to storage
            saveToStorage(Constant.STORAGE_KEYS.OTP_TOKEN, data?.otpToken);

            if (resendCount === 3) {
                resendCount = 0;
            }
            //save the otp resend count and time
            saveToStorage(Constant.STORAGE_KEYS.OTP_RESEND_COUNT, { resendCount: resendCount ? resendCount + 1 : 1, lastSentTime: new Date().getTime() })

            setState(prev => {
                return { ...prev, infoMsg: LANGUAGES_DATA[lang]?.VERIFY_OTP?.SUCCESS?.OTP_RESENT}
            });
            
        } catch (err) {
            console.error(`error in handleResendOtp: ${err}`);
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

            <Pressable elevation={3} onPress= {handleResendOtp} style={[COMMON_STYLES.SUB_BTN_2, { maxWidth: 150, alignSelf: 'center', marginTop: 10 }]}>
                <Text style={[COMMON_STYLES.SUB_BTN_TXT_1]}>{LANGUAGES_DATA[lang]?.VERIFY_OTP?.RESEND_TXT}</Text>
            </Pressable>

            <Text style={[COMMON_STYLES.ERROR_TXT]}>{state.error}</Text>
            <Text style={[COMMON_STYLES.SUCCESS_TXT]}>{state.infoMsg}</Text>
            
        </View>
      </SafeAreaView>
  )
}

export default VerifyOtp;