import { ScrollView, Text, View, Image } from "react-native"
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { drawerStyles } from './drawerStyles';
import * as Constant from '../../constant/constant';
import {FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BackBtn from '../../components/backBtn/backBtn';

const Drawer = ({navigation, userName, setDrawer }) => {
    const handlePress = (actionType) => {
        if (actionType === Constant.ACTION_TYPES.OPEN_PROFILE) {
            
        } else if (actionType === Constant.ACTION_TYPES.OPEN_NOTIFI) {
            navigation.navigate(ROUTES.NOTIFICATION);
        }
    }
    return (
        <View style={drawerStyles.DRAWER_CONT}>
            <View style={COMMON_STYLES.ROW_LEFT}>
                <BackBtn color={Constant.APP_COLORS.appBlue} handler={()=> setDrawer(false)}/>
                <Text style={COMMON_STYLES.BODY_TEXT}>Welcome <Text style={COMMON_STYLES.ACTIVE_USER_TEXT}>{userName}</Text></Text>
            </View>

            <ScrollView>
                <View style={COMMON_STYLES.CARD}>
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)} name="user-circle" size={20} color={Constant.APP_COLORS.appBlue}/>

                            <Text style={[COMMON_STYLES.BTN_TEXT, COMMON_STYLES.MARGIN_LEFT]}>
                                Profile
                            </Text>
                        </View>
                    </View>
                    
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)} name="info-circle" size={20} color={Constant.APP_COLORS.appBlue}/>

                            <Text style={drawerStyles.TAB_TEXT}>
                                About Us
                            </Text>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)} name="question" size={20} color={Constant.APP_COLORS.appBlue}/>

                            <Text style={drawerStyles.TAB_TEXT}>
                                FAQ
                            </Text>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons name="fact-check" size={20} color={Constant.APP_COLORS.appBlue} />

                            <Text style={drawerStyles.TAB_TEXT}>
                                Terms & Conditions
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={COMMON_STYLES.CARD}>
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <MaterialIcons onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)} name="privacy-tip" size={20} color={Constant.APP_COLORS.appBlue}/>

                            <Text style={drawerStyles.TAB_TEXT}>
                                Privacy Policy
                            </Text>
                        </View>
                    </View>
                    <View style={COMMON_STYLES.CARD}>
                        <View style={COMMON_STYLES.ROW_LEFT}>
                            <FontAwesome onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_PROFILE)} name="money" size={20} color={Constant.APP_COLORS.appBlue}/>

                            <Text style={[COMMON_STYLES.BTN_TEXT, COMMON_STYLES.MARGIN_LEFT]}>
                                Refund Policy
                            </Text>
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
            </ScrollView>
        </View>
    )
}

export default Drawer;