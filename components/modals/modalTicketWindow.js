import { View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, ScrollView } from "react-native"
import { useEffect, useState } from 'react';
import { modalStyles } from  './modalStyles';
import { COMMON_STYLES } from "../../common/styles/commonStyles";
import { APP_COLORS, CLOSE_MODAL} from '../../constant/constant';
import { checkAndGetIfErrorFound, pickImage } from '../../common/functions/commonHelper';
import { Entypo } from '@expo/vector-icons';
import { LANGUAGES_DATA } from "../../constant/language";
import Loader from "../loader/loader";
import { chatStyles } from "../../screens/help/chatStyles";
import { ticketsRaisedService } from "../../services";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const ModalTicketWindow = ({ title, modalVisible, handleModalPress, btnTxt, placeholder, actionType, ticketId, user, closeTxt }) => {
    
    const [isLoading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [ticket, setTicket] = useState([]);

    const fetchTicketData = async (id) => {
        try {
            setLoading(true);
            const data = await ticketsRaisedService.getTicketsRaisedById(id);
            setLoading(false);

            if (data?.data) {
                setTicket(data.data);
            }
        } catch (err) {
            console.error(`error in fetchTicketData: ${err}`);
        }
    }
    useEffect(()=> {
        if (ticketId) {
            fetchTicketData(ticketId);
        }
    }, [ticketId]);

    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
        > 
            <View style={{ padding: 10, flex: 1}}>
                <View style={[COMMON_STYLES.ROW, { borderBottomColor: APP_COLORS.light_grey, borderBottomWidth: 1 }]}>
                    <Text style={COMMON_STYLES.BODY_HEADING_2}>{title}</Text>
                    <AntDesign name="close" size={32} color= {APP_COLORS.appThemeColor} style={{ alignSelf: 'flex-end' }} onPress={() => handleModalPress(CLOSE_MODAL)}/>
                </View>
                
                <Loader isLoading={isLoading}/>
                <View style={[COMMON_STYLES.ROW_CENTER, { padding: 10 }]}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{ticket.subject}</Text>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={true}>
                    {
                        ticket?.messages?.map((msg,idx) => {
                            const isSupportUser = msg.userType === 'suportUser';
                            const userStyle = {...chatStyles.chatMsgBlockUser, marginRight: 30};
                            const supportStyle = {...chatStyles.chatMsgBlockSupport, marginLeft: 30};

                            const userChatImgStyle = { ...chatStyles.chatImgUser, marginRight: 30};
                            const supportChatImgStyle = { ...chatStyles.chatImgSupport, marginLeft: 30 };

                            const alignStyle = isSupportUser ? { alignSelf: 'flex-start' }: { alignSelf: 'flex-end'}

                            return (
                                <View key={idx} style={{ marginBottom: 10 }}>
                                    {
                                        msg.imageUrlThumb ?
                                        <Image resizeMode='cover' source={{ uri: msg.imageUrlThumb }} style={[isSupportUser ? supportChatImgStyle : userChatImgStyle ]}/>
                                        : null
                                    }
                                    <View>
                                        <View style={[chatStyles.chatMsgBlock, isSupportUser ? supportStyle :  userStyle ]}>
                                            <Text style={ isSupportUser ? COMMON_STYLES.BODY_TEXT_WHITE : COMMON_STYLES.BODY_TEXT_WHITE }>{msg.message}</Text>
                                        </View>
                                        <View>
                                            {
                                                user?.profileImgThumbUrl 
                                                ? <Image elevation={5} resizeMode='stretch' style={[chatStyles?.userImg, alignStyle]} source={{ uri: user?.profileImgThumbUrl }}></Image>
                                                : <FontAwesome name="user-circle-o" size={60} color={APP_COLORS.lightGrey2} style={alignStyle}/>
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>

                <View style={modalStyles.ROW_SPREAD}>
                    <TouchableOpacity onPress={() => handleModalPress(CLOSE_MODAL)} style={COMMON_STYLES.SUB_BTN_1}>
                        <Text style={COMMON_STYLES.BTN_TEXT}>{closeTxt}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalTicketWindow;