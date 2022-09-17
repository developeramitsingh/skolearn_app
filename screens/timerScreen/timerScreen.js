import { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, BackHandler } from "react-native";
import * as Constant from '../../constant/constant';
import { timerScreenStyles } from './timerScreenStyles';

const TimerScreen = ({navigation, route }) => {
    const [time, setTime] = useState(5);
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
                <Text style={timerScreenStyles.BODY_TEXT}>Test is going to start be ready</Text>
            </View>

            <View style={timerScreenStyles.ROW}>
                <Text style={timerScreenStyles.BODY_TEXT}>Answer the question fast</Text>
                <Text style={timerScreenStyles.BODY_TEXT}>as response timing will be used for ranking</Text>
            </View>
        </SafeAreaView>
    )
};

export default TimerScreen;