import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { ACTION_TYPES, CLOSE_MODAL} from '../../constant/constant';

const ModalBankPanCard = ({ title, modalVisible, handleModalPress, btnTxt, placeholder, actionType, keyboardType, maxLength, modalType }) => {
    const [state, setState] = useState({
    });

    const handleChange = (key, val) => {
        console.info(val);
        setState(prev => {
            return { ...prev, [key]: val, };
        })
    }

    const bankInputs = ()=> {
        return (
            <>
                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter Your Full Name"}
                        onChangeText= {(val)=> handleChange('name', val)} value={state.name}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter Bank Name"}
                        onChangeText= {(val)=> handleChange('bankName', val)} value={state.bankName}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {"numeric"}
                        placeholder={"Enter Bank Account number"}
                        onChangeText= {(val)=> handleChange('accountNo', val)} value={state.accountNo}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter bank IFSC code"}
                        onChangeText= {(val)=> handleChange('ifscCode', val)} value={state.ifscCode}
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
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter Your Full Name"}
                        onChangeText= {(val)=> handleChange('name', val)} 
                        value={state.name}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={"Enter Pan Card Number"}
                        onChangeText= {(val)=> handleChange('panCardNum', val)} 
                        value={state.panCardNum}
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

                { modalType === ACTION_TYPES.UPDATE_BANK_DETAIL 
                    ? bankInputs()
                    : modalType === ACTION_TYPES.UPDATE_PAN_DETAIL 
                    ? panInputs()
                    : null
                }

                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity onPress={() => handleModalPress(actionType, state)} style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{btnTxt}</Text>
                    </TouchableOpacity>
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