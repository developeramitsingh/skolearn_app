import { View, Text, Image, Pressable, SafeAreaView, TextInput, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import { registerStyles } from './registerStyles';
import { useState, useEffect } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, BACKEND_URL } from '../../constant/constant';
import { Checkbox } from 'react-native-paper';
import * as Constant from  '../../constant/constant';
import { userService, rolesService } from '../../services/index';
import { saveToStorage } from '../../utils/utils';
import Loader from '../../components/loader/loader';
import { checkAndGetIfErrorFound, checkValidEmail, setCurrentLanguage } from '../../common/functions/commonHelper';
import DropDownPicker from 'react-native-dropdown-picker'
import { LANGUAGES_DATA } from '../../constant/language';

const Register = ({navigation}) => {
    const [state, setState] = useState({
        register: false,
        userName: null,
        mobile: null,
        email: null,
        day: null,
        month: null,
        year: null,
        term: false,
        referralCode: null,
        errors: {
            userName: LANGUAGES_DATA[Constant.LANGUAGES.ENGLISH]?.REGISTER?.ERRORS.userName,
            email: LANGUAGES_DATA[Constant.LANGUAGES.ENGLISH]?.REGISTER?.ERRORS.email,
            term: LANGUAGES_DATA[Constant.LANGUAGES.ENGLISH]?.REGISTER?.ERRORS.term,
            mobile: LANGUAGES_DATA[Constant.LANGUAGES.ENGLISH]?.REGISTER?.ERRORS.mobile,
            day: LANGUAGES_DATA[Constant.LANGUAGES.ENGLISH]?.REGISTER?.ERRORS.dob,
            month: LANGUAGES_DATA[Constant.LANGUAGES.ENGLISH]?.REGISTER?.ERRORS.month,
            year: LANGUAGES_DATA[Constant.LANGUAGES.ENGLISH]?.REGISTER?.ERRORS.year,
            referralCode: null,
        },
        error: '',
        disabled: true,
        isLoading: false,
    });

    const [dayOpen, setDayOpen] = useState(false);
    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [roleIdVal, setRoleId] = useState(null);
    const [lang, setLang] = useState();


    const getRoleId = async () => {
        let roleId;

        const roles = await rolesService.getRolesByQuery('{  "roleKey" : "UA" }', '["_id"]');

        console.info({roles});

        if (roles?.data) {
            roleId = roles.data[0]["_id"]
            setRoleId(roleId);
        }

        return roleId;
    }

    const setErrorsForInit = async () => {
        const langD = await setCurrentLanguage(setLang);
        setState(prev => {
            return {
                ...prev,
                errors: {
                    ...prev.errors,
                    userName: LANGUAGES_DATA[langD]?.REGISTER?.ERRORS.userName,
                    email: LANGUAGES_DATA[langD]?.REGISTER?.ERRORS.email,
                    term: LANGUAGES_DATA[langD]?.REGISTER?.ERRORS.term,
                    mobile: LANGUAGES_DATA[langD]?.REGISTER?.ERRORS.mobile,
                    day: LANGUAGES_DATA[langD]?.REGISTER?.ERRORS.day,
                    month: LANGUAGES_DATA[langD]?.REGISTER?.ERRORS.month,
                    year: LANGUAGES_DATA[langD]?.REGISTER?.ERRORS.year,
                }
            }
        })
    }

    useEffect(() => {
        setErrorsForInit();
        getRoleId();
        
    }, [])

    const handlePress = async (btnType)=> {
        // disable login button
        setState((prev) => { return {...prev, disabled: true, isLoading: true }});
        try {
            const roleId = roleIdVal;
            if (!roleId) {
                roleId = await getRoleId();
            }

            const requestBody = {
                userName: state.userName,
                mobile: state.mobile,
                email: state.email,
                ...(state.referralCode && { referralCode: state.referralCode }),
                dob: `${state.day}/${state.month}/${state.year}`,
                roleId
            };

            console.info({requestBody});
            const data = await userService.createUser(requestBody);
            // enable login button
            setState((prev) => { return {...prev, disabled: false, error: '', isLoading: false }});
            console.info({data: data.data.otpToken });

            //save the otp token to storage
            saveToStorage(Constant.STORAGE_KEYS.OTP_TOKEN, data?.data?.otpToken);

            //navigate to verity otp page
            navigation.navigate(Constant.ROUTES.VERIFY_OTP, { requestType: 'register' });
        } catch (err) {
            
            let msg = err?.response?.data?.message;
            console.error(`error while register`, msg);

            if (msg == 'Referral code is not valid!') {
                msg = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.REFERRAL_VALID;
            } else if (msg == 'User already registered!') {
                msg = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.USER_ALREADY_EXIST;
            } else if (msg == 'Email already registered!') {
                msg = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.EMAIL_ALREADY_EXIST;
            }

            setState((prev) => { 
                    return {...prev, error: msg, disabled: false, isLoading: false  }
                }
            );
        }
    }

    const handleChange = (val, inputName) => {
        console.info(state.errors);
        console.info(`handle changed called`);
        const errors = { ...(state.errors && state.errors) };

        if (inputName === 'userName') {
            if (val?.length >= 3) {
                errors[inputName] = ''
            } else {
                console.info('else part', inputName, LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.[inputName])
                errors[inputName] = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.[inputName];
            }
        } else if (inputName === 'mobile') {
            if (val?.length === 10) {
                errors[inputName] = ''
            } else {
                errors[inputName] = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.[inputName];
            }
        } else if (inputName === 'email') {
            if (val?.length && checkValidEmail(val)) {
                errors[inputName] = ''
            } else {
                errors[inputName] = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.[inputName];
            }
        } else if (inputName === 'term') {
            val = !val;
            if (val) {
                errors[inputName] = ''
            } else {
                errors[inputName] = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.[inputName];
            }
        } else if (inputName === 'day' || inputName === 'month' || inputName === 'year') {
            val = val();
            setMonthOpen(false);
            setDayOpen(false);
            setYearOpen(false);
            if (val) {
                errors[inputName] = '';
            } else {
                errors[inputName] = LANGUAGES_DATA[lang]?.REGISTER?.ERRORS?.[inputName];
            }
        }
 
        console.info({inputName, val, errors });
        const {isErrorFound, errorMsg} = checkAndGetIfErrorFound(errors) || {};
        console.info({ isErrorFound, errorMsg });

        setState((prev) => { 
            return {...prev, [inputName]: val, disabled: isErrorFound, errors: {...prev.errors, ...errors}, error: errorMsg }
        });
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={registerStyles.container} enabled>
      <SafeAreaView style={registerStyles.container}>
        <Loader isLoading={state.isLoading}/>
        <Image style ={registerStyles.logo} source={{ uri: Constant.ASSEST_URLS.LOGO }}/>
        <Text style={[COMMON_STYLES.TITLE_TEXT, { marginTop: 15 }]}>
            {LANGUAGES_DATA[lang]?.REGISTER?.HEADING}
        </Text>

        <View style={registerStyles.registerContainter}>
            <TextInput style={COMMON_STYLES.TEXT_INPUT} placeholder= {LANGUAGES_DATA[lang]?.REGISTER?.PLACEHOLDERS?.NAME} onChangeText={(val) => handleChange(val, 'userName')} value={state.userName}/>

            <TextInput maxLength={10} style={COMMON_STYLES.TEXT_INPUT} placeholder={LANGUAGES_DATA[lang]?.REGISTER?.PLACEHOLDERS?.MOBILE} keyboardType="numeric" onChangeText= {(val) => handleChange(val, 'mobile')} value={state.mobile}/>

            <TextInput style={COMMON_STYLES.TEXT_INPUT} placeholder={LANGUAGES_DATA[lang]?.REGISTER?.PLACEHOLDERS?.EMAIL} onChangeText={(val) => handleChange(val, 'email')} value={state.email}/>

            <View style={COMMON_STYLES.ROW}>
                <DropDownPicker
                    items={Constant.DOB.DAYS?.map(day => {
                        return { label: day, value: day }
                    })}
                    open={dayOpen}
                    setOpen={() => setDayOpen(!dayOpen)}
                    value={state.day}
                    setValue= {(val) => handleChange(val, 'day') }
                    defaultIndex={0}
                    containerStyle={COMMON_STYLES.DROPDOWN}
                    style={COMMON_STYLES.DROPDOWN}
                    textStyle={{
                      fontSize: 10                    
                    }}
                    placeholder={LANGUAGES_DATA[lang]?.REGISTER?.PLACEHOLDERS?.DAY}
                    placeholderStyle={{
                      color: "grey",
                      fontSize: 10,
                    }}
                    dropDownContainerStyle={COMMON_STYLES.DROPDOWN_BOX}
                  />
                  <DropDownPicker
                    items={Constant.DOB.MONTHS}
                    open={monthOpen}
                    setOpen={() => setMonthOpen(!monthOpen)}
                    value={state.month}
                    setValue= {(val) => handleChange(val, 'month') }
                    defaultIndex={0}
                    containerStyle={COMMON_STYLES.DROPDOWN}
                    style={COMMON_STYLES.DROPDOWN}
                    textStyle={{
                      fontSize: 10
                    }}
                    placeholder={LANGUAGES_DATA[lang]?.REGISTER?.PLACEHOLDERS?.MONTH}
                    placeholderStyle={{
                      color: "grey",
                      fontSize: 10,
                    }}
                    dropDownContainerStyle={COMMON_STYLES.DROPDOWN_BOX}
                  />
                  <DropDownPicker
                    items={Constant.DOB.YEARS()?.map(year => {
                        return { label: year, value: year }
                    })}
                    open={yearOpen}
                    setOpen={() => setYearOpen(!yearOpen)}
                    value={state.year}
                    setValue= {(val) => handleChange(val, 'year') }
                    defaultIndex={0}
                    containerStyle={[COMMON_STYLES.DROPDOWN, { width: 100 }]}
                    style={[COMMON_STYLES.DROPDOWN, { width: 100 }]}
                    dropDownContainerStyle={COMMON_STYLES.DROPDOWN_BOX}
                    textStyle={{
                      fontSize: 10,
                    }}
                    lableStyle
                    placeholder={LANGUAGES_DATA[lang]?.REGISTER?.PLACEHOLDERS?.YEAR}
                    placeholderStyle={{
                      color: "grey",
                      fontSize: 10,
                    }}
                    listMode="SCROLLVIEW"
                  />
            </View>
            
            <TextInput style={{ ...COMMON_STYLES.TEXT_INPUT, backgroundColor: APP_COLORS.light_grey }} placeholder={LANGUAGES_DATA[lang]?.REGISTER?.PLACEHOLDERS?.REFERRAL_CODE} onChangeText={(val) => handleChange(val, 'referralCode')} value={state.referralCode}/>

            <View style= {{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                    status={state.term ? 'checked' : 'unchecked'}
                    onPress={() => {
                       handleChange(state.term, 'term');
                    }}
                    color={APP_COLORS.green}
                    uncheckedColor={APP_COLORS.white}
                />

                <Text style={COMMON_STYLES.BODY_TEXT_WHITE}>{LANGUAGES_DATA[lang]?.REGISTER?.TERMS_TXT} <Text style={COMMON_STYLES.LINK_TEXT} onPress={()=>Linking.openURL(`${BACKEND_URL}/terms`)}> {LANGUAGES_DATA[lang]?.REGISTER?.TERMS_LINK}</Text></Text>
            </View>
            

            <Pressable elevation={3} disabled={ state.disabled } onPress= {handlePress} style={[COMMON_STYLES.BTN_1, state.disabled && COMMON_STYLES.DISABLED_BTN]}>
                <Text style={[COMMON_STYLES.BTN_TEXT, state.disabled && COMMON_STYLES.DISABLED_TEXT]}>{LANGUAGES_DATA[lang]?.REGISTER?.BTN_TXT}</Text>
            </Pressable>

            <Text style={[COMMON_STYLES.ERROR_TXT]}>{state.error}</Text>
        </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
  )
}

export default Register;