import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from 'react';
import { modalWindowStyles } from  './modalWindowStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";

const ModalWindow = ({ title, modalVisible, setModalVisible, handleChange, userEnteredValue, btnTxt, placeholder }) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalWindowStyles.container}>
                <Text style={modalWindowStyles.modalTitle}>{title}</Text>

                <View style={modalWindowStyles.ROW}>
                    <TextInput 
                        maxLength={10} 
                        style={modalWindowStyles.TEXT_INPUT}
                        keyboardType="numeric"
                        placeholder={placeholder}
                        onChangeText= {handleChange} value={userEnteredValue}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={modalWindowStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{btnTxt}</Text>
                    </TouchableOpacity>
                </View>

                <View style={COMMON_STYLES.ROW}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={modalWindowStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalWindow;