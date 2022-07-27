import { useState } from 'react';
import { Image, Alert, SafeAreaView, View, Text, TouchableHighlight, Pressable } from 'react-native';
import { profileStyles } from './profileStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {AntDesign, Entypo } from '@expo/vector-icons';
import { APP_COLORS, ROUTES } from '../../constant/constant';

const Profile = ({navigation}) => {
    const [state, setState] = useState({
        profileImg: '',
        userName: 'Amit Singh',
        referralCode: '1dd3dgd',
        isBankAccountApproved: true,
        isPanCardApproved: false,
    });

    const handlePress =(actionType) => {
        if(actionType === 'logout') {
            navigation.navigate(ROUTES.HOME)
        } else if(actionType === 'onCopy') {
            Alert.alert(
                '',
                "Referral Code Copied!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
    }
    return (
        <SafeAreaView style={profileStyles.CONTAINER}>
            <View style={profileStyles.ROW_CENTER}>
                <Image style={profileStyles.PROFILE_IMG} source={state.profileImg}></Image>
                <Text style={COMMON_STYLES.BODY_TITLE}>{state.userName}</Text>
                <TouchableHighlight style={[COMMON_STYLES.BTN_1, { width: '100%'}]}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>Edit Profile</Text>
                </TouchableHighlight>
            </View>

            <View style={profileStyles.ROW_CENTER}>
                <TouchableHighlight style={[COMMON_STYLES.BTN_1, { width: '100%'}]}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>Refer and get 1 free ticket</Text>
                </TouchableHighlight>

                <View style={profileStyles.BOX}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Referral Code: {state.referralCode}  </Text>
                    <Pressable onPress={()=> handlePress('onCopy')} style={[COMMON_STYLES.SUB_BTN_2, { backgroundColor: APP_COLORS.light_grey}]}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Copy</Text>
                    </Pressable>
                </View>
            </View>

            <View>
                <View style={profileStyles.BOX}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Bank Account</Text>
                    {
                        state.isBankAccountApproved 
                            ? <AntDesign name="checksquare" size={26} color="green"/>
                            : <AntDesign name="squared-cross" size={26} color="red"/>
                    }
                </View>

                <View style={profileStyles.BOX}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Pan Card</Text>
                    {
                        state.isPanCardApproved 
                            ? <AntDesign name="checksquare" size={26} color="green"/>
                            : <Entypo name="squared-cross" size={26} color="red"/>
                    }
                </View>
            </View>

            <View>
                <TouchableHighlight onPress={() => handlePress('logout')} style={COMMON_STYLES.BTN_1}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>Logout</Text>
                </TouchableHighlight>         
            </View>
        </SafeAreaView>
    )
}

export default Profile;