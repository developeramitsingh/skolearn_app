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
        marginVertical: 10,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    CARD_VERTICAL: {
        borderRadius: 15,
        marginVertical: 10,
        //marginRight: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    ROW: {
        display: 'flex',
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    COL_RIGHT: {
        backgroundColor: APP_COLORS.white,
        paddingHorizontal: 5,
        justifyContent: 'center',
        maxHeight: 40,
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
        maxWidth: '70%',
    },
    COL_LEFT_2: {
    },
    TITLE: {
        fontWeight: 'bold',
        fontSize: 16,
        color: APP_COLORS.black,
        paddingVertical: 10,
    },
    LABEL_TEXT: {
        fontWeight: 'bold',
        fontSize: 10,
        color: APP_COLORS.black,
        textAlign: 'center',
    },
    FEE: {
        fontWeight: '900',
        fontSize: 22,
        color: APP_COLORS.black,
        textAlign: 'center',
    },
    CARD_BTN: {
        backgroundColor: APP_COLORS.black,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 15,
    },
    CARD_BTN_TEXT: {
        fontSize: 14,
        fontWeight: 'bold',
        color: APP_COLORS.white,
    }

})

export default cardListStyles;