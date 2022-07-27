import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import statusBarStyles from './statusBarStyles';
import {FontAwesome, Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.png';
import { ROUTES } from '../../constant/constant';


const StatusBar = ({navigation}) => {
    const handlePress = (actionType) => {
        if (actionType === 'openProfile') {
            navigation.navigate(ROUTES.PROFILE);
        }
    }
    return (
        <View style={statusBarStyles.SUB_CONT}>
            <Image source={Logo} style={{height: 32, width: 100, borderRadius: 10}}/>

            <View style={statusBarStyles.ROW}>
                <FontAwesome onPress={()=> handlePress('openProfile')} name="user-circle" size={26} color="white"/>
                <Text onPress={()=> handlePress('openProfile')} style={statusBarStyles.LABEL_TEXT}>Hi Amit</Text>
                <Ionicons onPress={()=> handlePress('openNotifications')}  name="notifications" size={26} color="white"/>
                
            </View>
            
        </View>
    )
}

export default StatusBar;