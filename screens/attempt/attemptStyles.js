import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';
export const attemptStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLORS.white,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'flex-start'
    },
    HEADING: {
        fontSize: 24,
        color: APP_COLORS.black,
        textAlign: 'center',
    },
    LABEL_TEXT: {
        fontSize: 12,
        color: APP_COLORS.black,
        textAlign: 'center',
    },

    NOTICE_TEXT: {
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
    },
    COL_LEFT: {
        flexDirection: 'row',
    }
})