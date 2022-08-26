import {StyleSheet} from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const walletStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        backgroundColor: APP_COLORS.white,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 10,
    },
    CARD: {
        backgroundColor: APP_COLORS.white,
        borderBottomWidth: 0.5,
        borderColor: APP_COLORS.light_grey,
        flex: 1,
        borderRadius: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    CARD_TEXT: {
        color: APP_COLORS.appBlue,
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