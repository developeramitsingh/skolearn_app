import React, { useState } from "react";
import { SafeAreaView, View, Text, KeyboardAvoidingView, TextInput, ScrollView, Pressable } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { chatStyles } from './chatStyles';
import { APP_COLORS, CLOSE_MODAL } from '../../constant/constant';
import Active from '../../components/active/active';
import { FontAwesome } from '@expo/vector-icons';

const Chat = () => {
    //let scrollViewRef = React.useRef(null);
    const [state, setState]= useState({
        supportUserName: 'Test name',
        isSupportOnline: true,
        userMsg: '',
        userMsgList: [{
            txt: 'Hi, i want to apply for test',
        }],
    });
    const [reference, setReference] = useState(null);

    const handleChange = (val) => {
        setState(prev=> {
            return { ...prev, userMsg: val };
        })
    }

    const handleSubmit = () => {
        setState(prev => {
            return { ...prev, userMsg: '', userMsgList: [...prev.userMsgList, { txt: state.userMsg }]}
        })
    }

    return (
        <SafeAreaView style={chatStyles.CONTAINER}>
            <View style={chatStyles.statusBar}>
                <Text style={COMMON_STYLES.BODY_TITLE}>{state.supportUserName ? state.supportUserName + ' Available' : 'Offline'}</Text>
                <Active isActive={state.isSupportOnline}/>
            </View>

            
            <ScrollView style={chatStyles.chatMsgList} 
                ref={(ref) => {
                    setReference(ref);
                  }}
                onContentSizeChange={() => {
                    reference.scrollToEnd({ animated: true, index: -1 }, 200);
                }}
            >
                <Text style={chatStyles.chatMsgListHead}>Type Hi, to start the conversation</Text>
                <View style={[chatStyles.chatMsgBlock, chatStyles.chatMsgBlockSupport]}>
                    <Text>Hi</Text>
                </View>
                {
                    state?.userMsgList?.map((msg,idx) => {
                        return (
                            <View key ={idx} style={[chatStyles.chatMsgBlock, chatStyles.chatMsgBlockUser]}>
                                <Text>{msg.txt}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
            

            <View style ={chatStyles.CHAT_INPUT_CONT}>
                <TextInput  style={chatStyles.TEXT_INPUT} placeholder="Type here Message" onChangeText= {handleChange} value={state.userMsg}/>

                <Pressable onPress= {handleSubmit} style={chatStyles.SEND_BTN_CONT}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>Send</Text>
                    <FontAwesome name="send" size={20} color={APP_COLORS.white} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
};

export default Chat;