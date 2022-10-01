import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, KeyboardAvoidingView, TextInput, ScrollView, Pressable, Image } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { chatStyles } from './chatStyles';
import { APP_COLORS, BACKEND_URL, STORAGE_KEYS } from '../../constant/constant';
import Active from '../../components/active/active';
import { FontAwesome } from '@expo/vector-icons';
import io from 'socket.io-client';
import { getFromStorage } from '../../utils/utils';

const Chat = ({ticketId}) => {
    //let scrollViewRef = React.useRef(null);
    const socketRef = React.useRef(null);

    const [state, setState]= useState({
        supportUserName: '',
        isSupportOnline: false,
        userMsg: '',
        userId: '',
        supportUserId: '',
    });

    const [messages, setMessages] = useState([
        
    ]);

    const [reference, setReference] = useState(null);

    const getUser = async () => {
        try {
            const user = await getFromStorage(STORAGE_KEYS.USER);

            if (!user) {
                return;
            }

            setState((prev) => {
                return { ...prev, userId: user._id, userName: user.userName, roleKey: user?.roleId?.roleKey }
            })
        } catch (err){
            console.error(`errror in getUser: ${err}`);
        }
    }

    useEffect(() => {
        getUser();
        socketRef.current = io(BACKEND_URL);

        socketRef.current.emit('userOnline', { userId: state.userId, userName:state.userName, roleKey: state.roleKey })

        socketRef.current.on('supportConnected', ( {supportUserName, supportUserId }, callBack) => {
            console.info(`support is online`, {supportUserName}, { supportUserId });

            if (!state.supportUserId) {
                setState((prev) => {
                    return { ...prev, supportUserName: supportUserName, supportUserId, isSupportOnline: true }
                })
            }

            callBack("Support is online acknowledgement recieved by user");
        });

        socketRef.current.on('supportMessageAgent'+state.supportUserId+state.userId, ({ sid, message, time, rid}, callBack) => {
            console.info(`message recieced`, message);
            setMessages(prev => {
                return [ ...prev, { txt: message, userType: 'support', id: sid, time, rid }]
            })

            callBack('Message recieved by user');
        });

        // socketRef.current.on('supportDisconnectAgent'+state.supportUserId, ()=> {
        //     setState((prev) => {
        //         return { ...prev, supportUserId: null, isSupportOnline: false, supportUserName: null }
        //     })
        // })

        // socketRef.current.on('offlineSupportUser', ({ userId}) => {
        //     console.info('offlineSupportUser calledd---------->');
        //     setState((prev) => {
        //         return { ...prev, isSupportOnline: false, supportUserName: null }
        //     })
        // });
       

        return () => {
            socketRef.current?.disconnect({userId: 123});
            
        }
    }, [state.supportUserId]);

    const handleChange = (val) => {
        setState(prev=> {
            return { ...prev, userMsg: val };
        })
    }

    const handleSubmit = () => {
        if(!state.userMsg?.trim()) {
            return;
        }
        console.info({ currentUserId: state.userId, userName: state.userName, supportUserId: state.supportUserId });
        socketRef.current.emit('userMessage', { userId: state.userId, userName:state.userName, message: state.userMsg, supportUserId: state.supportUserId })

        setMessages(prev => {
            return [ ...prev, { txt: state.userMsg, userType: 'user', id: Math.floor(Math.random() * 10000) }]
        })

        setState(prev => {
            return { ...prev, userMsg: '' }
        })
    }

    return (
        <SafeAreaView style={chatStyles.CONTAINER}>
            <View style={chatStyles.statusBar}>
                <Text style={COMMON_STYLES.BODY_TITLE}>{state.supportUserName ? state.supportUserName + ' Available' : 'Offline'}</Text>
                <Active isActive={state.isSupportOnline}/>
            </View>

            
            <ScrollView showsVerticalScrollIndicator={false} style={chatStyles.chatMsgList} 
                ref={(ref) => {
                    setReference(ref);
                  }}
                onContentSizeChange={() => {
                    reference.scrollToEnd({ animated: true, index: -1 }, 200);
                }}
            >
                <Text style={chatStyles.chatMsgListHead}>Type Hi, to start the conversation</Text>

                {
                    messages?.map((msg,idx) => {
                        const isSupportUser = msg.userType === 'support';
                        const userStyle = chatStyles.chatMsgBlockUser;
                        const supportStyle = chatStyles.chatMsgBlockSupport;

                        const userChatImgStyle = chatStyles.chatImgUser;
                        const supportChatImgStyle = chatStyles.chatImgSupport;
                        return (
                            <View key={msg.id} style={{ marginBottom: 10 }}>
                                <View style={[chatStyles.chatMsgBlock, isSupportUser ? supportStyle :  userStyle ]}>
                                    <Text style={ isSupportUser ? COMMON_STYLES.BODY_TEXT_WHITE : COMMON_STYLES.BODY_TEXT_WHITE }>{msg.txt}</Text>
                                </View>
                                {
                                    msg.img ?
                                    <Image source={{ uri: msg.img }} style={isSupportUser ? supportChatImgStyle : userChatImgStyle }/>
                                    : null
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
            

            <View style ={chatStyles.CHAT_INPUT_CONT}>
                <TextInput  style={chatStyles.TEXT_INPUT} placeholder="Type here Message" onChangeText= {handleChange} value={state.userMsg}/>

                <Pressable onPress= {handleSubmit} style={chatStyles.SEND_BTN_CONT}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>Send</Text>
                    <FontAwesome name="send" size={16} color={APP_COLORS.white} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
};

export default Chat;