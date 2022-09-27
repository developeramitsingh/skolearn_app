import { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, BackHandler } from "react-native";
import * as Constant from '../../constant/constant';
import { timerScreenStyles } from './timerScreenStyles';
import { LANGUAGES_DATA } from '../../constant/language';
import { setCurrentLanguage } from '../../common/functions/commonHelper';

const TimerScreen = ({navigation, route }) => {
    const [time, setTime] = useState(5);
    const [lang, setLang] = useState();
    const backHandler = useRef();

    const timerToStartTest = () => {
        const timer = setInterval(()=>{
            if (time === 0) {
                clearInterval(timer);
                navigation.navigate(Constant.ROUTES.TEST, { 
                    testQues: route?.params?.testQusData,
                    testId: route?.params?.testId,
                    test: route?.params?.test,
                });
            } else {
                setTime((t) => t - 1);
            }
        }, 1000);

        return timer;
    }

    useEffect(() => {
        setCurrentLanguage(setLang);

        const backAction = () => {
          console.info(`backAction called in timer screen`);
          return false;
        };

        backHandler.current = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => { 
          backHandler.current.remove();
        };
  }, []);

    useEffect(()=> {
        const timerStart = timerToStartTest();

        return(()=> {
            console.info(`cleaning function in timer screen`);
            clearTimeout(timerStart);

            backHandler.current.remove();
        })
    }, [time]);

    return(
        <SafeAreaView style={timerScreenStyles.CONTAINER_LIGHT}>
            <View style={timerScreenStyles.TIMER_CONT}>
                <Text style={timerScreenStyles.TIMER_LABEL}>{time}</Text>
            </View>

            <View style={timerScreenStyles.ROW}>
                <Text style={timerScreenStyles.BODY_TEXT}>{LANGUAGES_DATA?.[lang]?.TIMER_SCREEN?.HEADING}</Text>
            </View>

            <View style={timerScreenStyles.ROW}>
                <Text style={timerScreenStyles.BODY_TEXT}>{LANGUAGES_DATA?.[lang]?.TIMER_SCREEN?.BODY_TXT}</Text>
                <Text style={timerScreenStyles.BODY_TEXT}>{LANGUAGES_DATA?.[lang]?.TIMER_SCREEN?.BODY_TXT_2}</Text>
            </View>
        </SafeAreaView>
    )
};

export default TimerScreen;