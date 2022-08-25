import {StyleSheet} from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const walletStyles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        backgroundColor: APP_COLORS.light_grey,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 10,
    },
    CARD: {
        backgroundColor: APP_COLORS.white,
        flex: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        marginVertical: 5,
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
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