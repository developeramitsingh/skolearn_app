import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';
export const verifyOtpStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: APP_COLORS.appThemeColor,
    },
    logo: {
        marginTop: '20%',
        borderRadius: 10,
        width: 200,
        height: 60,
    },
    screenTitle: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '15%',
    },
    verifyOtpContainter: {
        marginTop: '10%',
        width: '85%',
    },
    textBody: {
        color: APP_COLORS.white,
        textAlign: 'center',
        fontSize: 10,
    }
})