import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const tabStyles = StyleSheet.create({
    SUB_CONT: {
        flexDirection: 'row',
        marginTop: '5%',
        marginBottom: '2%',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: '#fff',
        backgroundColor: APP_COLORS.blue,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
})