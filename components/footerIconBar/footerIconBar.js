const { View, Pressable, Text } = require("react-native")
import {Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES } from '../../constant/constant';
import { footerIconBarStyles } from './footerIconBarStyles';

const FooterIconBar = ({navigation}) => {
    const [activeTab, setActiceTab] = useState(ROUTES.DASHBOARD);
    const handlePress = (btnKey) => {
        if (btnKey === ROUTES.DASHBOARD) {
            navigation.navigate(ROUTES.DASHBOARD)
            setActiceTab(ROUTES.DASHBOARD);
        } else if(btnKey === ROUTES.WALLET) {
            navigation.navigate(ROUTES.WALLET)
            setActiceTab(ROUTES.WALLET);
        } else if(btnKey === ROUTES.HELP) {
            navigation.navigate(ROUTES.HELP)
            setActiceTab(ROUTES.HELP);
        }
    }
    return (
        <View style ={COMMON_STYLES.ROW}>
            <Pressable onPress={()=> handlePress(ROUTES.DASHBOARD)} style={footerIconBarStyles.TABS_BTN}>
                <FontAwesome name="home" size={28} color={ activeTab === ROUTES.DASHBOARD ? APP_COLORS.blue : APP_COLORS.white }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>Home</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(ROUTES.WALLET)} style={footerIconBarStyles.TABS_BTN}>
                <Entypo name="wallet" size={28} color={ activeTab === ROUTES.WALLET ? APP_COLORS.blue : APP_COLORS.white }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>Wallet</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(ROUTES.HELP)} style={footerIconBarStyles.TABS_BTN}>
                <AntDesign name="customerservice" size={28} color={ activeTab === ROUTES.HELP ? APP_COLORS.blue : APP_COLORS.white }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>Help</Text>
            </Pressable>
            
        </View>
    )
}

export default FooterIconBar;