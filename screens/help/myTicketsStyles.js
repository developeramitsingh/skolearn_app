import { StyleSheet } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';

export const myTicketsStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        //alignItems: 'center',
        width: '100%',
        backgroundColor: APP_COLORS.back,
    },
    ROW: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    ROW_CENTER: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});