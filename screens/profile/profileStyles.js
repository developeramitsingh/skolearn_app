import { StyleSheet } from "react-native";
import {APP_COLORS} from '../../constant/constant';

export const profileStyles = StyleSheet.create({
    CONTAINER: {
        backgroundColor: APP_COLORS.black,
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    PROFILE_IMG: {
        width: 100,
        height: 100,
        borderRadius: 50,
        //backgroundColor: 'white',
    },
    ROW_CENTER: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    BOX: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: APP_COLORS.grey,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
    }
}); 