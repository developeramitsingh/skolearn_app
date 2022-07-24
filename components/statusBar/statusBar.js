import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import statusBarStyles from './statusBarStyles';
import {FontAwesome, Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.png';


const StatusBar = (props) => {
    return (
        <View style={statusBarStyles.SUB_CONT}>
            <Image source={Logo} style={{height: 32, width: 100, borderRadius: 10}}/>

            <View style={statusBarStyles.ROW}>
                <FontAwesome name="user-circle" size={26} color="white"/>
                <Text style={statusBarStyles.LABEL_TEXT}>Hi Amit</Text>
                <Ionicons name="notifications" size={26} color="white"/>
                
            </View>
            
        </View>
    )
}

export default StatusBar;