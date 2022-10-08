import {StyleSheet} from 'react-native';
import { APP_COLORS } from '../../constant/constant';

const CHAT_BORDER = {
    SUPPORT: {
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        borderBottomRightRadius : 10,
    },
    USER: {
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
    }
}
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
        backgroundColor: APP_COLORS.yellow
    },
    chatMsgListHead: {
        textAlign: 'center',
        color: APP_COLORS.light_grey,
        marginBottom: 10,
    },
    chatMsgList: {
        backgroundColor: APP_COLORS.white,
        flex: 1,
        padding: 10,
    },
    CHAT_INPUT_CONT: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: APP_COLORS.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: APP_COLORS.appThemeColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
    },
    TEXT_INPUT: {
        color: APP_COLORS.appThemeColor,
        fontSize: 14,
        //paddingHorizontal: 15,
        paddingVertical: 5,
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
        backgroundColor: APP_COLORS.yellow,
        borderRadius: 20,
    },
    chatMsgBlock: {
        backgroundColor: APP_COLORS.blueGreen,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
    },
    chatMsgBlockSupport: {
        alignSelf: 'flex-start',
        ...CHAT_BORDER.SUPPORT,
        backgroundColor: APP_COLORS.grey,
        marginLeft: 10,
    },
    chatMsgBlockUser: {
        alignSelf: 'flex-end',
        ...CHAT_BORDER.USER,
        marginRight: 10,
    },
    chatImgSupport: {
        alignSelf: 'flex-start',
        width: 150,
        height: 100,
        
        ...CHAT_BORDER.SUPPORT,
        borderColor: APP_COLORS.blue,
        borderWidth: 2,
    },
    chatImgUser: {
        width: 150,
        height: 100,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        ...CHAT_BORDER.USER,
        borderColor: APP_COLORS.light_grey,
        borderWidth: 1,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderColor: APP_COLORS.light_grey,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});