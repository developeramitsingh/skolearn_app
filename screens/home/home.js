import { View, Text, ImageBackground, TouchableHighlight, SafeAreaView } from 'react-native';
import { homeStyles } from './homeStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';


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
                    <TouchableHighlight handlePress={() => handlePress('login')} onPressOut={() => handlePress('login')} onPressIn={() => handlePress('login')} style={COMMON_STYLES.BTN_1}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Login</Text>
                    </TouchableHighlight>

                    <TouchableHighlight handlePress={() => handlePress('register')} onPressOut={() => handlePress('register')} onPressIn={() => handlePress('register')} style={COMMON_STYLES.BTN_1}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Register</Text>
                    </TouchableHighlight>
                </View>

                <Text style={homeStyles.textBody}>By Continuing you agree to the Terms and Conditions here</Text>
          </ImageBackground>
      </SafeAreaView>
  )
}

export default Home;