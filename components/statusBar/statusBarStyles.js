import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';
const statusBarStyles = StyleSheet.create({
    SUB_CONT: {
        flexDirection: 'row',
        //marginTop: '10%',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: '#fff',
        backgroundColor: APP_COLORS.appThemeColor,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
    },

    STATUS_BAR_TEXT: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    ROW: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '35%',
        paddingHorizontal: 10,
    },
    LABEL_TEXT: {
        color: APP_COLORS.white,
        fontWeight: 'bold',
        marginRight: '10%',
    },
    PROFILE_IMG: {
        width: 26,
        height: 26,
        borderRadius: 50,
    }
})

export default statusBarStyles;