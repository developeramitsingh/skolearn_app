import { View, Text, Image, TouchableHighlight, SafeAreaView, TextInput } from 'react-native';
import { registerStyles } from './registerStyles';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';
import { Checkbox } from 'react-native-paper';

const Register = ({navigation}) => {
    const [state, setState] = useState({
        register: false,
        mobile: '',
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
       <Image style ={registerStyles.logo} source={logo}/>
        <Text style={COMMON_STYLES.TITLE_TEXT}>
                Register
        </Text>

        <View style={registerStyles.registerContainter}>
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
                <Text style= {COMMON_STYLES.BODY_TEXT}>Accept Terms and conditions</Text>
            </View>
            

            <TouchableHighlight handlePress={() => handlePress('register')} onPressOut={() => handlePress('register')} onPressIn={() => handlePress('register')} style={COMMON_STYLES.BTN_1}>
                <Text style={COMMON_STYLES.BTN_TEXT}>Register</Text>
            </TouchableHighlight>

            
        </View>
      </SafeAreaView>
  )
}

export default Register;