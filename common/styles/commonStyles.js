import {APP_COLORS} from '../../constant/constant';
export const COMMON_STYLES = {
    CONTAINER: {
        backgroundColor: APP_COLORS.black,
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 15,
    },
    TEXT_INPUT: {
        color: '#000',
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 40,
        marginTop: '4%',
        marginBottom: '4%',
    },
    BTN_1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4%',
        marginBottom: '4%',
        paddingVertical: 17,
        borderRadius: 40,
        backgroundColor: APP_COLORS.yellow,
    },

    BTN_TEXT: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: APP_COLORS.black,
    },

    TITLE_TEXT: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%',
    },

    BODY_TEXT:  {
        color: APP_COLORS.white,
        fontSize: 12,
    },
    BODY_TITLE:  {
        color: APP_COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    BODY_TABS:  {
        borderWidth: 1,
        borderColor: APP_COLORS.grey,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    ACTIVE: {
        backgroundColor: APP_COLORS.yellow,
    },
    ACTIVE_TEXT: {
        color: APP_COLORS.black,
    },
    BODY_TABS_TEXT:  {
        color: APP_COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    LINK_TEXT: {
        color: APP_COLORS.blue,
        fontWeight: 'bold',
    },
    CENTER: {
        textAlign: 'center',
    },
    SEPARATOR: {
        height: 1,
        backgroundColor: APP_COLORS.white,
    }
}