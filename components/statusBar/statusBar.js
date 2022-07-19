import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import statusBarStyles from './statusBarStyles';
import {FontAwesome } from '@expo/vector-icons';
import Logo from '../../assets/logo.png';


const StatusBar = (props) => {
    return (
        <View style={statusBarStyles.SUB_CONT}>
            <Image source={Logo} style={{height: 32, width: 100, borderRadius: 10}}/>
            <FontAwesome name="user-circle" size={32} color="white" />
        </View>
    )
}

export default StatusBar;