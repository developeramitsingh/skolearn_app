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
        borderRadius: 15,
        marginVertical: 5,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
    },
    CARD_VERTICAL: {
        borderRadius: 15,
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
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ROW_LEFT: {
        display: 'flex',
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    COL_RIGHT: {
        backgroundColor: APP_COLORS.lightBlue,
        paddingHorizontal: 5,
        justifyContent: 'center',
        maxHeight: 40,
        borderBottomEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 3,
    },
    COL_RIGHT_2: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 20,
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
        fontSize: 12,
        color: APP_COLORS.appBlue,
        paddingVertical: 10,
        flexWrap: 'wrap',
        fontWeight: 'bold'
    },
    LABEL_TEXT: {
        fontSize: 8,
        color: APP_COLORS.appBlue,
        textAlign: 'center',
    },
    LABEL_TEXT_BODY: {
        fontSize: 8,
        color: APP_COLORS.appBlue,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    FEE: {        
        fontSize: 16,
        color: APP_COLORS.appBlue,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    CARD_BTN: {
        backgroundColor: APP_COLORS.appBlue,
        paddingHorizontal: 10,
        paddingVertical: 8,
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
        color: APP_COLORS.appBlue,
        paddingRight: 5,
        //paddingVertical: 2.5,
        marginRight: 5,
        marginTop: 5,
        //borderRadius: 10,
    },
    CARD_LABEL: {
        fontSize: 6,
        backgroundColor: APP_COLORS.lightYellow,
        color: APP_COLORS.appBlue,
        paddingHorizontal: 10,
        paddingVertical: 2.5,
        marginRight: 5,
        borderRadius: 10,
        marginTop: 5,
    },
    CARD_LABEL_VERT: {
        backgroundColor: APP_COLORS.backPanelColor,
        color: APP_COLORS.appBlue,
    }

})

export default cardListStyles;