import { ScrollView, Text, View, Image, NativeModules,
    LayoutAnimation,
    TouchableHighlight,
    Pressable, } from "react-native"
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { drawerStyles } from './drawerStyles';
import * as Constant from '../../constant/constant';
import {FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BackBtn from '../../components/backBtn/backBtn';
import { useEffect, useRef, useState } from "react";
import { userService } from '../../services';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Drawer = ({navigation, setDrawer, user }) => {
    const [state, setState] = useState({
        drawerRight: -230,
    })

    useEffect(() => {
        LayoutAnimation.easeInEaseOut();
        setState((prev) => {
            
            return { ...prev, drawerRight: 0 }
        })
    }, [user]);

    const handlePress = (actionType) => {
        setDrawer(false);
        if (actionType === Constant.ACTION_TYPES.OPEN_PROFILE) {
            navigation.navigate(Constant.ROUTES.PROFILE, { user });
        } else if (actionType === Constant.ACTION_TYPES.OPEN_ABOUT_US) {
            navigation.navigate(Constant.ROUTES.WEB_VIEW, { webViewUrl: Constant.PAGES_LINK.ABOUT_US });
        } else if (actionType === Constant.ACTION_TYPES.LOGOUT) {
            userService.dologout(navigation, { calledFrom: 'drawer' });
        }
    }

    return (
        <View elevation={10} style={[drawerStyles.DRAWER_CONT, { right: state?.drawerRight }]}>
            <View style={COMMON_STYLES.ROW_LEFT}>
                <BackBtn color={Constant.APP_COLORS.appBlue} handler={()=> setDrawer(false)}/>
                <Text style={COMMON_STYLES.ACTIVE_USER_TEXT}>Welcome <Text style={COMMON_STYLES.ACTIVE_USER_TEXT}>{user?.userName}</Text></Text>
            </View>

            <ScrollView>
                <View style={COMMON_STYLES.CARD}>
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="user-circle" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appBlue}/>
                            <Pressable onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)}>
                                <Text style={drawerStyles.TAB_TEXT}>Profile</Text>
                            </Pressable>
                        </View>
                    </View>
                    
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="info-circle" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appBlue}/>
                            <Pressable onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_ABOUT_US)}>
                            <Text style={drawerStyles.TAB_TEXT}>About Us</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="question" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appBlue}/>
                            <Pressable onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_FAQ)}>
                                <Text style={drawerStyles.TAB_TEXT}>FAQ</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons name="fact-check" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appBlue} />
                            <Pressable onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_TERMS_POLICY)}>
                            <Text style={drawerStyles.TAB_TEXT}>Terms & Conditions</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>


                <View style={COMMON_STYLES.CARD}>
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons name="privacy-tip" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appBlue}/>
                            <Pressable onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_PRIVACY_POLICY)}>
                                <Text style={drawerStyles.TAB_TEXT}>Privacy Policy</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome name="money" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appBlue}/>
                            <Pressable onPress= {()=> handlePress(Constant.ACTION_TYPES.OPEN_REFUND_POLICY)}>
                                <Text style={drawerStyles.TAB_TEXT}>Refund Policy</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons name="logout" size={20} style={drawerStyles.TAB_ICON_WIDTH} color={Constant.APP_COLORS.appBlue} />
                            <Pressable onPress= {()=> handlePress(Constant.ACTION_TYPES.LOGOUT)}>
                                <Text style={drawerStyles.TAB_TEXT}>Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={COMMON_STYLES.CARD}>
                    <View style={COMMON_STYLES.ROW_COLUMN_LEFT}>
                        <Image source={{ uri: Constant.ASSEST_URLS.LOGO }} style={{height: 28, width: 80}}/>
                        <Text style={[COMMON_STYLES.BODY_TEXT, { marginVertical: 2, fontWeight: 'bold'}]}>
                            Skolearn India
                        </Text>

                        <Text style={[COMMON_STYLES.BODY_TEXT]}>
                            ABC Address, New Delhi
                        </Text>

                        <Text style={[COMMON_STYLES.BODY_TEXT]}>
                            Email: support@skolearn.com
                        </Text>

                        <Text style={[COMMON_STYLES.BODY_TEXT]}>                           
                            Contact: +91-011-0111-021
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