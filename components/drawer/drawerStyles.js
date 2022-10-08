
import { StyleSheet } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';

export const drawerStyles = StyleSheet.create({
    DRAWER_CONT: {
        flex: 1,
        backgroundColor: APP_COLORS.lightGrey2,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        padding: 20,
    },

    TAB_TEXT: {
        ...COMMON_STYLES.BTN_TEXT, 
        paddingVertical: 5,
    },
    TAB_ICON_WIDTH: {
        width: 30
    }
})