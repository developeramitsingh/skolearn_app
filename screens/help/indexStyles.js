import {StyleSheet} from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';

export const indexStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: APP_COLORS.black,
    },
    ROW: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ROW_LEATHER_BOARD: {
        ...COMMON_STYLES.ROW,
        backgroundColor: APP_COLORS.white,
        marginHorizontal: 5,
        borderRadius: 5,
        marginVertical: 5,
    },
    BOARD_ROW: {
        flexDirection: 'row',
    },
   
    TAB_BTN: {
        backgroundColor: APP_COLORS.white,
        //paddingHorizontal: 20,
        paddingVertical: 10,
        width: '50%',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    TAB_BTN_TEXT: {
        color: APP_COLORS.black,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    TAB_BTN_ACTIVE: {
        backgroundColor: APP_COLORS.yellow
    },
    TAB_BTN_TEXT_ACTIVE: {
        color: APP_COLORS.black,
    },
});