const { View, Pressable, Text } = require("react-native")
import {Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES, SCREENS } from '../../constant/constant';
import { footerIconBarStyles } from './footerIconBarStyles';

const FooterIconBar = ({ setActiveScreen }) => {
    const [activeTab, setActiceTab] = useState(SCREENS.TEST_LIST);

    const handlePress = (btnKey) => {
        if (btnKey === SCREENS.TEST_LIST) {
            setActiveScreen(SCREENS.TEST_LIST)
            setActiceTab(SCREENS.TEST_LIST);
        } else if(btnKey === SCREENS.WALLET) {
            setActiveScreen(SCREENS.WALLET)
            setActiceTab(SCREENS.WALLET);
        } else if(btnKey === SCREENS.HELP) {
            setActiveScreen(SCREENS.HELP)
            setActiceTab(SCREENS.HELP);
        }
    }
    return (
        <View style ={COMMON_STYLES.ROW}>
            <Pressable onPress={()=> handlePress(SCREENS.TEST_LIST)} style={footerIconBarStyles.TABS_BTN}>
                <FontAwesome name="home" size={28} color={ activeTab === SCREENS.TEST_LIST ? APP_COLORS.blue : APP_COLORS.white }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>Home</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(SCREENS.WALLET)} style={footerIconBarStyles.TABS_BTN}>
                <Entypo name="wallet" size={28} color={ activeTab === SCREENS.WALLET ? APP_COLORS.blue : APP_COLORS.white }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>Wallet</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(SCREENS.HELP)} style={footerIconBarStyles.TABS_BTN}>
                <AntDesign name="customerservice" size={28} color={ activeTab === SCREENS.HELP ? APP_COLORS.blue : APP_COLORS.white }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>Help</Text>
            </Pressable>
            
        </View>
    )
}

export default FooterIconBar;