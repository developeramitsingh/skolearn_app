import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const tabStyles = StyleSheet.create({
    SUB_CONT: {
        flexDirection: 'row',
        //marginTop: '3%',
        //marginBottom: '2%',
        justifyContent: 'space-around',
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#fff',
        backgroundColor: APP_COLORS.appThemeColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
})