import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { CLOSE_MODAL} from '../../constant/constant';

const ModalTicket = ({ title, modalVisible, handleModalPress, btnTxt, placeholder, actionType, keyboardType, maxLength }) => {
    const [state, setState] = useState({
        subject: '',
        message: '',
    });

    const handleChange = (key, val) => {
        console.info(val);
        setState(prev => {
            return { ...prev, [key]: val, };
        })

    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalStyles.CONT_CENTER}>
                <Text style={modalStyles.modalTitle}>{title}</Text>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT_LEFT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={placeholder}
                        onChangeText= {(val) => handleChange('subject', val)} 
                        value={state.subject}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <View style={ modalStyles.MULTI_TEXT }>
                        <TextInput 
                            maxLength={maxLength ? maxLength : null } 
                            style={[modalStyles.TEXT_INPUT_LEFT, { maxHeight: 300 }]}
                            keyboardType= {keyboardType ? keyboardType : "default"}
                            placeholder="Enter full message here"
                            onChangeText= {(val) => handleChange('message', val)} 
                            value={state.message}
                            multiline ={true}
                            scrollEnabled={true}
                        />
                    </View>
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity onPress={() => handleModalPress(actionType, state)} style={COMMON_STYLES.SUB_BTN_1}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{btnTxt}</Text>
                    </TouchableOpacity>
                </View>
                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity onPress={() => handleModalPress(CLOSE_MODAL)} style={COMMON_STYLES.SUB_BTN_1}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalTicket;