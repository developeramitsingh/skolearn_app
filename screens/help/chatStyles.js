import {StyleSheet} from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const chatStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
    },
    ROW: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusBar: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: APP_COLORS.blue
    },
    chatMsgListHead: {
        textAlign: 'center',
        color: APP_COLORS.light_grey,
        marginBottom: 10,
    },
    chatMsgList: {
        backgroundColor: APP_COLORS.black,
        flex: 1,
        padding: 10,
    },
    CHAT_INPUT_CONT: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    TEXT_INPUT: {
        color: '#000',
        //backgroundColor: '#fff',
        fontSize: 14,
        //paddingHorizontal: 15,
        paddingVertical: 10,
        width: '74%',
        //flex: 2,
        // marginTop: '4%',
        // marginBottom: '4%',
    },
    SEND_BTN_CONT: {
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: APP_COLORS.blue,
        borderRadius: 20,
    },
    chatMsgBlock: {
        backgroundColor: APP_COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
    },
    chatMsgBlockSupport: {
        alignSelf: 'flex-start',
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        borderBottomRightRadius : 10,
        backgroundColor: APP_COLORS.blue,
    },
    chatMsgBlockUser: {
        alignSelf: 'flex-end',
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
    },
});