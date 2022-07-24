import {StyleSheet} from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const walletStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
    },
    CARD: {
        backgroundColor: APP_COLORS.grey,
        flex: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    CARD_TEXT: {
        color: APP_COLORS.white,
        fontSize: 12,
        marginVertical: 2,
    },
    LEFT_COL: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    RIGHT_COL: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});