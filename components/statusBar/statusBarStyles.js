import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';
const statusBarStyles = StyleSheet.create({
    SUB_CONT: {
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: '#fff',
    },

    STATUS_BAR_TEXT: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    }
})

export default statusBarStyles;