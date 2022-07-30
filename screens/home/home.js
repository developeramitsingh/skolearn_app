import { View, Text, ImageBackground, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import { homeStyles } from './homeStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { BACKEND_URL } from '../../constant/constant';


//import logo from '../../assets/logo.png';
import backImage from '../../assets/background.png';
import { useState } from 'react';

const Home = ({navigation}) => {
    const [state, setState] = useState({
        login: false,
        register: false,
    });

    const handlePress = (btnType)=> {
        //sets color when btn pressed
        // setState(prev => {
        //     return {...prev, [btnType]: !state[btnType] }
        // })

        if(btnType === 'login') {
            navigation.navigate('Login');
        } else if(btnType === 'register') {
            navigation.navigate('Register');
        }
    }
  return (
      <SafeAreaView style={homeStyles.container}>
          <ImageBackground source={backImage} style={homeStyles.backImage}>
                <View style ={homeStyles.tagLineView}>
                    <Text style={homeStyles.tagLine}>
                        India's First Scholarship Platform
                    </Text>
                </View>

                <View style={homeStyles.loginBtnContainter}>
                    <TouchableHighlight handlePress={() => handlePress('login')} onPressOut={() => handlePress('login')} onPressIn={() => handlePress('login')} onPress= {handlePress} style={COMMON_STYLES.BTN_1}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Login</Text>
                    </TouchableHighlight>

                    <TouchableHighlight handlePress={() => handlePress('register')} onPressOut={() => handlePress('register')} onPressIn={() => handlePress('register')} style={COMMON_STYLES.BTN_1}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Register</Text>
                    </TouchableHighlight>
                </View>

                <Text style={COMMON_STYLES.BODY_TEXT}>By Continuing you agree to the<Text style={COMMON_STYLES.LINK_TEXT} onPress={()=>Linking.openURL(`${BACKEND_URL}/terms`)}> Terms and Conditions</Text></Text>
          </ImageBackground>
      </SafeAreaView>
  )
}

export default Home;