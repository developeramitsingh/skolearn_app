import { StyleSheet } from "react-native";
import { APP_COLORS } from "../../constant/constant";
export const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: APP_COLORS.black,
        paddingTop: 70,
        paddingHorizontal: 20,
      },
      ROW: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        //alignItems: ''
        //borderWidth: 1,
        //borderColor: 'white',
        width: '100%',
        height: '50%',
        // paddingVertical: 5,
        // paddingHorizontal: 5,
      },
      modalTitle: {
        //marginBottom: 15,
        textAlign: "center",
        fontSize: 30,
        fontWeight: 'bold',
        color: APP_COLORS.white,
      },
      TEXT_INPUT: {
        //color: '#000',
        backgroundColor: APP_COLORS.white,
        textAlign: 'center',
        fontSize: 18,
        paddingVertical: 14,
        //paddingHorizontal: 5,
        borderRadius: 20,
        marginBottom: '8%',
        //backgroundColor: APP_COLORS.grey,
        width: '100%',
      },

      BTN: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 20,
        backgroundColor: APP_COLORS.yellow,
        width: '100%',
    },
});