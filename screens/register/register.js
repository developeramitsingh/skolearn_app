import { View, Text, Image, TouchableHighlight, SafeAreaView, TextInput, Linking } from 'react-native';
import { registerStyles } from './registerStyles';
import { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, BACKEND_URL } from '../../constant/constant';
import { Checkbox } from 'react-native-paper';
import * as Constant from  '../../constant/constant';

const Register = ({navigation}) => {
    const [state, setState] = useState({
        register: false,
        userName: null,
        mobile: null,
        email: null,
        term: false,
        referralCode: null,
        errors: {
            userName: '',
            mobile: '',
            email: '',
            term: '',
        }
    });

    const handlePress = (btnType)=> {
        //sets color when btn pressed
        navigation.navigate('VerifyOtp');
    }

    const handleChange = (val, inputName) => {
        setState((prev) => { return {...prev, [inputName]: val }})
    }
  return (
      <SafeAreaView style={registerStyles.container}>
       <Image style ={registerStyles.logo} source={{ uri: Constant.ASSEST_URLS.LOGO }}/>
        <Text style={[COMMON_STYLES.TITLE_TEXT, COMMON_STYLES.MARGIN_TOP]}>
                Register
        </Text>

        <View style={registerStyles.registerContainter}>
            <TextInput style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Name" onChangeText={(val) => handleChange(val, 'userName')} value={state.userName}/>

            <TextInput maxLength={10} style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Mobile" keyboardType="numeric" onChangeText= {(val) => handleChange(val, 'mobile')} value={state.mobile}/>

            <TextInput style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Email" onChangeText={(val) => handleChange(val, 'email')} value={state.email}/>

            <TextInput style={{ ...COMMON_STYLES.TEXT_INPUT, backgroundColor: APP_COLORS.light_grey }} placeholder="Referral Code" onChangeText={(val) => handleChange(val, 'referralCode')} value={state.referralCode}/>

            <View style= {{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                    status={state.term ? 'checked' : 'unchecked'}
                    onPress={() => {
                       setState(prev => ({ ...prev, term: !prev.term }));
                    }}
                    color={APP_COLORS.green}
                    uncheckedColor={APP_COLORS.white}
                />

                <Text style={COMMON_STYLES.BODY_TEXT}>Accept <Text style={COMMON_STYLES.LINK_TEXT} onPress={()=>Linking.openURL(`${BACKEND_URL}/terms`)}> Terms and Conditions</Text></Text>
            </View>
            

            <TouchableHighlight handlePress={() => handlePress('register')} onPressOut={() => handlePress('register')} onPressIn={() => handlePress('register')} style={COMMON_STYLES.BTN_1}>
                <Text style={COMMON_STYLES.BTN_TEXT}>Register</Text>
            </TouchableHighlight>

            
        </View>
      </SafeAreaView>
  )
}

export default Register;