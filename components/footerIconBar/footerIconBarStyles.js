import { StyleSheet } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';

export const footerIconBarStyles = StyleSheet.create({
    TABS_BTN: {
        alignItems: 'center',
        paddingHorizontal: '8%',
    },
    FOOTER_BAR: {
        backgroundColor: APP_COLORS.white,
        ...COMMON_STYLES.BOX_SHADOW,
    }
})