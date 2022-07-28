import { View, Text, Image, TouchableWithoutFeedback, SafeAreaView, Linking } from 'react-native';
import statusBarStyles from './statusBarStyles';
import {FontAwesome, Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.png';
import { ROUTES } from '../../constant/constant';
import { useState } from 'react';


const StatusBar = ({navigation}) => {
    const [state, setState] = useState({
        profileImg: 'https://st.depositphotos.com/1770836/1372/i/600/depositphotos_13720433-stock-photo-young-indian-student.jpg'
    });
    const handlePress = (actionType) => {
        if (actionType === 'openProfile') {
            navigation.navigate(ROUTES.PROFILE);
        }
    }
    return (
        <View style={statusBarStyles.SUB_CONT}>
            <Image source={Logo} style={{height: 32, width: 100, borderRadius: 10}}/>

            <View style={statusBarStyles.ROW}>
                {
                    state.profileImg 
                        ? <TouchableWithoutFeedback onPress={()=> handlePress('openProfile')}>
                            <Image style={statusBarStyles.PROFILE_IMG} source={{uri: state.profileImg}}/>
                            </TouchableWithoutFeedback>
                        : <FontAwesome onPress={()=> handlePress('openProfile')} name="user-circle" size={26} color="white"/>
                }
                <Text onPress={()=> handlePress('openProfile')} style={statusBarStyles.LABEL_TEXT}>Hi Amit</Text>
                <Ionicons onPress={()=> handlePress('openNotifications')}  name="notifications" size={26} color="white"/>
                
            </View>
            
        </View>
    )
}

export default StatusBar;