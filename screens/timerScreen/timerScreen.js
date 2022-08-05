import { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';
import { timerScreenStyles } from './timerScreenStyles';

const TimerScreen = ({navigation, route }) => {
    const [time, setTime] = useState(2);

    const timerToStartTest = () => {
        const timer = setInterval(()=>{
            if (time === 0) {
                clearInterval(timer);
                navigation.navigate(Constant.ROUTES.TEST, { myTestId: route?.params?.testId })
            } else {
                setTime((t) => t - 1);
            }
        }, 1000);

        return timer;
    }

    useEffect(()=> {
        const timerStart = timerToStartTest();

        return(()=> {
            clearTimeout(timerStart);
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