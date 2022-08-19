import { useState } from 'react';
import { Image, Alert, SafeAreaView, View, Text, TouchableHighlight,TouchableWithoutFeedback, Pressable, ScrollView } from 'react-native';
import { profileStyles } from './profileStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { onShare, copyToClipboard, pickImage } from '../../common/functions/commonHelper';
import { APP_COLORS, ROUTES, CLOSE_MODAL, ACTION_TYPES } from '../../constant/constant';
import UploadModal from '../../components/modals/uploadModal';
import ModalWindow from '../../components/modals/modalWindow';
import ModalBankPanCard from '../../components/modals/modalBankPanCard';
import BackBtn from '../../components/backBtn/backBtn';

const Profile = ({navigation}) => {
    const [state, setState] = useState({
        profileImg: 'https://st.depositphotos.com/1770836/1372/i/600/depositphotos_13720433-stock-photo-young-indian-student.jpg',
        userName: 'Test User',
        referralCode: '1dd3dgd',
        bankAccountStatus: 'Verifing',
        panCardStatus: 'Not Uploaded',
        studentDocStatus: 'Not Uploaded',
        totalScholarship: '10000',
    });

    const [showBankUploadModal, setShowBankUploadModal] = useState(false);
    const [showPanUploadModal, setPanUploadModal] = useState(false);
    const [showStudentDoc, setStudentDocu] = useState(false);
    const [showProfileEdit, setProfileEdit] = useState(false);
    const [showBankDetailModal, setBankDetail] = useState(false);
    const [showPanDetailModal, setPanDetail] = useState(false);

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
        } else if(actionType === 'updateProfile') {
            console.log('updating student profile');
            setState(prev => {
                return { ...prev, userName: payload }
            });
            setProfileEdit(false);
        } else if(actionType === ACTION_TYPES.UPDATE_BANK_DETAIL) {
            console.log('updating bank details', payload);
            setState(prev => {
                return { ...prev, bankDetail: payload }
            });
            setBankDetail(false);
        } else if(actionType === ACTION_TYPES.UPDATE_PAN_DETAIL) {
            console.log('updating pan card details', payload);
            setState(prev => {
                return { ...prev, panDetail: payload }
            });
            setPanDetail(false);
        } else if(actionType === CLOSE_MODAL) {
            setShowBankUploadModal(false);
            setPanUploadModal(false);
            setStudentDocu(false);
            setProfileEdit(false);
            setBankDetail(false);
            setPanDetail(false);
        }
    }

    const setPickedImage = async () => {
        try {
            console.info('select image');
            let profileUri = await pickImage();
            setState(prev=> {
                return {...prev, profileImg: profileUri };
            });

            console.info('image set!');
            console.info('calling API to update profile image...');
        } catch (err) {
            console.error(`error while setting up profile img: ${err}`);
        }
    }

    return (
        <SafeAreaView style={profileStyles.CONTAINER}>
            <BackBtn navigation={navigation} routeToGo={ROUTES.DASHBOARD}/>
            <ModalWindow modalVisible={showProfileEdit} actionType='updateProfile' handleModalPress={handlePress} title="Edit User Name" btnTxt = 'Update' placeholder='Enter your user name'/>

            <UploadModal modalVisible={showBankUploadModal} actionType="uploadBank" handleModalPress={handlePress} title="Upload Bank Passbook/cheque/bank statement" btnTxt = 'Upload' info="Image should contain bank account number and name"/>

            <UploadModal modalVisible={showPanUploadModal} actionType="uploadPan" handleModalPress={handlePress} title="Upload Pan Card" btnTxt = 'Upload'/>

            <UploadModal modalVisible={showStudentDoc} actionType="uploadStudentDoc" handleModalPress={handlePress} title="Upload Student Document" btnTxt = 'Upload' info="Allowed types are current year student id card or fee slip or application form or details of institute/college/school"/>

            <ModalBankPanCard modalVisible={showBankDetailModal} actionType={ACTION_TYPES.UPDATE_BANK_DETAIL} handleModalPress={handlePress} title="Update Bank Account Details" btnTxt = 'Update' modalType={ACTION_TYPES.UPDATE_BANK_DETAIL}/>

            <ModalBankPanCard modalVisible={showPanDetailModal} actionType={ACTION_TYPES.UPDATE_PAN_DETAIL} handleModalPress={handlePress} title="Update Pan Card Details" btnTxt = 'Update' modalType={ACTION_TYPES.UPDATE_PAN_DETAIL}/>

            <View style={profileStyles.ROW_CENTER}>
                <TouchableWithoutFeedback onPress={setPickedImage}>
                    <Image style={profileStyles.PROFILE_IMG} source={{ uri: state.profileImg }}></Image>
                </TouchableWithoutFeedback>
                
                <Text style={COMMON_STYLES.BODY_TITLE}>{state.userName}</Text>

                <Text style={COMMON_STYLES.BODY_TEXT}>Total Scholarship Achieved: {state.totalScholarship}</Text>

                <TouchableHighlight onPress={()=> setProfileEdit(!showProfileEdit)} style={[COMMON_STYLES.SUB_BTN_1, { marginVertical: 10 }]}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>Edit Profile</Text>
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
                    <Text style={COMMON_STYLES.BODY_TITLE}>Bank</Text>

                    <TouchableHighlight onPress={()=> setBankDetail(!showBankDetailModal)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Update Detail</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={()=> setShowBankUploadModal(!showBankUploadModal)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Upload</Text>
                    </TouchableHighlight>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{state.bankAccountStatus}</Text>
                </View>

                <View style={profileStyles.BOX}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Pancard</Text>

                    <TouchableHighlight onPress={()=> setPanDetail(!showPanDetailModal)} style={COMMON_STYLES.SUB_BTN_2}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Update Detail</Text>
                    </TouchableHighlight>

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

            <View style={COMMON_STYLES.ROW_CENTER}>
                <TouchableHighlight onPress={() => handlePress('logout')} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>Logout</Text>
                </TouchableHighlight>         
            </View>
        </SafeAreaView>
    )
}

export default Profile;