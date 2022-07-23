import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const testStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLORS.grey,
        paddingHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 10,
    },
    HEADING: {
        fontWeight: 'bold',
        fontSize: 24,
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    LABEL_TEXT: {
        fontWeight: 'bold',
        fontSize: 18,
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    QUES_TEXT: {
        fontSize: 24,
        color: APP_COLORS.white,
    },
    OPTION_CONT: {
        marginTop: 15,
    },
    NAVIGATION_CONT: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        //alignItems: ''
        paddingVertical: 5,
        //paddingHorizontal: 25,
    },
    NAV_BTN: {
        backgroundColor: APP_COLORS.blueGreen,
        paddingHorizontal: 10,
        borderRadius: 5,
    }
});