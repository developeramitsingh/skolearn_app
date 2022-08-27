import { View, Text, Image } from 'react-native';
import statusBarStyles from './statusBarStyles';
import {FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { ROUTES } from '../../constant/constant';
import { useEffect, useState } from 'react';
import * as Constant from  '../../constant/constant';


const StatusBar = ({ navigation, isNewNotifi }) => {
    const [state, setState] = useState({
        userName: 'Test user',
        profileImg: false,
    });

    useEffect(() => {

    }, [isNewNotifi]);

    const handlePress = (actionType) => {
        if (actionType === Constant.ACTION_TYPES.OPEN_PROFILE) {
            navigation.navigate(ROUTES.PROFILE);
        } else if (actionType === Constant.ACTION_TYPES.OPEN_NOTIFI) {
            navigation.navigate(ROUTES.NOTIFICATION);
        }
    }
    return (
        <View style={statusBarStyles.SUB_CONT}>
            <Image source={{ uri: Constant.ASSEST_URLS.LOGO }} style={{height: 32, width: 100, borderRadius: 10}}/>

            <View style={statusBarStyles.ROW}>
                {
                    isNewNotifi 
                        ? <MaterialCommunityIcons style={{ marginLeft: 10 }} onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_NOTIFI)}  name="bell-badge" size={26} color={Constant.APP_COLORS.yellow}/>
                        : <MaterialCommunityIcons style={{ marginLeft: 10 }} onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_NOTIFI)}  name="bell" size={26} color={Constant.APP_COLORS.white}/>
               }
                {/* <Text onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)} style={statusBarStyles.LABEL_TEXT}>Hi {state.userName}!</Text> */}
                <FontAwesome onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)} name="user-circle" size={26} color="white"/>
               
               
            </View>
            
        </View>
    )
}

export default StatusBar;