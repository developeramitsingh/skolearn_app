import { View, Text, Image, TouchableHighlight, SafeAreaView, TextInput } from 'react-native';
import { verifyOtpStyles } from './verifyOtpStyles';
import { useState } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from  '../../constant/constant';

const VerifyOtp = ({navigation}) => {
    const [state, setState] = useState({
        otp: '',
    });

    const handlePress = (btnType)=> {
        //sets color when btn pressed
        // setState(prev => {
        //     return {...prev, [btnType]: !state[btnType] }
        // })
        navigation.navigate('Dashboard');

    }

    const handleChange = (val) => {
        if (val.length > 6) {
            return;
        }

        setState((prev) => { return {...prev, otp: val }})
    }
  return (
      <SafeAreaView style={verifyOtpStyles.container}>
       <Image style ={verifyOtpStyles.logo} source={{ uri: Constant.ASSEST_URLS.LOGO }}/>
        <Text style={[COMMON_STYLES.TITLE_TEXT, COMMON_STYLES.MARGIN_TOP]}>
                Verify OTP
        </Text>

        <View style={verifyOtpStyles.verifyOtpContainter}>
            <TextInput placeholderTextColor ="#333333" style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here OTP" keyboardType="numeric" onChangeText={handleChange} maxLength={6} value={state.otp}/>

            <TouchableHighlight handlePress={() => handlePress()} onPress= {() => handlePress('verifyOtp')} onPressOut={() => handlePress('verifyOtp')} onPressIn={() => handlePress('verifyOtp')} style={COMMON_STYLES.BTN_1}>
                <Text style={COMMON_STYLES.BTN_TEXT}>Verify</Text>
            </TouchableHighlight>

            
        </View>
      </SafeAreaView>
  )
}

export default VerifyOtp;