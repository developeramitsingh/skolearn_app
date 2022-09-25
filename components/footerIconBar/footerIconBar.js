const { View, Pressable, Text } = require("react-native")
import {Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES, SCREENS } from '../../constant/constant';
import { footerIconBarStyles } from './footerIconBarStyles';

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
        }
    }
    return (
        <View style ={[COMMON_STYLES.ROW, footerIconBarStyles.FOOTER_BAR]}>
            <Pressable onPress={()=> handlePress(SCREENS.TEST_LIST)} style={footerIconBarStyles.TABS_BTN}>
                <FontAwesome name="home" size={28} color={ activeTab === SCREENS.TEST_LIST ? APP_COLORS.appBlue : APP_COLORS.lightBlue }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>{langData?.['HOME']}</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(SCREENS.WALLET)} style={footerIconBarStyles.TABS_BTN}>
                <Entypo name="wallet" size={28} color={ activeTab === SCREENS.WALLET ? APP_COLORS.appBlue : APP_COLORS.lightBlue }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>{langData?.['WALLET']}</Text>
            </Pressable>
            

            <Pressable onPress={()=> handlePress(SCREENS.HELP)} style={footerIconBarStyles.TABS_BTN}>
                <AntDesign name="customerservice" size={28} color={ activeTab === SCREENS.HELP ? APP_COLORS.appBlue : APP_COLORS.lightBlue }/>
                <Text style={COMMON_STYLES.BODY_TEXT}>{langData?.['HELP']}</Text>
            </Pressable>
            
        </View>
    )
}

export default FooterIconBar;