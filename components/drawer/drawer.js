import { ScrollView, Text, View, Image, NativeModules,
    LayoutAnimation,
    TouchableHighlight,
    Pressable,
    Alert, } from "react-native"
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { drawerStyles } from './drawerStyles';
import * as Constant from '../../constant/constant';
import {FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BackBtn from '../../components/backBtn/backBtn';
import { useEffect, useRef, useState } from "react";
import { userService } from '../../services';
import { getFromStorage, saveToStorage } from "../../utils/utils";
import { setCurrentLanguage } from '../../common/functions/commonHelper';
import { LANGUAGES_DATA } from "../../constant/language";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Drawer = ({navigation, setDrawer, user }) => {
    const [state, setState] = useState({
        drawerRight: -230,
    })
    const [language, setLanguage] = useState(Constant.LANGUAGES.ENGLISH);

    useEffect(() => {
        setCurrentLanguage(setLanguage);
        LayoutAnimation.easeInEaseOut();
        setState((prev) => {
            
            return { ...prev, drawerRight: 0 }
        })
    }, [user]);

    const handlePress = async (actionType) => {
        const url = Constant.BACKEND_URL;
        if (actionType === Constant.ACTION_TYPES.OPEN_PROFILE) {
            navigation.navigate(Constant.ROUTES.PROFILE, { user });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_HOW_TO_ATTEMPT_TEST) {
            navigation.navigate(Constant.ROUTES.WEB_VIEW, { webViewUrl: `${url}/policy/${Constant.POLICY.HOW_TO_ATTEMPT_TEST}` });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_ABOUT_US) {
            navigation.navigate(Constant.ROUTES.WEB_VIEW, { webViewUrl: `${url}/policy/${Constant.POLICY.ABOUT_US}` });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_FAQ) {
            navigation.navigate(Constant.ROUTES.WEB_VIEW, { webViewUrl: `${url}/policy/${Constant.POLICY.FAQ}` });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_TERMS_POLICY) {
            navigation.navigate(Constant.ROUTES.WEB_VIEW, { webViewUrl: `${url}/policy/${Constant.POLICY.TERMS_COND}` });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_PRIVACY_POLICY) {
            navigation.navigate(Constant.ROUTES.WEB_VIEW, { webViewUrl: `${url}/policy/${Constant.POLICY.PRIVACY_POLICY}` });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_REFUND_POLICY) {
            navigation.navigate(Constant.ROUTES.WEB_VIEW, { webViewUrl: `${url}/policy/${Constant.POLICY.REFUND_POLICY}` });
        } else if (actionType === Constant.ACTION_TYPES.LOGOUT) {
            userService.dologout(navigation, { calledFrom: 'drawer' });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_LANGUAGE) {
            const storedLang = await getFromStorage(Constant.STORAGE_KEYS.CURRENT_LANGUAGE);
            const optionLang = storedLang === Constant.LANGUAGES.ENGLISH ? Constant.LANGUAGES.HINDI : Constant.LANGUAGES.ENGLISH;

            const langData = LANGUAGES_DATA[language];

            Alert.alert(`${langData?.DRAWER.CHANGE_LANGUAGE}`,`${langData?.DRAWER.CHANGE_TO}`, [
                {
                    text: langData?.DRAWER.CANCEL, onPress: () => {}
                },
                {
                    text: langData?.DRAWER.CHANGE, onPress: () => {
                        saveToStorage(Constant.STORAGE_KEYS.CURRENT_LANGUAGE, optionLang);
                        setLanguage(optionLang);
                        navigation.navigate(Constant.ROUTES.DASHBOARD, { lang: optionLang, activeTab: Constant.TEST_TYPES.LIVE, activeScreen: Constant.SCREENS.TEST_LIST });
                    }
                },
            ]);
        }
        setDrawer(false);
    }

    return (
        <View elevation={10} style={[drawerStyles.DRAWER_CONT, { right: state?.drawerRight }]}>
            <View style={COMMON_STYLES.ROW_LEFT}>
                <BackBtn color={Constant.APP_COLORS.appThemeColor} handler={()=> setDrawer(false)}/>
                <Text style={COMMON_STYLES.ACTIVE_USER_TEXT}>{LANGUAGES_DATA[language]?.DRAWER.WELCOME} <Text style={COMMON_STYLES.ACTIVE_USER_TEXT}>{user?.userName}</Text></Text>
            </View>

            <ScrollView>
                <View style={COMMON_STYLES.CARD}>
                    <Pressable style={COMMON_STYLES.CARD} onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="user-circle" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor}/>
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.PROFILE}</Text>
                        </View>
                    </Pressable>

                    <Pressable style={COMMON_STYLES.CARD} onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_LANGUAGE)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="language" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor}/>
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.LANGUAGE}</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={COMMON_STYLES.CARD}>
                    <Pressable style={COMMON_STYLES.CARD} onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_HOW_TO_ATTEMPT_TEST)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialCommunityIcons name="head-lightbulb-outline" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor} />
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.HOW_TO_ATTEMPT_TEST}</Text>
                        </View>
                    </Pressable>
                </View>
                    
                <View style={COMMON_STYLES.CARD}>
                    <Pressable style={COMMON_STYLES.CARD} onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_ABOUT_US)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="info-circle" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor}/>
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.ABOUT_US}</Text>
                        </View>
                    </Pressable>

                    <Pressable style={COMMON_STYLES.CARD} onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_FAQ)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="question" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor}/>
                            
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.FAQ}</Text>
                        </View>
                    </Pressable>

                    <Pressable style={COMMON_STYLES.CARD} onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_TERMS_POLICY)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons name="fact-check" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor} />
                            
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.TERMS_COND}</Text>
                        </View>
                    </Pressable>
                </View>


                <View style={COMMON_STYLES.CARD}>
                    <Pressable style={COMMON_STYLES.CARD} onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_PRIVACY_POLICY)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons name="privacy-tip" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor}/>
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.PRIVACY_POLICY}</Text>
                        </View>
                    </Pressable>

                    <Pressable style={COMMON_STYLES.CARD} onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_REFUND_POLICY)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="money" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor}/>
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.REFUND_POLICY}</Text>
                        </View>
                    </Pressable>

                    <Pressable style={COMMON_STYLES.CARD} onPress= {()=> handlePress(Constant.ACTION_TYPES.LOGOUT)}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons name="logout" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appThemeColor} />
                            <Text style={drawerStyles.TAB_TEXT}>{LANGUAGES_DATA[language]?.DRAWER?.LOGOUT}</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={COMMON_STYLES.CARD}>
                    <View style={COMMON_STYLES.ROW_COLUMN_LEFT}>
                        <Image source={{ uri: Constant.ASSEST_URLS.LOGO }} style={{height: 28, width: 80}}/>
                        <Text style={[COMMON_STYLES.BODY_TEXT, { marginVertical: 2, fontWeight: 'bold'}]}>
                            Skolearn
                        </Text>

                        <Text style={[COMMON_STYLES.BODY_TEXT]}>
                            H. 111, Street 7, Shiv Enclave, Part - 1, Faridabad, Haryana - 121003
                        </Text>

                        <Text style={[COMMON_STYLES.BODY_TEXT]}>
                            Email: support@skolearn.com
                        </Text>

                        <Text style={[COMMON_STYLES.BODY_TEXT]}>                           
                            Contact: +91-9968470534
                        </Text>
                    </View>
                </View>

                <View style={COMMON_STYLES.CARD}>
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <Text style={COMMON_STYLES.BODY_TEXT}>
                                App Version: {Constant.APP_VERSION}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Drawer;