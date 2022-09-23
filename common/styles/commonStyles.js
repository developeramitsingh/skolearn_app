import {APP_COLORS} from '../../constant/constant';
export const COMMON_STYLES = {
    CONTAINER: {
        backgroundColor: APP_COLORS.back,
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 15,
    },
    CONTAINER_BLUE: {
        backgroundColor: APP_COLORS.appBlue,
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
        fontSize: 20,
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

    OP_BTN_1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        marginBottom: '3%',
        paddingVertical: 14,
        borderRadius: 40,
        backgroundColor: APP_COLORS.white,
    },

    BTN_TEXT: {
        fontSize: 14,
        color: APP_COLORS.black,
    },

    SUB_BTN_TXT: {
        fontSize: 14,
        color: APP_COLORS.black,
    },

    TITLE_TEXT: {
        color: '#fff',
        fontSize: 36,
        textAlign: 'center',
        //marginTop: '10%',
    },

    MARGIN_TOP: {
        marginTop: '10%',
    },
    MARGIN_LEFT: {
        marginLeft: '10%',
    },

    BODY_TEXT:  {
        color: APP_COLORS.appBlue,
        fontSize: 12,
    },
    BODY_TEXT_WHITE:  {
        color: APP_COLORS.white,
        fontSize: 12,
    },
    BODY_TEXT_BLACK:  {
        color: APP_COLORS.black,
        fontSize: 12,
    },
    BODY_TITLE:  {
        color: APP_COLORS.appBlue,
        fontSize: 12,
        
    },
    BODY_TITLE_WHITE:  {
        color: APP_COLORS.white,
        fontSize: 12,
        
    },
    BODY_TITLE_BLACK:  {
        color: APP_COLORS.black,
        fontSize: 12,
        
    },
    BODY_HEADING_1:  {
        color: APP_COLORS.appBlue,
        fontSize: 28,
        
    },
    BODY_HEADING_1_WHITE:  {
        color: APP_COLORS.white,
        fontSize: 28,
        
    },
    BODY_TABS:  {
        borderWidth: 0.5,
        borderColor: APP_COLORS.white,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    ACTIVE: {
        backgroundColor: APP_COLORS.yellow,
        borderWidth: 0, 
    },
    ACTIVE_TEXT: {
        color: APP_COLORS.black,
    },
    BODY_TABS_TEXT:  {
        color: APP_COLORS.white,
        fontSize: 12,
        
        textAlign: 'center',
    },
    LINK_TEXT: {
        color: APP_COLORS.blue,
        
    },
    CENTER: {
        textAlign: 'center',
        alignItems: 'center',
    },
    SEPARATOR: {
        height: 1,
        backgroundColor: APP_COLORS.light_grey,
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
    ROW_LEFT: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    ROW_COLUMN: {
        flexDirection: 'column',
        alignItems: 'center',
        //alignItems: ''
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    ROW_COLUMN_LEFT: {
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        backgroundColor: APP_COLORS.yellow,
    },
    DISABLED_ARROW: {
        backgroundColor: APP_COLORS.black_opacity,
    },
    CORRECT_ANS: {
        backgroundColor: APP_COLORS.green,
    },

    USER_NOT_ANSWERED: {
        backgroundColor: APP_COLORS.blueGreen,
    },

    WRONG_ANS: {
        backgroundColor: APP_COLORS.red,
    },

    USER_NOT_ANSWERED_TEXT: {
        color: APP_COLORS.white,
    },

    DISABLED_TEXT: {
        color: APP_COLORS.black,
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
        fontSize: 10,
        color: APP_COLORS.black,
    },
    SUB_BTN_TXT_2_W: {
        fontSize: 10,
        color: APP_COLORS.white,
    },
    HIDE: {
        opacity: 0,
    },
    CARD: {
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal: 10,
        backgroundColor: APP_COLORS.white,
        borderBottomColor: APP_COLORS.light_grey,
        borderBottomWidth: 0.5,
        marginVertical: 5
    },
    DISABLED_BTN: {
        backgroundColor: APP_COLORS.grey,
    },
    DISABLED_TXT: {
        color: APP_COLORS.white,
    },
    ERROR_TXT: {
        color: APP_COLORS.red,
        alignSelf: 'center'
    },
    LOADER_CONT: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1000,
      },
    BOX_SHADOW: {
        shadowColor: '#000',  
        elevation: 30,  
        shadowOffset:{width:0, height: 0},  
        shadowOpacity:1,  
        shadowRadius: 5,  
    },
    ACTIVE_USER_TEXT: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    DROPDOWN: {
        width: 80, 
        //height: 50,
        borderWidth: 0,
        borderRadius: 30,
        padding: 0,
        margin: 0,
    },
    DROPDOWN_BOX: {
      borderWidth: 0.5,
      borderColor: APP_COLORS.light_grey
    },
    LABEL: {
        backgroundColor: APP_COLORS.yellow,
        padding: 5,
        fontSize: 8,
        minWidth: 50,
        color: APP_COLORS.black,
        textAlign: 'center',
        borderRadius: 5,
    }
}