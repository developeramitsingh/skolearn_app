import { View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput } from "react-native"
import { useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { CLOSE_MODAL} from '../../constant/constant';
import { pickImage } from '../../common/functions/commonHelper';
import { Entypo } from '@expo/vector-icons';

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

    const setPickedImage = async () => {
        try {
            console.info('select image');
            let ticketImg = await pickImage();
            setState(prev=> {
                return {...prev, ticketImg: ticketImg };
            });

            console.info('image set!');
            console.info('calling API to update profile image...');
        } catch (err) {
            console.error(`error while setting up image img: ${err}`);
        }
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
                    <TouchableOpacity style={modalStyles.IMG_UPLOAD_PLACE} onPress={setPickedImage}>    
                        {
                            state.ticketImg 
                                ? <Image style={modalStyles.IMAGE} source={{uri: state.ticketImg}}></Image>
                                : <>
                                    <Text style={COMMON_STYLES.BODY_TEXT}>Upload image (if Any)</Text>
                                    <Entypo name="upload" size={24} color="white" style={{marginVertical: 10}}/>
                                </>
                        }
                        
                    </TouchableOpacity>
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