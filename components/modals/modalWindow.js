import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { CLOSE_MODAL} from '../../constant/constant';
import Loader from '../../components/loader/loader';

const ModalWindow = ({ title, modalVisible, handleModalPress, btnTxt, placeholder, actionType, keyboardType, maxLength, validRegex, closeTxt }) => {
    const [value, setValue] = useState('');
    const [disable, setDisable] = useState(true);

    const handleChange = (val) => {
        console.info(val);

        if (validRegex && keyboardType === 'numeric') {
            val = val.replace(validRegex, '');
        }

        if (val) {
            setDisable(false);
            setValue(val);
        } else {
            setDisable(true);
            setValue('');
        }

        console.info(`val->`, val);
        
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
        >
            <View style={modalStyles.CONT_CENTER}>
                <Text style={modalStyles.modalTitle}>{title}</Text>

                <View style={modalStyles.ROW_SPREAD}>
                    <TextInput 
                        maxLength={maxLength ? maxLength : null } 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType= {keyboardType ? keyboardType : "default"}
                        placeholder={placeholder}
                        onChangeText= {handleChange} 
                        value={value}
                    />
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity disabled={disable} onPress={async () => {
                        setDisable(true)
                        await handleModalPress(actionType, value)
                        setDisable(false)
                    }} style={[modalStyles.BTN, disable && COMMON_STYLES.DISABLED_BTN]}>
                        <Text style={[COMMON_STYLES.BTN_TEXT, disable && COMMON_STYLES.DISABLED_TEXT]}>{btnTxt}</Text>
                        <Loader isLoading={disable && value ? true : false}/>
                    </TouchableOpacity>
                </View>

                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity onPress={() => {
                            setValue('');
                            setDisable(true);
                            handleModalPress(CLOSE_MODAL)
                        }
                    } style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{closeTxt}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalWindow;