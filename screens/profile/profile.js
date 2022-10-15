import { useEffect, useRef, useState } from 'react';
import { Image, Alert, SafeAreaView, View, Text, TouchableWithoutFeedback, Pressable, ScrollView, BackHandler } from 'react-native';
import { profileStyles } from './profileStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { onShare, copyToClipboard, pickImage, refreshUserInLocal, showAlert, setCurrentLanguage } from '../../common/functions/commonHelper';
import { APP_COLORS, ROUTES, CLOSE_MODAL, ACTION_TYPES, SHARE_TEXT, STORAGE_KEYS } from '../../constant/constant';
import UploadModal from '../../components/modals/uploadModal';
import ModalWindow from '../../components/modals/modalWindow';
import ModalBankPanCard from '../../components/modals/modalBankPanCard';
import BackBtn from '../../components/backBtn/backBtn';
import { FontAwesome5 } from '@expo/vector-icons';
import { sendAppLogService, userDocsService, userService } from '../../services';
import { getFromStorage } from '../../utils/utils';
import Loader from '../../components/loader/loader';
import { LANGUAGES_DATA } from '../../constant/language';

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
    const [userDocsStatus, setUserDocsStatus] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const backHandler = useRef();
    const [lang, setLang] = useState();


    const getUser = async () => {
        const user = await getFromStorage(STORAGE_KEYS.USER);
        if(user) {
            setState((prev) => {
                return { ...prev, ...user};
            })
        }
    };

    const getUserDocsStatus = async () => {
        try {
            setLoading(true);
            const userDocsData = await userDocsService.getUserDocs('{}', [])
            setLoading(false);
            if (userDocsData?.data) {
                setUserDocsStatus(userDocsData?.data);
            }
        } catch (err) {
            const errMsg = `error in getUserDocsStatus, ${err}`;
            console.error(errMsg);
            sendAppLogService.sendAppLogs({ errMsg });
        }
    }

    useEffect(() => {
        setCurrentLanguage(setLang);
        getUser();
        getUserDocsStatus();

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

    const updateUser = async (data) => {
        try {
            await userService.updateUser(data)
            refreshUserInLocal(route?.params?.user?._id);

            return true;
        } catch (err) {
            const errMsg = `error while update user in profile:: err: ${err}`;
            console.error(errMsg);
            sendAppLogService.sendAppLogs({ errMsg })
            return false;
        }    
    }

    const updateUserDocs = async (data) => {
        try {
            await userDocsService.createOrUpdateUserDocs(data);

            return true;
        } catch (err) {
            console.error(`error in updateUserDocs:: ${err}`);

            return false;
        }
    }

    const uploadUserDocs = async (fileKey, uri, params) => {
        try {
            const form = new FormData();
            form.append(fileKey, {
                name: `${fileKey}_UserId:${route?.params?.user?._id}.jpeg`,
                uri: uri,
                type: "image/jpeg",
            });

            if (params) {
                for (const key in params) {
                    form.append(key, params[key]);
                }
            }
            console.info({ form });

            await userDocsService.uploadUserDocs(form);

            return true;
        }  catch (err) {
            console.error(`error while uploadUserDocs:: fileKey:${fileKey}::${err}`);
            sendAppLogService.sendAppLogs({ errorMsg: `error while uploadUserDocs::fileKey:${fileKey}:: ${err}`});
            return false;
        }
    }

    const handlePress = async (actionType, payload) => {
        if(actionType === 'onReferralCodeCopy') {
            copyToClipboard(state.referralCode);
            
            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, `${LANGUAGES_DATA[lang]?.PROFILE?.REFERRAL_CODE_COPIED}: ${state.referralCode}`);
        } else if(actionType === 'onLinkCopy') {
            copyToClipboard(SHARE_TEXT(state?.referralCode));

            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.SHARING_LINK_COPIED);
        } else if(actionType === ACTION_TYPES.UPLOAD_BANK_ID) {
            console.log('uploading.... bank');
            
            const isSuccess = await uploadUserDocs('bankImg', payload, {
                'bankStatus': 'PENDING_VERIFICATION', 
                'isBankVerified': false 
            });

            if (!isSuccess) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT?.ERROR, LANGUAGES_DATA[lang]?.PROFILE?.ERROR_COMMON?.ERROR_UPLOAD);
                return;
            }

            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.SUCCESS_COMMON?.SUCCESS_BANK);

            setState(prev => {
                return { ...prev, bankImg: true }
            });
            setShowBankUploadModal(false);
            getUserDocsStatus();
        } else if(actionType === ACTION_TYPES.UPLOAD_PAN) {
            console.log('uploading.... pan');
            const isSuccess = await uploadUserDocs('panImg', payload, { 
                'panStatus': 'PENDING_VERIFICATION',
                'isPanVerified': false 
            });
            if (!isSuccess) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT?.ERROR, LANGUAGES_DATA[lang]?.PROFILE?.ERROR_COMMON?.ERROR_UPLOAD);
                return;
            }

            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.SUCCESS_COMMON?.SUCCESS_PAN);

            setState(prev => {
                return { ...prev, panImg: true }
            });
            setPanUploadModal(false);
            getUserDocsStatus();
        } else if(actionType === ACTION_TYPES.UPLOAD_STUDENT_ID) {
            console.log('uploading.... student doc');
            const isSuccess = await uploadUserDocs('studentIdImg', payload, { 
                'studentIdStatus': 'PENDING_VERIFICATION', 
                'isStudentIdVerified': false 
            });
            if (!isSuccess) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT?.ERROR, LANGUAGES_DATA[lang]?.PROFILE?.ERROR_COMMON?.ERROR_UPLOAD);
                return;
            }

            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.SUCCESS_COMMON?.SUCCESS_ID);

            setState(prev => {
                return { ...prev, studentIdImg: true }
            });
            setStudentDocu(false);
            getUserDocsStatus();
        } else if(actionType === ACTION_TYPES.UPDATE_PROFILE) {
            console.log('updating student profile', payload);
            const data = { userName: payload };
            const isSuccess = await updateUser(data);

            if(!isSuccess) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT?.ERROR, LANGUAGES_DATA[lang]?.PROFILE?.ERROR_COMMON?.ERROR);

                return
            }

            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.SUCCESS_COMMON?.SUCCESS_PROFILE);
            setState(prev => {
                return { ...prev, userName: payload }
            });
            setProfileEdit(false);
        } else if(actionType === ACTION_TYPES.UPDATE_BANK_DETAIL) {
            console.log('updating bank details', payload);
            const isSuccess = await updateUserDocs({ ...payload, isBankVerified: false, bankStatus: 'PENDING_VERIFICATION' });

            if (!isSuccess) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.ERROR_COMMON?.ERROR_BANK_DETAILS);

                return;
            }

            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.SUCCESS_COMMON?.SUCCESS_BANK_DETAILS);

            setState(prev => {
                return { ...prev, ...payload }
            });
            setBankDetail(false);
            getUserDocsStatus();
        } else if(actionType === ACTION_TYPES.UPDATE_PAN_DETAIL) {
            console.log('updating pan card details', payload);
            const isSuccess = await updateUserDocs({ ...payload, isPanVerified: false, panStatus: 'PENDING_VERIFICATION' });

            if (!isSuccess) {
                showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.ERROR_COMMON?.ERROR_PAN_DETAILS);

                return;
            }


            showAlert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.PROFILE?.SUCCESS_COMMON?.SUCCESS_PAN_DETAILS);

            setState(prev => {
                return { ...prev, panDetail: payload }
            });
            setPanDetail(false);
            getUserDocsStatus();
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
            { 
                !route?.params?.isBackButtonHide 
                    ? <BackBtn navigation={navigation} routeToGo={ROUTES.DASHBOARD}/>
                    : null
            }
            
            <ModalWindow modalVisible={showProfileEdit} actionType='updateProfile' handleModalPress={handlePress} title={LANGUAGES_DATA[lang]?.PROFILE?.EDIT_PROFILE} btnTxt = {LANGUAGES_DATA[lang]?.PROFILE?.
            UPDATE} placeholder={LANGUAGES_DATA[lang]?.PROFILE?.EDIT_PROFILE_INPUT} closeTxt={LANGUAGES_DATA[lang]?.PROFILE?.CLOSE}/>

            <UploadModal data={userDocsStatus?.bankIdImgUrl} modalVisible={showBankUploadModal} actionType={ACTION_TYPES.UPLOAD_BANK_ID} handleModalPress={handlePress} btnTxt = {LANGUAGES_DATA[lang]?.PROFILE?.
            UPLOAD} info={LANGUAGES_DATA[lang]?.PROFILE?.BANK_UPLOAD_MODAL?.NOTICE} title={LANGUAGES_DATA[lang]?.PROFILE?.BANK_UPLOAD_MODAL?.HEADING} closeTxt={LANGUAGES_DATA[lang]?.PROFILE?.CLOSE} choosePhotoTxt={LANGUAGES_DATA[lang]?.PROFILE?.CHOOSE_PHOTO}/>

            <UploadModal data={userDocsStatus?.panImgUrl} modalVisible={showPanUploadModal} actionType={ACTION_TYPES.UPLOAD_PAN} handleModalPress={handlePress} btnTxt = {LANGUAGES_DATA[lang]?.PROFILE?.
            UPLOAD} title={LANGUAGES_DATA[lang]?.PROFILE?.PAN_UPLOAD_MODAL?.HEADING} closeTxt={LANGUAGES_DATA[lang]?.PROFILE?.CLOSE} choosePhotoTxt={LANGUAGES_DATA[lang]?.PROFILE?.CHOOSE_PHOTO}/>

            <UploadModal data={userDocsStatus?.studentIdImgUrl} modalVisible={showStudentDoc} actionType={ACTION_TYPES.UPLOAD_STUDENT_ID} handleModalPress={handlePress} btnTxt = {LANGUAGES_DATA[lang]?.PROFILE?.
            UPLOAD} title={LANGUAGES_DATA[lang]?.PROFILE?.STUDENT_DOC_MODAL?.HEADING} closeTxt={LANGUAGES_DATA[lang]?.PROFILE?.CLOSE} choosePhotoTxt={LANGUAGES_DATA[lang]?.PROFILE?.CHOOSE_PHOTO} info={LANGUAGES_DATA[lang]?.PROFILE?.STUDENT_DOC_MODAL?.NOTICE}/>

            <ModalBankPanCard data={userDocsStatus} modalVisible={showBankDetailModal} actionType={ACTION_TYPES.UPDATE_BANK_DETAIL} handleModalPress={handlePress} modalType={ACTION_TYPES.UPDATE_BANK_DETAIL} btnTxt = {LANGUAGES_DATA[lang]?.PROFILE?.
            UPDATE} title={LANGUAGES_DATA[lang]?.PROFILE?.BANK_MODAL?.HEADING} closeTxt={LANGUAGES_DATA[lang]?.PROFILE?.CLOSE} placeholderTxts={LANGUAGES_DATA[lang]?.PROFILE?.BANK_MODAL} errorTxts ={LANGUAGES_DATA[lang]?.PROFILE?.BANK_MODAL?.ERROR_TXTS}/>

            <ModalBankPanCard data={userDocsStatus} modalVisible={showPanDetailModal} actionType={ACTION_TYPES.UPDATE_PAN_DETAIL} handleModalPress={handlePress} modalType={ACTION_TYPES.UPDATE_PAN_DETAIL} btnTxt = {LANGUAGES_DATA[lang]?.PROFILE?.
            UPDATE} title={LANGUAGES_DATA[lang]?.PROFILE?.BANK_MODAL?.HEADING} closeTxt={LANGUAGES_DATA[lang]?.PROFILE?.CLOSE} placeholderTxts={LANGUAGES_DATA[lang]?.PROFILE?.PAN_MODAL} errorTxts ={LANGUAGES_DATA[lang]?.PROFILE?.PAN_MODAL?.ERROR_TXTS}/>

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
                    <Text style={profileStyles.HEADING}>{LANGUAGES_DATA[lang]?.PROFILE?.WELCOME_TXT} {state.userName}
                    </Text>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{LANGUAGES_DATA[lang]?.PROFILE?.TOTAL_ACHIEVED}: {state.totalScholarship} </Text>
                </View>
                <View style={[profileStyles.ROW_CENTER, { marginTop: 10 }]}>
                    <Pressable elevation={2} onPress={()=> setProfileEdit(!showProfileEdit)} style={[COMMON_STYLES.SUB_BTN_1, { marginVertical: 10 }]}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT}>{LANGUAGES_DATA[lang]?.PROFILE?.EDIT_PROFILE}</Text>
                    </Pressable>
                </View>
                
                <View style={profileStyles.ROW_CENTER}>
                    {/* <Pressable elevation={2} onPress={()=>onShare(SHARE_TEXT)} style={[COMMON_STYLES.BTN_1, { width: '100%', backgroundColor: APP_COLORS.blueGreen }]}>
                        <Text style={[COMMON_STYLES.SUB_BTN_TXT, { color: 'white', fontWeight: 'bold'}]}>{LANGUAGES_DATA[lang]?.PROFILE?.REFER_TXT}</Text>
                    </Pressable> */}

                    <Pressable onPress={()=>onShare(SHARE_TEXT(state?.referralCode))} style={{  marginVertical: 10, width: 300, overflow: 'hidden', borderWidth: 0.5, borderColor: APP_COLORS.light_grey, borderRadius: 5 }}>
                        <Image source={{ uri: 'https://ik.imagekit.io/nwxotnqhh/referralImg_NCrTW_FPM.jpeg'}} style={{height: 42, width: '100%', borderRadius: 10 }}/>
                    </Pressable>

                    <View style={[COMMON_STYLES.ROW_COLUMN, profileStyles.REFER_BOX]}>
                        <Text style={profileStyles.HEADING}>{LANGUAGES_DATA[lang]?.PROFILE?.REFERRAL_CODE}: <Text>
                                {route?.params?.user?.referralCode}
                            </Text>
                        </Text>
                        <View style={[COMMON_STYLES.ROW, { marginVertical: 5 }]}>
                            <Pressable elevation={2}  onPress={()=> handlePress('onReferralCodeCopy')} style={[COMMON_STYLES.SUB_BTN_2, { backgroundColor: APP_COLORS.blueGreen }]}>
                                <Text style={[COMMON_STYLES.SUB_BTN_TXT_2_W]}>{LANGUAGES_DATA[lang]?.PROFILE?.COPY_CODE}</Text>
                            </Pressable>
                            <Pressable elevation={2} onPress={()=> handlePress('onLinkCopy')} style={[COMMON_STYLES.SUB_BTN_2, { marginLeft: 5, backgroundColor: APP_COLORS.blueGreen}]}>
                                <Text style={COMMON_STYLES.SUB_BTN_TXT_2_W}>{LANGUAGES_DATA[lang]?.PROFILE?.COPY_REFERRAL_LINK}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    {
                        <Loader isLoading={isLoading}/>
                    }
                    <View style={profileStyles.BOX}>
                        <Text style={profileStyles.BODY_TEXT}>{LANGUAGES_DATA[lang]?.PROFILE?.BANK}</Text>

                        <Pressable elevation={1} onPress={()=> setBankDetail(!showBankDetailModal)} style={COMMON_STYLES.SUB_BTN_2}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>{LANGUAGES_DATA[lang]?.PROFILE?.UPDATE_DETAIL}</Text>
                        </Pressable>

                        <Pressable elevation={1} onPress={()=> setShowBankUploadModal(!showBankUploadModal)} style={COMMON_STYLES.SUB_BTN_2}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>{LANGUAGES_DATA[lang]?.PROFILE?.UPLOAD}</Text>
                        </Pressable>
                        <Text style={profileStyles.BODY_TEXT}>{LANGUAGES_DATA[lang]?.PROFILE?.STATUS[userDocsStatus?.bankStatus] || LANGUAGES_DATA[lang]?.PROFILE?.STATUS?.NOT_SUBMITTED}</Text>
                    </View>

                    <View style={profileStyles.BOX}>
                        <Text style={profileStyles.BODY_TEXT}>{LANGUAGES_DATA[lang]?.PROFILE?.PANCARD}</Text>

                        <Pressable elevation={1} onPress={()=> setPanDetail(!showPanDetailModal)} style={COMMON_STYLES.SUB_BTN_2}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>{LANGUAGES_DATA[lang]?.PROFILE?.UPDATE_DETAIL}</Text>
                        </Pressable>

                        <Pressable elevation={1} onPress={()=> setPanUploadModal(!showPanUploadModal)} style={COMMON_STYLES.SUB_BTN_2}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>{LANGUAGES_DATA[lang]?.PROFILE?.UPLOAD}</Text>
                        </Pressable>
                        <Text style={profileStyles.BODY_TEXT}>{LANGUAGES_DATA[lang]?.PROFILE?.STATUS[userDocsStatus?.panStatus] || LANGUAGES_DATA[lang]?.PROFILE?.STATUS?.NOT_SUBMITTED}</Text>
                    </View>

                    <View style={profileStyles.BOX}>
                        <Text style={profileStyles.BODY_TEXT}>{LANGUAGES_DATA[lang]?.PROFILE?.STUDENT_DOC}</Text>

                        <Pressable elevation={1} onPress={()=> setStudentDocu(!showStudentDoc)} style={COMMON_STYLES.SUB_BTN_2}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>{LANGUAGES_DATA[lang]?.PROFILE?.UPLOAD}</Text>
                        </Pressable>
                        <Text style={profileStyles.BODY_TEXT}>{LANGUAGES_DATA[lang]?.PROFILE?.STATUS[userDocsStatus?.studentIdStatus] || LANGUAGES_DATA[lang]?.PROFILE?.STATUS?.NOT_SUBMITTED}</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Profile;