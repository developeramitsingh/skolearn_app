import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";

const ModalWindow = ({ title, modalVisible, handleModalPress, handleChange, userEnteredValue, btnTxt, placeholder }) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalStyles.container}>
                <Text style={modalStyles.modalTitle}>{title}</Text>

                <View style={modalStyles.ROW}>
                    <TextInput 
                        maxLength={10} 
                        style={modalStyles.TEXT_INPUT}
                        keyboardType="numeric"
                        placeholder={placeholder}
                        onChangeText= {handleChange} value={userEnteredValue}
                    />
                    <TouchableOpacity onPress={() => handleModalPress(!modalVisible)} style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{btnTxt}</Text>
                    </TouchableOpacity>
                </View>

                <View style={COMMON_STYLES.ROW}>
                    <TouchableOpacity onPress={() => handleModalPress(!modalVisible)} style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalWindow;