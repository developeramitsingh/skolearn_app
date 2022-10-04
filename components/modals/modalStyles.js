import { StyleSheet } from "react-native";
import { APP_COLORS } from "../../constant/constant";
export const modalStyles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: APP_COLORS.appThemeColor,
        paddingTop: 70,
        paddingHorizontal: 20,
      },
      CONT_CENTER: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: APP_COLORS.appThemeColor,
        paddingHorizontal: 20,
      },
      ROW_SPREAD: {
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
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
        marginVertical: 5,
      },
      modalTitle: {
        //marginBottom: 15,
        textAlign: "center",
        fontSize: 30,
        color: APP_COLORS.white,
        marginBottom: 20,
      },
      TEXT_INPUT: {
        //color: '#000',
        backgroundColor: APP_COLORS.white,
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
        //paddingHorizontal: 5,
        borderRadius: 20,
        //marginBottom: '8%',
        //backgroundColor: APP_COLORS.grey,
        width: '100%',
      },
      TEXT_INPUT_LEFT: {
        //color: '#000',
        backgroundColor: APP_COLORS.white,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        //marginBottom: '8%',
        //backgroundColor: APP_COLORS.grey,
        //width: '100%',
      },

      BTN: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 20,
        backgroundColor: APP_COLORS.yellow,
        width: '100%',
      },
      MULTI_TEXT: {
        backgroundColor: 'white', minHeight: 100, maxHeight: 300, borderRadius: 10,
      },
      IMAGE: {
        width: 100,
        height: 80,
      },
      IMG_UPLOAD_PLACE: {
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 5,
        borderColor: APP_COLORS.grey,
        justifyContent: 'center',
        alignItems: 'center',
      }
});