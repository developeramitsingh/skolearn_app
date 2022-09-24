import { View, Modal, Text, TouchableOpacity, TextInput, Pressable } from "react-native"
import { useEffect, useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { ACTION_TYPES, CLOSE_MODAL} from '../../constant/constant';
import { checkAndGetIfErrorFound } from "../../common/functions/commonHelper";
import Loader from "../loader/loader";

const ModalBankPanCard = ({ data, title, modalVisible, handleModalPress, btnTxt, actionType, keyboardType, maxLength, modalType }) => {
    const [state, setState] = useState({
        ...(data && data),
        errors: {
            userNameInBank: 'Name is required',
            bankName: 'Bank name is required',
            bankAccountNum: 'Bank account number is required',
            bankIfscCode: 'Bank IFSC code is required',
            userNameInPan: 'Name is required',
            panNum: 'Pan number is required',
        },
        error: '',
        disabled: true,
    });
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if(data) {
            setState(prev => {
                return { ...prev, ...data, errors: {}, error: '' }
            });
        }
    }, [data]);

    const handleChange = (inputName, val) => {
        console.info(val);
        let errors = { ...(state.errors && state.errors) };

        if (
            ['userNameInBank', 'bankName', 'userNameInPan'].includes(inputName)
        ) {
            if (val?.length >= 3) {
                errors[inputName] = ''
            } else {
                errors[inputName] = 'User Name/Bank Name is invalid'
            }
        } else if (inputName === 'bankAccountNum') {
            if (val?.length >= 11) {
                errors[inputName] = ''
            } else {
                errors[inputName] = 'Bank Account Number is invalid'
            }
        } else if (inputName === 'bankIfscCode') {
            if (val?.length && val.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
                errors[inputName] = ''
            } else {
                errors[inputName] = 'IFSC code is invalid'
            }
        } else if (inputName === 'panNum') {
            if (val?.length && val.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
                errors[inputName] = ''
            } else {
                errors[inputName] = 'Pan Number is invalid'
            }
        }
 
        if (modalType === ACTION_TYPES.UPDATE_BANK_DETAIL) {
            delete errors.userNameInPan;
            delete errors.panNum;
        } else if (modalType === ACTION_TYPES.UPDATE_PAN_DETAIL){
            errors = {
                userNameInPan: errors.userNameInPan,
                panNum: errors.panNum,
            };
        }

        console.info({inputName, val});
        const {isErrorFound, errorMsg} = checkAndGetIfErrorFound(errors) || {};
        console.info({ isErrorFound, errorMsg });

        setState((prev) => { 
            return {...prev, [inputName]: val, disabled: isErrorFound, errors, error: errorMsg }
        });
    }

    const bankInputs = ()=> {
        return (
            <>
                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        autoCapitalize = {"characters"}
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter Your Full Name"}
                        onChangeText= {(val)=> handleChange('userNameInBank', val)} 
                        value={state.userNameInBank}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        autoCapitalize = {"characters"}
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter Bank Name"}
                        onChangeText= {(val)=> handleChange('bankName', val)} value={state.bankName}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        autoCapitalize = {"characters"}
                        maxLength={17} 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {"numeric"}
                        placeholder={"Enter Bank Account number"}
                        onChangeText= {(val)=> handleChange('bankAccountNum', val)} value={state.bankAccountNum}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        autoCapitalize = {"characters"}
                        maxLength={11} 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter bank IFSC code"}
                        onChangeText= {(val)=> handleChange('bankIfscCode', val)} value={state.bankIfscCode}
                    />
                </View>
            </>
        )
    }

    const panInputs = ()=> {
        return (
            <>
                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        autoCapitalize = {"characters"}
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter Your Full Name"}
                        onChangeText= {(val)=> handleChange('userNameInPan', val)} 
                        value={state.userNameInPan}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        autoCapitalize = {"characters"}
                        maxLength={10} 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {"default"}
                        placeholder={"Enter Pan Card Number"}
                        onChangeText= {(val)=> handleChange('panNum', val)} 
                        value={state.panNum}
                    />
                </View>
            </>
        )
    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalStyles.CONT_CENTER}>
                <Text style={modalStyles.modalTitle}>{title}</Text>
                <Text style={COMMON_STYLES.ERROR_TXT}>{state.error}</Text>

                { modalType === ACTION_TYPES.UPDATE_BANK_DETAIL 
                    ? bankInputs()
                    : modalType === ACTION_TYPES.UPDATE_PAN_DETAIL 
                    ? panInputs()
                    : null
                }

                <View style={modalStyles.ROW_SPREAD}>
                    <Pressable disabled={ state.disabled } onPress={async () => {
                        setState((prev)=> { return {...prev, disabled: true }})
                        setLoading(true);
                        await handleModalPress(actionType, state);
                        setState((prev)=> { return {...prev, disabled: false }})
                        setLoading(false);
                    }} style={[COMMON_STYLES.BTN_1, state.disabled && COMMON_STYLES.DISABLED_BTN]}>
                        <Loader isLoading={isLoading}/>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{btnTxt}</Text>
                    </Pressable>
                </View>

                <View style={COMMON_STYLES.ROW}>
                    <TouchableOpacity onPress={() => handleModalPress(CLOSE_MODAL)} style={COMMON_STYLES.SUB_BTN_1}>
                        <Text style={COMMON_STYLES.SUB_BTN_TXT}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalBankPanCard;