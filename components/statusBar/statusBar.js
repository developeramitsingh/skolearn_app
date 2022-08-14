import { View, Text, Image, TouchableWithoutFeedback, SafeAreaView, Linking } from 'react-native';
import statusBarStyles from './statusBarStyles';
import {FontAwesome, Ionicons } from '@expo/vector-icons';
import { ROUTES } from '../../constant/constant';
import { useState } from 'react';
import * as Constant from  '../../constant/constant';


const StatusBar = ({navigation}) => {
    const [state, setState] = useState({
        userName: 'Test user',
        profileImg: 'https://st.depositphotos.com/1770836/1372/i/600/depositphotos_13720433-stock-photo-young-indian-student.jpg'
    });
    const handlePress = (actionType) => {
        if (actionType === 'openProfile') {
            navigation.navigate(ROUTES.PROFILE);
        }
    }
    return (
        <SafeAreaView style={statusBarStyles.SUB_CONT}>
            <Image source={{ uri: Constant.ASSEST_URLS.LOGO }} style={{height: 32, width: 100, borderRadius: 10}}/>

            <View style={statusBarStyles.ROW}>
                <Text onPress={()=> handlePress('openProfile')} style={statusBarStyles.LABEL_TEXT}>Hi {state.userName}!</Text>
                {
                    state.profileImg 
                        ? <TouchableWithoutFeedback onPress={()=> handlePress('openProfile')}>
                            <Image style={statusBarStyles.PROFILE_IMG} source={{uri: state.profileImg}}/>
                            </TouchableWithoutFeedback>
                        : <FontAwesome onPress={()=> handlePress('openProfile')} name="user-circle" size={26} color="white"/>
                }
               
                {/* <Ionicons onPress={()=> handlePress('openNotifications')}  name="notifications" size={26} color="white"/> */}
                
            </View>
            
        </SafeAreaView>
    )
}

export default StatusBar;