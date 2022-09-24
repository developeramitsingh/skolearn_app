import { useEffect, useRef, useState } from 'react';
import { Image, Alert, SafeAreaView, View, Text, TouchableWithoutFeedback, Pressable, ScrollView, BackHandler } from 'react-native';
import { profileStyles } from './profileStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { onShare, copyToClipboard, pickImage, refreshUserInLocal } from '../../common/functions/commonHelper';
import { APP_COLORS, ROUTES, CLOSE_MODAL, ACTION_TYPES, SHARE_TEXT, STORAGE_KEYS } from '../../constant/constant';
import UploadModal from '../../components/modals/uploadModal';
import ModalWindow from '../../components/modals/modalWindow';
import ModalBankPanCard from '../../components/modals/modalBankPanCard';
import BackBtn from '../../components/backBtn/backBtn';
import { FontAwesome5 } from '@expo/vector-icons';
import { sendAppLogService, userService } from '../../services';
import { getFromStorage } from '../../utils/utils';

const Profile = ({navigation, route}) => {
    const [state, setState] = useState({
        profileImgThumbUrl: route?.params?.user?.profileImgThumbUrl,
        userName: route?.params?.user?.userName,
        referralCode: route?.params?.user?.referralCode,
        totalScholarship: route?.params?.user?.totalScholarship,
    });

    const [showBankUploadModal, setShowBankUploadModal] = useState(false);
    const [showPanUploadModal, setPanUploadModal] = useState(false);
    const [showStudentDoc, setStudentDocu] = useState(false);
    const [showProfileEdit, setProfileEdit] = useState(false);
    const [showBankDetailModal, setBankDetail] = useState(false);
    const [showPanDetailModal, setPanDetail] = useState(false);
    const backHandler = useRef();


    const getUser = async () => {
        const user = await getFromStorage(STORAGE_KEYS.USER);
        if(user) {
            setState((prev) => {
                return { ...prev, ...user};
            })
        }
    };
    useEffect(() => {
        getUser();
        const backAction = () => {
            navigation.navigate(ROUTES.DASHBOARD);
            return true;
          };
      
          backHandler.current = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.current?.remove();
    }, []);

    const updateUser = (data) => {
        userService.updateUser(data)
            .then((res) => {
                refreshUserInLocal(route?.params?.user?._id);
            })
            .catch(err => {
                const errMsg = `error while update user in profile:: err: ${err}`;
                sendAppLogService.sendAppLogs({ errMsg })
            });
    }

    const handlePress =(actionType, payload) => {
        if(actionType === 'onReferralCodeCopy') {
            copyToClipboard(state.referralCode);
            Alert.alert(
                '',
                `Referral Code Copied!: ${state.referralCode}`,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } else if(actionType === 'onLinkCopy') {
            copyToClipboard(SHARE_TEXT);
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
            console.log('updating student profile', payload);
            const data = { userName: payload };
            updateUser(data);
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

            if (profileUri) {
                console.info('image set!');
                console.info('calling API to update profile image...');
                const form = new FormData();
                form.append("imgFile", {
                    name: `ProfileImage_UserId:${route?.params?.user?._id}.jpeg`,
                    uri: profileUri,
                    type: "image/jpeg",
                });

                userService.uploadProfileImg(form)
                    .then((res) => {
                        refreshUserInLocal(route?.params?.user?._id);
                    })
                    .catch(err => {
                        console.error(`error while upload profile image`, err);
                        sendAppLogService.sendAppLogs({ errorMsg: `error while upload profile image: ${err}`})
                    });

                setState(prev=> {
                    return {...prev, profileImgThumbUrl: profileUri };
                });
            }
        } catch (err) {
            console.error(`error while setting up profile img: ${err}`);
        }
    }

    return (
        <SafeAreaView style={profileStyles.CONTAINER}>
            <BackBtn navigation={navigation} routeToGo={ROUTES.DASHBOARD}/>
            <ModalWindow modalVisible={showProfileEdit} actionType='updateProfile' handleModalPress={handlePress} title="Edit User Name" btnTxt = 'Update' placeholder='Enter your new user name'/>

            <UploadModal modalVisible={showBankUploadModal} actionType="uploadBank" handleModalPress={handlePress} title="Upload Bank Passbook/cheque/bank statement" btnTxt = 'Upload' info="Image should contain bank account number and name"/>

            <UploadModal modalVisible={showPanUploadModal} actionType="uploadPan" handleModalPress={handlePress} title="Upload Pan Card" btnTxt = 'Upload'/>

            <UploadModal modalVisible={showStudentDoc} actionType="uploadStudentDoc" handleModalPress={handlePress} title="Upload Student Document" btnTxt = 'Upload' info="Allowed types are current year student id card or fee slip or application form or details of institute/college/school"/>

            <ModalBankPanCard modalVisible={showBankDetailModal} actionType={ACTION_TYPES.UPDATE_BANK_DETAIL} handleModalPress={handlePress} title="Update Bank Account Details" btnTxt = 'Update' modalType={ACTION_TYPES.UPDATE_BANK_DETAIL}/>

            <ModalBankPanCard modalVisible={showPanDetailModal} actionType={ACTION_TYPES.UPDATE_PAN_DETAIL} handleModalPress={handlePress} title="Update Pan Card Details" btnTxt = 'Update' modalType={ACTION_TYPES.UPDATE_PAN_DETAIL}/>

                <View style={profileStyles.ROW_CENTER}>
                    <Pressable onPress={setPickedImage} style={profileStyles.PROFILE_IMG}>
                        {
                            state.profileImgThumbUrl 
                            ? <Image style={profileStyles.PROFILE_IMG} source={{ uri: state.profileImgThumbUrl }}></Image>
                            : <FontAwesome5 name="user-edit" size={60} color={APP_COLORS.lightGrey2} />
                        }
                    </Pressable>
                </View>

                <View elevation={2} style={profileStyles.SUB_CONT}>
                    <View style={profileStyles.ROW_CENTER}>
                        <Text style={profileStyles.HEADING}>Hi {state.userName}
                        </Text>
                        <Text style={COMMON_STYLES.BODY_TEXT}>Total Scholarship Achieved: {state.totalScholarship} </Text>
                    </View>
                    <View style={[profileStyles.ROW_CENTER, { marginTop: 10 }]}>
                        <Pressable elevation={2} onPress={()=> setProfileEdit(!showProfileEdit)} style={[COMMON_STYLES.SUB_BTN_1, { marginVertical: 10 }]}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT}>Edit User Name</Text>
                        </Pressable>
                    </View>
                    
                    <View style={profileStyles.ROW_CENTER}>
                        <Pressable elevation={2} onPress={()=>onShare(SHARE_TEXT)} style={[COMMON_STYLES.BTN_1, { width: '100%', backgroundColor: APP_COLORS.blueGreen }]}>
                            <Text style={COMMON_STYLES.BODY_TEXT_WHITE}>Refer and get 1 free ticket</Text>
                        </Pressable>

                        <View style={[COMMON_STYLES.ROW_COLUMN, profileStyles.REFER_BOX]}>
                            <Text style={profileStyles.HEADING}>Referral Code: <Text>
                                    {route?.params?.user?.referralCode}
                                </Text>
                            </Text>
                            <View style={[COMMON_STYLES.ROW, { marginVertical: 5 }]}>
                                <Pressable elevation={2}  onPress={()=> handlePress('onReferralCodeCopy')} style={[COMMON_STYLES.SUB_BTN_2, { backgroundColor: APP_COLORS.green }]}>
                                    <Text style={[COMMON_STYLES.SUB_BTN_TXT_2_W]}>Copy Code</Text>
                                </Pressable>
                                <Pressable elevation={2} onPress={()=> handlePress('onLinkCopy')} style={[COMMON_STYLES.SUB_BTN_2, { marginLeft: 5, backgroundColor: APP_COLORS.green}]}>
                                    <Text style={COMMON_STYLES.SUB_BTN_TXT_2_W}>Copy Referral Link</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <ScrollView>
                        <View style={profileStyles.BOX}>
                            <Text style={profileStyles.BODY_TEXT}>Bank</Text>

                            <Pressable elevation={2} onPress={()=> setBankDetail(!showBankDetailModal)} style={COMMON_STYLES.SUB_BTN_2}>
                                <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Update Detail</Text>
                            </Pressable>

                            <Pressable elevation={2} onPress={()=> setShowBankUploadModal(!showBankUploadModal)} style={COMMON_STYLES.SUB_BTN_2}>
                                <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Upload</Text>
                            </Pressable>
                        </View>

                        <View style={profileStyles.BOX}>
                            <Text style={profileStyles.BODY_TEXT}>Pancard</Text>

                            <Pressable elevation={2} onPress={()=> setPanDetail(!showPanDetailModal)} style={COMMON_STYLES.SUB_BTN_2}>
                                <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Update Detail</Text>
                            </Pressable>

                            <Pressable elevation={2} onPress={()=> setPanUploadModal(!showPanUploadModal)} style={COMMON_STYLES.SUB_BTN_2}>
                                <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Upload</Text>
                            </Pressable>
                        </View>

                        <View style={profileStyles.BOX}>
                            <Text style={profileStyles.BODY_TEXT}>Student Document</Text>

                            <Pressable elevation={2} onPress={()=> setStudentDocu(!showStudentDoc)} style={COMMON_STYLES.SUB_BTN_2}>
                                <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Upload</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
        </SafeAreaView>
    )
}

export default Profile;