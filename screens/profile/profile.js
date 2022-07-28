import { useState } from 'react';
import { Image, Alert, SafeAreaView, View, Text, TouchableHighlight, Pressable, ScrollView } from 'react-native';
import { profileStyles } from './profileStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { onShare, copyToClipboard } from '../../common/functions/commonHelper';
import { APP_COLORS, ROUTES } from '../../constant/constant';
import UploadModal from '../../components/modals/uploadModal';


const Profile = ({navigation}) => {
    const [state, setState] = useState({
        profileImg: 'https://st.depositphotos.com/1770836/1372/i/600/depositphotos_13720433-stock-photo-young-indian-student.jpg',
        userName: 'Amit Singh',
        referralCode: '1dd3dgd',
        bankAccountStatus: 'Verifing',
        panCardStatus: 'Not Uploaded',
        studentDocStatus: 'Not Uploaded',
    });

    const [showBankUploadModal, setShowBankUploadModal] = useState(false);
    const [showPanUploadModal, setPanUploadModal] = useState(false);
    const [showStudentDoc, setStudentDocu] = useState(false);

    const sharingDataLink = 'Share this app link is here https://st.depositphotos.com/1770836/1372/i/600/depositphotos_13720433-stock-photo-young-indian-student.jpg';

    const handlePress =(actionType, payload) => {
        if(actionType === 'logout') {
            navigation.navigate(ROUTES.HOME)
        } else if(actionType === 'onReferralCodeCopy') {
            copyToClipboard(state.referralCode);
            Alert.alert(
                '',
                `Referral Code Copied!: ${state.referralCode}`,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } else if(actionType === 'onLinkCopy') {
            copyToClipboard(sharingDataLink);
            Alert.alert(
                '',
                "Sharing link Copied!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } else if(actionType === 'uploadBank') {
            console.log('uploading.... bank');
            setState(prev => {
                return { ...prev, bankImg: payload }
            });
            setShowBankUploadModal(false);
        } else if(actionType === 'uploadPan') {
            console.log('uploading.... pan');
            setState(prev => {
                return { ...prev, panImg: payload }
            });
            setPanUploadModal(false);
        } else if(actionType === 'uploadStudentDoc') {
            console.log('uploading.... student doc');
            setState(prev => {
                return { ...prev, studentDoc: payload }
            });
            setPanUploadModal(false);
        } else if(actionType === 'closeModal') {
            setShowBankUploadModal(false);
            setPanUploadModal(false);
            setStudentDocu(false);
        }
    }

    return (
        <SafeAreaView style={profileStyles.CONTAINER}>
            <UploadModal modalVisible={showBankUploadModal} actionType="uploadBank" handleModalPress={handlePress} title="Upload Bank Passbook/cheque/bank statement" btnTxt = 'Upload' info="Image should contain bank account number and name"/>

            <UploadModal modalVisible={showPanUploadModal} actionType="uploadPan" handleModalPress={handlePress} title="Upload Pan Card" btnTxt = 'Upload'/>

            <UploadModal modalVisible={showStudentDoc} actionType="uploadStudentDoc" handleModalPress={handlePress} title="Upload Student Document" btnTxt = 'Upload' info="Allowed types are current year student id card or fee slip or application form or details of institute/college/school"/>

            <View style={profileStyles.ROW_CENTER}>
                <Image style={profileStyles.PROFILE_IMG} source={{uri: state.profileImg}}></Image>
                <Text style={COMMON_STYLES.BODY_TITLE}>{state.userName}</Text>
                <TouchableHighlight style={[COMMON_STYLES.BTN_1, { width: '100%'}]}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>Edit Profile</Text>
                </TouchableHighlight>
            </View>

            <View style={profileStyles.ROW_CENTER}>
                <TouchableHighlight onPress={()=>onShare(sharingDataLink)} style={[COMMON_STYLES.BTN_1, { width: '100%'}]}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>Refer and get 1 free ticket</Text>
                </TouchableHighlight>

                <View style={[COMMON_STYLES.ROW, { marginVertical: 10 }]}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Referral Code: {state.referralCode}  </Text>
                    <Pressable  onPress={()=> handlePress('onReferralCodeCopy')} style={[COMMON_STYLES.SUB_BTN_2, { backgroundColor: APP_COLORS.light_grey}]}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Copy</Text>
                    </Pressable>
                    <Pressable onPress={()=> handlePress('onLinkCopy')} style={[COMMON_STYLES.SUB_BTN_2, { backgroundColor: APP_COLORS.light_grey, marginLeft: 5}]}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Copy Link</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView>
                <View style={profileStyles.BOX}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Bank Account</Text>
                    <TouchableHighlight onPress={()=> setShowBankUploadModal(!showBankUploadModal)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Upload</Text>
                    </TouchableHighlight>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{state.bankAccountStatus}</Text>
                </View>

                <View style={profileStyles.BOX}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Pan Card</Text>

                    <TouchableHighlight onPress={()=> setPanUploadModal(!showPanUploadModal)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Upload</Text>
                    </TouchableHighlight>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{state.panCardStatus}</Text>
                </View>

                <View style={profileStyles.BOX}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Student Document</Text>

                    <TouchableHighlight onPress={()=> setStudentDocu(!showStudentDoc)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Upload</Text>
                    </TouchableHighlight>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{state.studentDocStatus}</Text>
                </View>
            </ScrollView>

            <View>
                <TouchableHighlight onPress={() => handlePress('logout')} style={COMMON_STYLES.BTN_1}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>Logout</Text>
                </TouchableHighlight>         
            </View>
        </SafeAreaView>
    )
}

export default Profile;