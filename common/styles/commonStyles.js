import {APP_COLORS} from '../../constant/constant';
export const COMMON_STYLES = {
    CONTAINER: {
        backgroundColor: APP_COLORS.black,
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 15,
    },
    CONTAINER_LIGHT: {
        backgroundColor: APP_COLORS.white,
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 15,
    },

    CONTAINER_LIGHT_ALL_CENTER: {
        backgroundColor: APP_COLORS.white,
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TEXT_INPUT: {
        color: '#000',
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 14,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 40,
        marginTop: '4%',
        marginBottom: '4%',
    },
    BTN_1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        marginBottom: '3%',
        paddingVertical: 14,
        borderRadius: 40,
        backgroundColor: APP_COLORS.yellow,
    },

    BTN_TEXT: {
        fontSize: 14,
        fontWeight: 'bold',
        color: APP_COLORS.black,
    },

    SUB_BTN_TXT: {
        fontSize: 14,
        fontWeight: 'bold',
        color: APP_COLORS.black,
    },

    TITLE_TEXT: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%',
    },

    BODY_TEXT:  {
        color: APP_COLORS.white,
        fontSize: 12,
    },
    BODY_TEXT_BLACK:  {
        color: APP_COLORS.black,
        fontSize: 12,
    },
    BODY_TITLE:  {
        color: APP_COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    BODY_TITLE_BLACK:  {
        color: APP_COLORS.black,
        fontSize: 14,
        fontWeight: 'bold',
    },
    BODY_HEADING_1:  {
        color: APP_COLORS.white,
        fontSize: 32,
        fontWeight: 'bold',
    },
    BODY_TABS:  {
        borderWidth: 1,
        borderColor: APP_COLORS.grey,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    ACTIVE: {
        backgroundColor: APP_COLORS.blue,
        borderWidth: 0, 
    },
    ACTIVE_TEXT: {
        color: APP_COLORS.white,
    },
    BODY_TABS_TEXT:  {
        color: APP_COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    LINK_TEXT: {
        color: APP_COLORS.blue,
        fontWeight: 'bold',
    },
    CENTER: {
        textAlign: 'center',
        alignItems: 'center',
    },
    SEPARATOR: {
        height: 1,
        backgroundColor: APP_COLORS.grey,
    },
    SEPARATOR_WHITE: {
        height: 1,
        backgroundColor: APP_COLORS.white,
    },
    SEPARATOR_VERTICAL: {
        width: 1,
        backgroundColor: APP_COLORS.grey,
    },
    ROW: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    ROW_COLUMN: {
        flexDirection: 'column',
        alignItems: 'center',
        //alignItems: ''
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    ROW_CENTER: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 5,
        // paddingHorizontal: 5,
    },
    DISABLED: {
        backgroundColor: APP_COLORS.black_opacity,
    },
    DISABLED_TEXT: {
        color: APP_COLORS.white_opacity,
    },
    SUB_BTN_1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 40,
        backgroundColor: APP_COLORS.yellow,
    },
    SUB_BTN_2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 40,
        backgroundColor: APP_COLORS.yellow,
    },
    SUB_BTN_TXT_2: {
        fontSize: 12,
        fontWeight: 'bold',
        color: APP_COLORS.black,
    },
    HIDE: {
        opacity: 0,
    },
    CARD: {
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal: 10,
        backgroundColor: APP_COLORS.blue,
        marginVertical: 5
    }
}