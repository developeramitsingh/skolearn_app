import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const scrollTabStyles = StyleSheet.create({
    SUB_CONT: {
        // borderWidth: 1,
        // borderColor: 'red',
        //backgroundColor: APP_COLORS.backPanelColor,
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingHorizontal: 10,
        marginHorizontal: 15,
        maxHeight: '4%',
        marginVertical: 10,
    },
    BODY_TABS:  {
        // borderWidth: 0.5,
        // borderColor: APP_COLORS.white,
        borderRadius: 15,
        //paddingVertical: 8,
        //paddingHorizontal: 15,
        //paddingHorizontal: 15,
        minWidth: 80,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: APP_COLORS.voilet,
    },
    BODY_TABS_TEXT:  {
        color: APP_COLORS.light_grey,
        fontSize: 10,
        textAlign: 'center',
    },
})