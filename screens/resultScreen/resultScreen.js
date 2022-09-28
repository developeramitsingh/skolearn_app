import { SafeAreaView, View, Text, Pressable, BackHandler, Alert } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {useEffect, useRef, useState} from  'react';
import * as Constant from '../../constant/constant';
import {resultScreenStyles} from './resultScreenStyles';

import LeaderBoard from '../../components/leaderBoard/leaderBoard';
import BackBtn from "../../components/backBtn/backBtn";
import { enrolledTestsService, testService } from "../../services";
import Loader from '../../components/loader/loader';
import { getFromStorage, saveToStorage } from "../../utils/utils";
import { LANGUAGES_DATA } from '../../constant/language';
import { setCurrentLanguage } from '../../common/functions/commonHelper';

const ResultScreen = ({navigation, route }) => {
    const [testData, setTestData] = useState(null);
    const [leaderBoardData, setLeaderBoardData] = useState(null);
    const [scholarShipBreakUp, setBreakUpData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const backHandler = useRef();
    const [lang, setLang] = useState();

    const getTestByTestId = async () => {
        try {
            const test = await testService.getTestById(route?.params?.testId);

            console.info({ data: test.data})
            if (test.data) {
                setTestData(test.data);
            }

            return test.data;
            
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
            console.error(`error in getLeaderBoardData`);
        }
    }

    const getBreakUpData = async () => {
        try {
            const breakupData = await testService.getScholarhipBreakUpByTestId(route?.params?.testId);

            console.info({ data: breakupData.data})
            if (breakupData.data) {
                setBreakUpData(breakupData.data);
            }
            
        } catch (err) {
            console.error(`error in getBreakUpData`);
        }
    }

    const fetchInitialData = async () => {
        setLoading(true);
        const data = await Promise.all([getTestByTestId(), getLeaderBoardData(), getBreakUpData()]);
        setLoading(false);
        const test = data?.[0];
        //check for initial alerts for user
        checkForInitAlert(test);
    }

    const checkForInitAlert = async (test) => {
        try {
            if (test.testType === Constant.TEST_TYPES.LIVE) {
                const alertRead = await getFromStorage(Constant.STORAGE_KEYS.ALERT_READ_CACHE);
                const savedAlertTestIdFound = alertRead?.[test?._id];
    
                if (!test?.isResultDeclared) {
                    if (!savedAlertTestIdFound?.readFlagNotDeclared) {
                        Alert.alert('Result Info', 'Result is not declared yet.', [
                            {
                                text: 'Do not show me again', onPress: () => {
                                    saveToStorage(Constant.STORAGE_KEYS.ALERT_READ_CACHE, { [test._id]: { readFlagNotDeclared: true } });
                                },
                            },
                            {
                                cancelable: true,
                                onDismiss: () => {},
                            }
                        ]);
                    }
                } else {
                    if (!savedAlertTestIdFound?.readFlagDeclared) {
                        Alert.alert('Result Info', 'Result has been declared!', [
                            {
                                text: 'Do not show me again', onPress: () => {
                                    saveToStorage(Constant.STORAGE_KEYS.ALERT_READ_CACHE, { [test._id]: { readFlagDeclared: true  } });
                                },
                            },
                            {
                                cancelable: true,
                                onDismiss: () => {},
                            }
                        ]);
                    }
                }
            }
        } catch(err) {
            console.error(`error in checkForInitAlert: ${err}`);
        }
    }

    useEffect(() => {
        setCurrentLanguage(setLang);
        const backAction = () => {
            console.info(`backAction called in result screen`);
            navigation.navigate(Constant.ROUTES.DASHBOARD);
            return true;
          };
      
          backHandler.current = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.current?.remove();
    }, [])

    useEffect(()=> {
        if (route?.params?.testId && (!testData || !leaderBoardData)) {
            fetchInitialData();    
        }
        
        return () => backHandler.current?.remove();
    }, [route?.params?.testId]);

    const getSavedTestQusAns = async () => {
        try {
            const enrolledId = route?.params?.enrolledId;

            console.info('getSavedTestQusAns called', { enrolledId });

            const testQuesData = await enrolledTestsService.getEnrolledQuesByEnrolledId(enrolledId);

            console.info({dataTEs: testQuesData.data});
            return testQuesData?.data;
        } catch(err) {
            console.error(`error in getSavedTestQusAns: ${err}`);
        }
    }

    const handlePress = async ()=>{
        setLoading(true);
        const savedTestData = await getSavedTestQusAns();
        setLoading(false);

        if (savedTestData) {
            const testQues = savedTestData;
            
            navigation.navigate(Constant.ROUTES.TEST, { previewMode: true, testQues, testId: testData?._id,  });
        }
    }

    return (
        <SafeAreaView style={resultScreenStyles.CONTAINER}>
            <Loader isLoading={isLoading}/>
            <BackBtn navigation={navigation} routeToGo={Constant.ROUTES.DASHBOARD}/>
            <View style={resultScreenStyles.ROW}>
                {
                    testData?.testType !== Constant.TEST_TYPES.PRACTICE 
                        ?   <>
                                <Text style={resultScreenStyles.LABEL_TEXT}>{LANGUAGES_DATA[lang]?.RESULT_SCREEN?.STUDENTS_JOINED}: <Text>{(testData?.userEnrolled || '') + '/'} {testData?.userSeats || ''}</Text>
                                </Text>
                                <Text style={resultScreenStyles.LABEL_TEXT}>{LANGUAGES_DATA[lang]?.RESULT_SCREEN?.TEST_FEE}: <Text>{testData?.entryFee || ''}</Text>
                                </Text>
                            </>
                        :   <Text style={resultScreenStyles.LABEL_TEXT}>{LANGUAGES_DATA[lang]?.RESULT_SCREEN?.STUDENTS_JOINED}: <Text>{(testData?.userEnrolled || '')}</Text>
                            </Text>
                }
                
            </View>

            <View style={resultScreenStyles.ROW}>
                <Text style ={resultScreenStyles.HEADING}>{testData?.testName || ''}</Text>
            </View>

            <Pressable elevation={3} onPress = {handlePress} style={COMMON_STYLES.BTN_1}>
                <Text style={COMMON_STYLES.BTN_TEXT}>{LANGUAGES_DATA[lang]?.RESULT_SCREEN?.VIEW_SOLUTION}</Text>
            </Pressable>

            <LeaderBoard leaderBoardData={leaderBoardData} scholarShipBreakUp={scholarShipBreakUp} enrolledId={route?.params?.enrolledId} testType={testData?.testType} LANGUAGES_DATA={LANGUAGES_DATA[lang]}/>
        </SafeAreaView>
    )
}

export default ResultScreen;