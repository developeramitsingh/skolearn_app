import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';
export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: APP_COLORS.black,
    },
    logo: {
        marginTop: '20%',
        borderRadius: 10,
        width: 200,
        height: 60,
    },

    loginContainter: {
        marginTop: '10%',
        width: '85%',
    },
})