import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';
const dashboardStyles = StyleSheet.create({
    DASH_CONTAINER: {
        backgroundColor: APP_COLORS.black,
        flex: 1,
    },
    SUB_CONT: {
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: '#fff',
    },
})

export default dashboardStyles;