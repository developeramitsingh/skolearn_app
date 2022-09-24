import { StyleSheet } from "react-native";
import {APP_COLORS} from '../../constant/constant';

export const profileStyles = StyleSheet.create({
    CONTAINER: {
        backgroundColor: APP_COLORS.appBlue,
        flex: 1,
        paddingHorizontal: 20,
    },
    SUB_CONT: {
        flex: 1,
        backgroundColor: APP_COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        justifyContent: 'space-between',
        marginTop: 10

    },
    PROFILE_IMG: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderColor: APP_COLORS.white,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white',
    },
    ROW_CENTER: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    BOX: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: APP_COLORS.lightGrey2,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        // borderBottomColor: APP_COLORS.light_grey,
        // borderBottomWidth: 1,
    },
    HEADING: {
        fontSize: 14,
        padding: 5,
        fontWeight: 'bold',
    },
    BODY_TEXT: {
        fontSize: 10,
        color: APP_COLORS.appBlue
    },
    REFER_BOX: {
        backgroundColor: APP_COLORS.lightGrey2,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
    }
    
}); 