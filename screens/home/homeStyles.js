import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';
export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    backImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    tagLine: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '80%',
    },
    loginBtnContainter: {
        marginTop: '20%',
        width: '85%',
    },

    btnPressed: {
        backgroundColor: APP_COLORS.green,
    },
    textBody: {
        color: APP_COLORS.white,
        textAlign: 'center',
        fontSize: 10,
        marginTop: '5%',
    }
})