import {StyleSheet} from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const walletStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        backgroundColor: APP_COLORS.white,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 10,
    },
    CARD: {
        backgroundColor: APP_COLORS.white,
        //borderBottomWidth: 0.5,
        //borderColor: APP_COLORS.light_grey,
        flex: 1,
        borderRadius: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    CARD_TEXT: {
        color: APP_COLORS.appBlue,
        fontSize: 10,
        //marginVertical: 2,
    },
    LEFT_COL: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '60%',
    },
    RIGHT_COL: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '40%',
    },

    TXN_STATUS: {
        fontSize: 10,
        opacity: 0.8,
        marginVertical: 2,
        paddingVertical: 2.5,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    STATUS_INITIATED: {
        backgroundColor: APP_COLORS.light_grey,
        color: APP_COLORS.WHITE,
    },

    STATUS_SUCCESS: {
        backgroundColor: APP_COLORS.green,
        color: APP_COLORS.black,
    },

    STATUS_FAILED: {
        backgroundColor: APP_COLORS.red,
        color: APP_COLORS.white,
    },

    STATUS_PENDING: {
        backgroundColor: APP_COLORS.yellow,
        color: APP_COLORS.black,
    }
});