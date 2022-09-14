import { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';
import { timerScreenStyles } from './timerScreenStyles';
import {testService} from '../../services/index';

const TimerScreen = ({navigation, route }) => {
    const [time, setTime] = useState(5);
    const [testQues, setTestQues] = useState([]);

    const timerToStartTest = () => {
        const timer = setInterval(()=>{
            if (time === 0) {
                clearInterval(timer);
                navigation.navigate(Constant.ROUTES.TEST, { testQues, testId: route?.params?.data?.testId })
            } else {
                setTime((t) => t - 1);
            }
        }, 1000);

        return timer;
    }

    const generateTestQuestions = async () => {
        try {
            console.info('generateTestQuestions called');
            const query = `{ "language": "${route?.params?.data?.lang}", "testId": "${route?.params?.data?.testId}" }`;
            const testQuesData = await testService.generateTestQues(query);

            if (testQuesData?.data?.data) {
                setTestQues(testQuesData?.data?.data);
            }
        } catch(err) {
            console.error(`error in generateTestQuestions: ${err}`);
        }
    }

    useEffect(()=> {
        if (route?.params?.data && !testQues?.length) {
            generateTestQuestions();
        }
        const timerStart = timerToStartTest();

        return(()=> {
            clearTimeout(timerStart);
        })
    }, [time, route?.params?.data]);

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