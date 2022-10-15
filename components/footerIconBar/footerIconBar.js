const { View, Pressable, Text } = require("react-native")
import {Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES, SCREENS } from '../../constant/constant';
import { footerIconBarStyles } from './footerIconBarStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const FooterIconBar = ({ setActiveScreen, langData }) => {
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
        } else if (btnKey === SCREENS.PROFILE) {
            setActiveScreen(SCREENS.PROFILE)
            setActiceTab(SCREENS.PROFILE);
        }
    }
    return (
        <View style ={[COMMON_STYLES.ROW, footerIconBarStyles.FOOTER_BAR]}>
            <Pressable onPress={()=> handlePress(SCREENS.TEST_LIST)} style={footerIconBarStyles.TABS_BTN}>
                <FontAwesome name="home" size={24} color={ activeTab === SCREENS.TEST_LIST ? APP_COLORS.appThemeColor : APP_COLORS.lightAppThemeColor }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>{langData?.['HOME']}</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(SCREENS.WALLET)} style={footerIconBarStyles.TABS_BTN}>
                <Entypo name="wallet" size={24} color={ activeTab === SCREENS.WALLET ? APP_COLORS.appThemeColor : APP_COLORS.lightAppThemeColor }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>{langData?.['WALLET']}</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(SCREENS.HELP)} style={footerIconBarStyles.TABS_BTN}>
                <AntDesign name="customerservice" size={24} color={ activeTab === SCREENS.HELP ? APP_COLORS.appThemeColor : APP_COLORS.lightAppThemeColor }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>{langData?.['HELP']}</Text>
            </Pressable>

            <Pressable onPress={()=> handlePress(SCREENS.PROFILE)} style={footerIconBarStyles.TABS_BTN}>
                <FontAwesome5 name="user-alt" size={24} color={ activeTab === SCREENS.PROFILE ? APP_COLORS.appThemeColor : APP_COLORS.lightAppThemeColor } />
                <Text style={COMMON_STYLES.BODY_TEXT}>{langData?.['PROFILE']}</Text>
            </Pressable>
            
        </View>
    )
}

export default React.memo(FooterIconBar);