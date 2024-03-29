import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../../constant/constant';

const testListsStyles = StyleSheet.create({
    HEADING: {
        fontSize: 14,
        //fontWeight: 'bold',
        color: APP_COLORS.appBlue,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
    },
    HEADING_WHITE: {
        fontSize: 14,
        //fontWeight: 'bold',
        color: APP_COLORS.white,
        paddingTop: 5,
        paddingBottom: 15,
        borderRadius: 20,
        textAlign: 'center',
    },
    BACK_PANEL: {
        flex: 1, 
        backgroundColor: APP_COLORS.white, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        paddingTop: 5,
    }
})

export default testListsStyles;