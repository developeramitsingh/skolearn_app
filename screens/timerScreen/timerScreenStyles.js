import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const timerScreenStyles = StyleSheet.create({
    CONTAINER_LIGHT: {
        flex: 1,
        backgroundColor: APP_COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    TIMER_LABEL: {
        fontSize: 70,
        fontWeight: 'bold',
    },
    TIMER_CONT: {
        borderRadius: 100,
        width: 200,
        height: 200,
        borderColor: APP_COLORS.blue,
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ROW: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    BODY_TEXT: {
        fontWeight: 'bold',
        textAlign: 'center',
    },

});