import { StyleSheet } from 'react-native';
import { APP_COLORS, TEST_CARD_COLORS } from '../../constant/constant';

const cardListStyles = StyleSheet.create({
    LIST_VERTICAL: {
        //width: '100%',
        height: '50%',
    },
    LIST_HORIZONTAL: {
        //width: '100%',
        //height: '100%',
    },
    CARD_HORIZONTAL: {
        backgroundColor: APP_COLORS.yellow,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        minWidth: 320,
        justifyContent: 'space-between',
    },
    CARD_VERTICAL: {
        borderRadius: 10,
        //borderColor: APP_COLORS.light_grey,
        backgroundColor: APP_COLORS.white,
        //borderWidth: 0.5,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
    },
    ROW: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    ROW_LEFT: {
        display: 'flex',
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    COL_RIGHT: {
        //backgroundColor: APP_COLORS.lightGrey2,
        paddingHorizontal: 5,
        justifyContent: 'center',
        maxHeight: 40,
        borderRadius: 10
    },
    COL_RIGHT_2: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        //justifyContent: 'space-between',
    },
    COL_RIGHT_SUB: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    COL_LEFT: {
        maxWidth: '65%',
        paddingRight: 5,
    },
    TITLE: {
        fontSize: 14,
        color: APP_COLORS.appThemeColor,
        //paddingVertical: 10,
        flexWrap: 'wrap',
        fontWeight: 'bold'
    },
    LABEL_TEXT: {
        fontSize: 10,
        color: APP_COLORS.appThemeColor,
        textAlign: 'center',
    },
    LABEL_TEXT_BODY: {
        fontSize: 8,
        color: APP_COLORS.appThemeColor,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    FEE: {        
        fontSize: 16,
        color: APP_COLORS.appThemeColor,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    CARD_BTN: {
        backgroundColor: APP_COLORS.appThemeColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    },
    CARD_BTN_TEXT: {
        fontSize: 10,
        
        color: APP_COLORS.white,
    },
    CARD_TEST_TYPE: {
        fontSize: 8,
        backgroundColor: APP_COLORS.yellow,
        color: APP_COLORS.black,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2.5,
        alignSelf: 'center',
        marginTop: 10,
    },
    CARD_LABEL_HEAD: {
        fontSize: 8,
        fontWeight: 'bold',
        //backgroundColor: APP_COLORS.lightYellow,
        //color: APP_COLORS.appThemeColor,
        //paddingRight: 5,
        //paddingVertical: 2.5,
        //marginRight: 5,
        //marginTop: 5,
        //borderRadius: 10,
    },
    CARD_LABEL: {
        fontSize: 8,
        // backgroundColor: APP_COLORS.lightYellow,
        // color: APP_COLORS.appThemeColor,
        // paddingHorizontal: 8,
        // paddingVertical: 2,
        // marginRight: 5,
        // borderRadius: 10,
        // marginTop: 5,
    },
    CARD_LABEL_VERT: {
        //backgroundColor: APP_COLORS.lightBlue,
        //color: APP_COLORS.appThemeColor,
        //opacity: 0.8
    },
    CARD_TITLE_CONT: {
        backgroundColor: APP_COLORS.white_opacity, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        paddingHorizontal: 10,  
    },
    CARD_TITLE_CONT_VERTICAL: {
        backgroundColor: APP_COLORS.lightGrey2, 
    },

})

export default cardListStyles;