import { StyleSheet } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';

export const leaderBoardStyles = StyleSheet.create({
    LEATHER_BOARD_CONT_LIGHT: {
        marginTop: 10,
        flex: 1,
        backgroundColor: APP_COLORS.white,
        borderRadius: 10,
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
    HEADING: {
        fontWeight: 'bold',
        fontSize: 20,
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    LABEL_TEXT: {
        fontWeight: 'bold',
        fontSize: 10,
        color: APP_COLORS.grey,
        textAlign: 'center',
    },
    TAB_BTN: {
        backgroundColor: APP_COLORS.white,
        //paddingHorizontal: 20,
        paddingVertical: 10,
        width: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    TAB_BTN_TEXT: {
        color: APP_COLORS.black,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    TAB_BTN_ACTIVE: {
        borderBottomColor: APP_COLORS.appThemeColor,
        borderBottomWidth: 4,
        backgroundColor: APP_COLORS.yellow
    },
    TAB_BTN_TEXT_ACTIVE: {
        color: APP_COLORS.appThemeColor,
    },
    BODY_LEFT_COL: {
        justifyContent: 'space-between',
        width: '70%',
        flexDirection: 'row',
    },
    BODY_RIGHT_COL: {
        justifyContent: 'flex-end',
        width: '30%',
        flexDirection: 'row',
    },
});