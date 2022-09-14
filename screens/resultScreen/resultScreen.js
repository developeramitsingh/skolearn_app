import { SafeAreaView, View, Text, TouchableHighlight, BackHandler } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {useEffect, useState} from  'react';
import * as Constant from '../../constant/constant';
import {resultScreenStyles} from './resultScreenStyles';

import LeaderBoard from '../../components/leaderBoard/leaderBoard';
import BackBtn from "../../components/backBtn/backBtn";
import { enrolledTestsService, testService } from "../../services";
import Loader from '../../components/loader/loader';

const ResultScreen = ({navigation, route }) => {
    const [testData, setTestData] = useState(null);
    const [leaderBoardData, setLeaderBoardData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const getTestByTestId = async () => {
        try {
            const test = await testService.getTestById(route?.params?.testId);

            console.info({ data: test.data})
            if (test.data) {
                setTestData(test.data);
            }
            
        } catch (err) {
            console.error(`error in getTestByTestId`);
        }
    }

    const getLeaderBoardData = async () => {
        try {
            const enrolledTestData = await enrolledTestsService.getEnrolledTestByTestId(route?.params?.testId);

            console.info({ data: enrolledTestData.data})
            if (enrolledTestData.data) {
                setLeaderBoardData(enrolledTestData.data);
            }
            
        } catch (err) {
            console.error(`error in getTestByTestId`);
        }
    }

    const fetchInitialData = async () => {
        setLoading(true);
        await Promise.all([getTestByTestId(), getLeaderBoardData()]);
        setLoading(false);
    }

    useEffect(()=> {
        if (route?.params?.testId && (!testData || !leaderBoardData)) {
            fetchInitialData();    
        }
        
        const backAction = () => {
            console.info(`backAction called in result screen`);
            navigation.navigate(Constant.ROUTES.DASHBOARD);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
    }, [route?.params?.testId]);

    const handlePress = ()=>{
        navigation.navigate(Constant.ROUTES.TEST, { previewMode: true, istestId: testData?._id });
    }

    return (
        <SafeAreaView style={resultScreenStyles.CONTAINER}>
            <Loader isLoading={isLoading}/>
            <BackBtn navigation={navigation} routeToGo={Constant.ROUTES.DASHBOARD}/>
            <View style={resultScreenStyles.ROW}>
                <Text style={resultScreenStyles.LABEL_TEXT}>Participant Joined: <Text>{testData?.userEnrolled + '/'} {testData?.userSeats}</Text>
                </Text>
                <Text style={resultScreenStyles.LABEL_TEXT}>Test Fee: <Text>{testData?.entryFee}</Text>
                </Text>
            </View>

            <View style={resultScreenStyles.ROW}>
                <Text style ={resultScreenStyles.HEADING}>{testData?.testName}</Text>
            </View>

            <TouchableHighlight onPress = {handlePress} style={COMMON_STYLES.BTN_1}>
                <Text style={COMMON_STYLES.BTN_TEXT}>View Solution</Text>
            </TouchableHighlight>

            <LeaderBoard dataList={leaderBoardData} userId ={}/>
        </SafeAreaView>
    )
}

export default ResultScreen;