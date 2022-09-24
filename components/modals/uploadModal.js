import { View, Modal, Text, TouchableOpacity, Image } from "react-native"
import { useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { pickImage } from '../../common/functions/commonHelper';
import { CLOSE_MODAL } from "../../constant/constant";
import Loader from "../loader/loader";

const UploadModal = ({ title, modalVisible, handleModalPress, btnTxt, actionType, info }) => {
    const [uri, setUri] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const setPickedImage = async () => {
        console.info('select image');
        setUri(await pickImage())
        console.info('image set!');
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalStyles.container}>
                <Text style={modalStyles.modalTitle}>{title}</Text>

                <View style={modalStyles.ROW}>
                    {uri && <Image source={{ uri }} style={{ width: '90%', height: '40%' }} />}

                    <TouchableOpacity onPress={setPickedImage} style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Choose Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={async () => { 
                        setLoading(true);
                        await handleModalPress(actionType, uri);
                        setLoading(false);
                    }} style={modalStyles.BTN}>
                        <Loader isLoading={isLoading}/>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{btnTxt}</Text>
                    </TouchableOpacity>

                    <Text style={[COMMON_STYLES.BODY_TEXT, COMMON_STYLES.CENTER]}>{info}</Text>
                </View>

                <View style={COMMON_STYLES.ROW}>
                    <TouchableOpacity onPress={() => { 
                        handleModalPress(CLOSE_MODAL, !modalVisible)
                    }} style={modalStyles.BTN}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default UploadModal;