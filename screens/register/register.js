import { View, Text, Image, Pressable, SafeAreaView, TextInput, Linking } from 'react-native';
import { registerStyles } from './registerStyles';
import { useState, useEffect } from 'react';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, BACKEND_URL } from '../../constant/constant';
import { Checkbox } from 'react-native-paper';
import * as Constant from  '../../constant/constant';
import { userService, rolesService } from '../../services/index';
import { saveToStorage } from '../../utils/utils';
import Loader from '../../components/loader/loader';
import { checkAndGetIfErrorFound, checkValidEmail } from '../../common/functions/commonHelper';
import DropDownPicker from 'react-native-dropdown-picker'

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
            userName: 'User name is required',
            mobile: 'Mobile is required',
            email: 'Email is required',
            day: 'Day is required',
            month: 'Month is required',
            year: 'Year is required',
            term: 'Please accept terms and conditions',
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

    useEffect(() => {
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
            console.error(`error while register`, err);
            const msg = err?.response?.data?.message;
            setState((prev) => { return {...prev, error: msg, disabled: false, isLoading: false  }});
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
                errors[inputName] = 'User name is required'
            }
        } else if (inputName === 'mobile') {
            if (val?.length === 10) {
                errors[inputName] = ''
            } else {
                errors[inputName] = 'Mobile is required'
            }
        } else if (inputName === 'email') {
            if (val?.length && checkValidEmail(val)) {
                errors[inputName] = ''
            } else {
                errors[inputName] = 'Valid Email is required'
            }
        } else if (inputName === 'term') {
            val = !val;
            if (val) {
                errors[inputName] = ''
            } else {
                errors[inputName] = 'Please accept terms and conditions'
            }
        } else if (inputName === 'day' || inputName === 'month' || inputName === 'year') {
            val = val();
            setMonthOpen(false);
            setDayOpen(false);
            setYearOpen(false);
            if (val) {
                errors[inputName] = '';

            } else {
                errors[inputName] = 'Date of Birth is required';
            }
        }
 
        console.info({inputName, val});
        const {isErrorFound, errorMsg} = checkAndGetIfErrorFound(errors) || {};
        console.info({ isErrorFound, errorMsg });

        setState((prev) => { 
            return {...prev, [inputName]: val, disabled: isErrorFound, errors, error: errorMsg }
        });
    }

  return (
      <SafeAreaView style={registerStyles.container}>
        <Loader isLoading={state.isLoading}/>
        <Image style ={registerStyles.logo} source={{ uri: Constant.ASSEST_URLS.LOGO }}/>
        <Text style={[COMMON_STYLES.TITLE_TEXT, { marginTop: 15 }]}>
                Register
        </Text>

        <View style={registerStyles.registerContainter}>
            <TextInput style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Name" onChangeText={(val) => handleChange(val, 'userName')} value={state.userName}/>

            <TextInput maxLength={10} style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Mobile" keyboardType="numeric" onChangeText= {(val) => handleChange(val, 'mobile')} value={state.mobile}/>

            <TextInput style={COMMON_STYLES.TEXT_INPUT} placeholder="Type here Email" onChangeText={(val) => handleChange(val, 'email')} value={state.email}/>

            <View style={COMMON_STYLES.ROW}>
                <DropDownPicker
                    items={[
                          {label: '1', value: '1'},
                          {label: '2', value: '2'},
                          {label: '3', value: '3'},
                    ]}
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
                    placeholder="Day"
                    placeholderStyle={{
                      color: "grey",
                      fontSize: 10,
                    }}
                    dropDownContainerStyle={COMMON_STYLES.DROPDOWN_BOX}
                  />
                  <DropDownPicker
                    items={[
                          {label: 'Jan', value: '1'},
                          {label: 'Feb', value: '2'},
                          {label: 'Mar', value: '3'},
                    ]}
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
                    placeholder="Month"
                    placeholderStyle={{
                      color: "grey",
                      fontSize: 10,
                    }}
                    dropDownContainerStyle={COMMON_STYLES.DROPDOWN_BOX}
                  />
                  <DropDownPicker
                    items={[
                          {label: '1993', value: '1993'},
                          {label: '2000', value: '2000'},
                          {label: '2001', value: '2001'},
                    ]}
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
                    placeholder="Year"
                    placeholderStyle={{
                      color: "grey",
                      fontSize: 10,
                    }}
                    listMode="SCROLLVIEW"
                  />
            </View>
            
            <TextInput style={{ ...COMMON_STYLES.TEXT_INPUT, backgroundColor: APP_COLORS.light_grey }} placeholder="Referral Code" onChangeText={(val) => handleChange(val, 'referralCode')} value={state.referralCode}/>

            <View style= {{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                    status={state.term ? 'checked' : 'unchecked'}
                    onPress={() => {
                       handleChange(state.term, 'term');
                    }}
                    color={APP_COLORS.green}
                    uncheckedColor={APP_COLORS.white}
                />

                <Text style={COMMON_STYLES.BODY_TEXT_WHITE}>Accept <Text style={COMMON_STYLES.LINK_TEXT} onPress={()=>Linking.openURL(`${BACKEND_URL}/terms`)}> Terms and Conditions</Text></Text>
            </View>
            

            <Pressable elevation={3} disabled={ state.disabled } onPress= {handlePress} style={[COMMON_STYLES.BTN_1, state.disabled && COMMON_STYLES.DISABLED_BTN]}>
                <Text style={[COMMON_STYLES.BTN_TEXT, state.disabled && COMMON_STYLES.DISABLED_TEXT]}>Register</Text>
            </Pressable>

            <Text style={[COMMON_STYLES.ERROR_TXT]}>{state.error}</Text>
        </View>
      </SafeAreaView>
  )
}

export default Register;