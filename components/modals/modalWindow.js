import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { CLOSE_MODAL} from '../../constant/constant';

const ModalWindow = ({ title, modalVisible, handleModalPress, btnTxt, placeholder, actionType, keyboardType, maxLength }) => {
    const [state, setState] = useState({
        value: '',
    });

    const handleChange = (val) => {
        console.info(val);
        setState(prev => {
            return { ...prev, value: val, };
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
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={placeholder}
                        onChangeText= {handleChange} value={state.value}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity onPress={() => handleModalPress(actionType, state.value)} style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{btnTxt}</Text>
                    </TouchableOpacity>
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity onPress={() => handleModalPress(CLOSE_MODAL)} style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalWindow;