import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constant/constant';

export const testStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLORS.appBlue,
        paddingHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 10,
    },
    HEADING: {
        fontWeight: 'bold',
        fontSize: 24,
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    LABEL_TEXT: {
        fontSize: 14,
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    QUES_TEXT: {
        fontSize: 14,
        width: '100%',
        color: APP_COLORS.black,
    },
    OPTION_CONT: {
        marginTop: 15,
    },
    NAVIGATION_CONT: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        //alignItems: ''
        paddingVertical: 5,
        //paddingHorizontal: 25,
    },
    NAV_BTN: {
        backgroundColor: APP_COLORS.blueGreen,
        paddingHorizontal: 10,
        borderRadius: 5,
    },

    STATUS_BAR: {
      backgroundColor: APP_COLORS.blueGreen,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    QUES_CONT: {
      flex: 1,
      backgroundColor: APP_COLORS.backPanelColor,
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    quesIdxCircle: {
      borderRadius: 200,
      backgroundColor: APP_COLORS.blueGreen,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    quesIdxCircleTxt: {
      color: APP_COLORS.white,
      fontSize: 14,
    },

    /************************* Camera styles  *********************/
    cameraContainer: {
        //...StyleSheet.absoluteFillObject,
        width: 10,
        height: 10,
        backfaceVisibility: 'hidden',
        opacity: 0,
      },
      control: {
        position: "absolute",
        flexDirection: "row",
        bottom: 38,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      },
      recordTitle: {
        fontSize: 14,
        color: "#ffffff",
        textAlign: "center",
      },
      recordDot: {
        borderRadius: 3,
        height: 6,
        width: 6,
        backgroundColor: "#ff0000",
        marginHorizontal: 5,
      },
      text: {
        color: "#fff",
      },
});