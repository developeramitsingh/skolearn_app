import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const resultScreenStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        backgroundColor: APP_COLORS.appBlue,
        paddingHorizontal: 10,
    },
    LEATHER_BOARD_CONT_LIGHT: {
        flex: 1,
        backgroundColor: APP_COLORS.white,
        borderRadius: 20,
    },
    ROW: {
        marginVertical: '5%'
    },
    BOARD_ROW: {
        flexDirection: 'row',
    },
    HEADING: {
        fontWeight: 'bold',
        fontSize: 20,
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    LABEL_TEXT: {
        fontWeight: 'bold',
        fontSize: 14,
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    TAB_BTN: {
        backgroundColor: APP_COLORS.white,
        //paddingHorizontal: 20,
        paddingVertical: 10,
        width: '50%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    TAB_BTN_TEXT: {
        color: APP_COLORS.black,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    TAB_BTN_ACTIVE: {
        borderBottomColor: APP_COLORS.appBlue,
        borderBottomWidth: 4,
        backgroundColor: APP_COLORS.appBlue
    },
    TAB_BTN_TEXT_ACTIVE: {
        color: APP_COLORS.white,
    }
});