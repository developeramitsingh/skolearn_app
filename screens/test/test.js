import { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableHighlight, ScrollView } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { testStyles } from './testStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES, TEST_TYPES, TEST_TIME_LIMIT, STORAGE_KEYS, } from "../../constant/constant";
import { enrolledTestsService, userRecordingsService } from '../../services/index';

import { Camera } from "expo-camera";
import { appendToSavedStorage } from "../../utils/utils";

const Test = ({navigation, route}) => {
    let timeTimer = useRef();
    let cameraRef = useRef();
    let removeListener = useRef();

    const [time, setTime] = useState(TEST_TIME_LIMIT);
    const [state, setState] = useState({
        quesIdx: 0,
        userAnswered: [],
        optionSelected: false,
        userScore: [],
        previewMode: route?.params?.previewMode || false,
        timeFinished: false,
    });

    const [testQuesData, setTestQuesData] = useState([]);
    //const [camera, setCameraRef] = useState(useRef());
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMicPermission, setHasMicPermission] = useState(null);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const [isCameraVisible, setCameraVisible ] = useState(true);

    const saveVideoOnServer = async (uri) => {
        // Here uri means the url of the video you captured
        const form = new FormData();
        form.append("File", {
          name: `UserRecording_testId:${route?.params?.testId}.mp4`,
          uri: uri,
          type: "video/mp4",
        });

        form.append('testId', route?.params?.testId);

        userRecordingsService.createUserRecording(form)
            .then(data => {
                console.debug(`done saving video`);
            })
            .catch(err => {
                console.error('error in test saving video to server', err);
            })
    };

    const recordVideo = async () => {
        if (cameraRef?.current && !route?.params?.previewMode) {
            try {
            console.info('starting recording...');
            const videoRecordPromise = cameraRef.current?.recordAsync({
                quality: Camera.Constants.VideoQuality["4:3"],
            });
            console.info('starting recording promise...', videoRecordPromise);
            if (videoRecordPromise) {
                setIsVideoRecording(true);
                console.info('starting recording promise...2');
                const data = await videoRecordPromise;
                console.info('Recorded!');
                console.info({data});
                const source = data.uri;
                if (source) {
                    console.log("video source hello", source);
                    saveVideoOnServer(source);
                    setVideoSource(source);
                }
            }
            } catch (error) {
            console.error(`recordVideo func error: ${error}`);
            }
        }
    };
    const stopVideoRecording = () => {
        if (cameraRef.current) {
            setIsVideoRecording(false);
            setCameraVisible(false);
            cameraRef.current?.stopRecording();
        }
    };

    const renderVideoRecordIndicator = () => (
        <View style={COMMON_STYLES.ROW}>
            <View style={testStyles.recordDot} />
            <Text style={testStyles.recordTitle}>{"Monitoring Activity..."}</Text>
        </View>
    );    

    const startTest = async () => {
        let isCameraPerm;
        let isMicPerm;
        if ((!hasCameraPermission || !hasMicPermission) && !route?.params?.previewMode) {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const micStatus = await Camera.requestMicrophonePermissionsAsync();

            isCameraPerm = cameraStatus.status === "granted";
            isMicPerm = micStatus.status === "granted";

            setHasCameraPermission(isCameraPerm);
            setHasMicPermission(isMicPerm);
        }

        if ((hasCameraPermission && hasMicPermission) || (isMicPerm && isCameraPerm) || (route?.params?.previewMode)) {
            if (!route?.params?.previewMode) {
                timeTimer.current = timeLimitTimer();

                //intialize userAnswer with empty response
                if (!state.userAnswered?.length && testQuesData?.length) {
                    setState(prev => {
                        return { 
                            ...prev, 
                            userAnswered: [
                                ...prev.userAnswered, 
                                { 
                                    quesId: testQuesData?.[0]?._id, 
                                    optionSelected: null, 
                                    timeSecondsLeft: 0,
                                    userScore: 0,
                                }
                            ]
                        }
                    });
                }
            } else {
                const userAnswered = route.params.testQues?.map(item => {
                    return {
                        quesId: item?._id,
                        optionSelected: item?.userAns?.optionSelected?.[0],
                        correctAnswer: item?.answers?.[0],
                        timeSecondsLeft: item?.userAns?.timeSecondsLeft,
                        userScore: item?.userAns?.userScore
                    }
                });

                setState(prev => {
                    return { 
                        ...prev, 
                        previewMode: route?.params?.previewMode, 
                        //userAnswered: [{ quesId: 1, optionSelected: 2}, { quesId: 2, optionSelected: 3}] 
                        userAnswered, 
                        // optionSelected: userAnswered?.[0]?.optionSelected || null,
                        // correctAnswer: userAnswered?.[0]?.correctAnswer || null,
                    }
                })
            }
        }
    }

    useEffect(() => {
        console.info('useEffect', { timeFinished: state.timeFinished });

        console.info({ removeListener: removeListener.current });

        if (!removeListener.current) {
            removeListener.current = navigation.addListener('beforeRemove', (e) => {
                console.info('beforeRemove', { timeFinished: state.timeFinished });
                if (state.timeFinished || state.previewMode) {
                  console.info(`done --exit`, e.data.action);
                  //if test is finished then only allow screen exit else not
                  navigation.dispatch(e.data.action);

                  return;
                }
    
                 // Prevent default behavior of leaving the screen
                e.preventDefault();
            });
        }

        return () => {
            removeListener.current = null;
        }

    }, [navigation, state.timeFinished, state.previewMode]);

    useEffect(()=> {
        if (route?.params?.testQues) {
            if(!testQuesData?.length) {
                setTestQuesData(route.params.testQues);
            }

            startTest();
        }

        return (() => {
            clearInterval(timeTimer?.current);
        })
    }, [state.quesIdx, state.userScore, time, route?.params?.previewMode, navigation, state.timeFinished, route?.params?.testQues ])

    const timeLimitTimer = () => {
        let timeTimerObj = setInterval(() => {
            if (time > 0) {
                setTime((prev) => { return (prev - 1) })
            } else {
                handleChangeQues('next');
            }
        }, 1000);

        return timeTimerObj;
    }

    const handleChangeQues = (type) => {
        const isPreviewMode = route?.params?.previewMode;
        if (type === 'next') {
            if (state.quesIdx < testQuesData?.length - 1) {

                setState(prev => {
                    let dataToUpdate = {};
                    if(!isPreviewMode) {
                        //intialize userAnswer with empty response
                        dataToUpdate = {
                            optionSelected: null,
                            userAnswered: [
                                ...prev.userAnswered, 
                                { 
                                    quesId: testQuesData[prev.quesIdx + 1]?._id, 
                                    optionSelected: null, 
                                    timeSecondsLeft: 0,
                                    userScore: 0
                                }
                            ]
                        }
                    }

                    return { 
                        ...prev,  
                        quesIdx: prev.quesIdx + 1,
                        ...dataToUpdate,
                    }
                });

                //reset the time for next question
                setTime(TEST_TIME_LIMIT);
            } else {
                finishTest();
            }
        } else if (type === 'prev') {
            if (state.quesIdx > 0) {
                setState(prev => {
                    return { 
                        ...prev,  
                        quesIdx: prev.quesIdx - 1,
                    }
                })

                //reset the time for next question
                setTime(TEST_TIME_LIMIT);
            }
        }
    }

    //handle option selected
    const handlePress = (optionId) => {
        const userScore = calculateUserScore(time, optionId);
        //set used answers
        setState(prev=> {
            return { 
                ...prev, 
                userScore: [...prev.userScore, userScore], 
                optionSelected: optionId, 
                userAnswered: [
                    //remove duplicate initaliazed object
                    ...prev.userAnswered.filter(ans => ans.quesId !== testQuesData[state.quesIdx]._id), 
                    { 
                        quesId: testQuesData[state.quesIdx]._id, 
                        optionSelected: optionId, 
                        timeSecondsLeft: time,
                        userScore: userScore
                    }
                ] 
            };
        });

        //start recording
        if (
            hasCameraPermission && 
            hasMicPermission && 
            !isVideoRecording && 
            !route?.params?.previewMode
        ) {
            recordVideo();
        }
        
    }

    const calculateUserScore = (timeLimit, optionId) => {
        const currentQues = testQuesData[state.quesIdx];
        const answers = currentQues['answers'];

        let userScore = 0;
        if (answers?.includes(+optionId)) {
            userScore = timeLimit * 10;
        }

        return userScore;
    }

    const updateScoreAndUserAnswers = async () => {
        const totalScore = state?.userScore?.reduce((accum, elem)=> {
             return accum + elem 
        }, 0) || 0;

        const userQuesAns = {};

        console.info(`updateScoreAndUserAnsers`,  { userAnswered: state?.userAnswered });
        state?.userAnswered?.forEach(userRes => {
            if (userRes.quesId) {
                userQuesAns[userRes.quesId?.toString()] = { 
                    optionSelected: [userRes.optionSelected],
                    timeSecondsLeft: userRes.timeSecondsLeft,
                    userScore: userRes.userScore
                };
            }
        });

        const data = {
            score: totalScore,
            testId: `${route?.params?.testId}`,
            userQuesAns,
        }

        try {
            await enrolledTestsService.updateEnrolledTests(data)
        } catch (err) {
            console.error(`error while saving userResponse data in test: ${route?.params?.testId}:: ${err}`);
            //save the response as save api is failed and retry the api later
            appendToSavedStorage(STORAGE_KEYS.FAILED_TEST_RESPONSE, { [data.testId]: data });
        }
    };

    const finishTest = () => {
        setIsVideoRecording(false);
        stopVideoRecording();
        setCameraVisible(false);

        if(timeTimer.current) {
            clearInterval(timeTimer.current);
        }

        //saving the score and userAnswers
        if(state.timeFinished) {
            updateScoreAndUserAnswers();
        }
        

        setState(prev => {
            return {...prev, timeFinished: true };
        })
    }

    const updateAndCloseTest = () => {
        navigation.navigate(ROUTES.DASHBOARD, { activeTab: TEST_TYPES.MY_TEST });
    };

    const finishScreen = () => {
        return (
            <>
                <View style={{...COMMON_STYLES.ROW, justifyContent: 'center'}}>
                    <Text style={COMMON_STYLES.TITLE_TEXT}>Total Score</Text>
                </View>
                <View style={{...COMMON_STYLES.ROW, justifyContent: 'center'}}>
                    <Text style={COMMON_STYLES.TITLE_TEXT}>{state.userScore.reduce((accum, elem)=> { return accum + elem }, 0) || 0}</Text>
                </View>
                <TouchableHighlight onPress={updateAndCloseTest} style={{...COMMON_STYLES.BTN_1, marginTop: '10%'}}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>Finish</Text>
                </TouchableHighlight>
            </>
        );
    }

    if ((hasCameraPermission === null || hasMicPermission === null) && !route?.params?.previewMode) {
        return <View style={COMMON_STYLES.CONTAINER_LIGHT_ALL_CENTER}>
            <View style ={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_TITLE_BLACK}>Waiting for permission</Text>
            </View>
        </View>;
    }

    if ((hasCameraPermission === false || hasMicPermission === false) && !route?.params?.previewMode) {
        return <View style={COMMON_STYLES.CONTAINER_LIGHT_ALL_CENTER}>
            <View style ={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_TITLE_BLACK}>No Access to Camera or Mic</Text>
            </View>
        </View>;
    }

    return (
        <SafeAreaView style={{...testStyles.container, ...(state.timeFinished ? {justifyContent: 'center'} : {})}}>
            {
                state.timeFinished &&
                finishScreen()
            }
            { 
                !state.timeFinished &&
                <>
                    <View style={COMMON_STYLES.ROW}>
                        <Text style={testStyles.LABEL_TEXT}>Score: {
                            state?.userScore?.[state.quesIdx] ||
                            route?.params?.previewMode && state?.userAnswered?.[state.quesIdx]?.userScore ||
                            0
                        }</Text>
                        
                        <View style={COMMON_STYLES.ROW}> 
                            <MaterialIcons name="timer" size={28} color="white" />
                            <Text style={testStyles.LABEL_TEXT}> {
                                    route?.params?.previewMode && state?.userAnswered?.[state.quesIdx]?.timeSecondsLeft ||
                                    time ||
                                    0
                                }
                            </Text>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.ROW}>
                        <Text style={testStyles.QUES_TEXT}>
                            {testQuesData?.[state.quesIdx]?.rubric}
                        </Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator ={true} style={testStyles.OPTION_CONT}>
                        {testQuesData?.[state.quesIdx]?.options?.map((option, idx) => {
                            const isPreviewMode = route?.params?.previewMode;
                            const userAns = state?.userAnswered?.[state.quesIdx] || {};

                            const isCorrectAns = userAns.optionSelected === (idx + 1) && isPreviewMode && userAns.optionSelected === userAns.correctAnswer;

                            const isWrongAns = userAns.optionSelected === (idx + 1) && isPreviewMode && userAns.optionSelected !== userAns.correctAnswer;

                            const isUserNotAnswered = userAns.correctAnswer === (idx + 1) && isPreviewMode;

                            const isLiveTestAnswer = state.optionSelected === (idx + 1) && !isPreviewMode;

                            return (
                                <TouchableHighlight disabled={
                                    state.optionSelected || isPreviewMode ? true : false
                                    } 
                                    onPress={() => handlePress(idx + 1)} 
                                    style ={
                                        {
                                            ...COMMON_STYLES.BTN_1,
                                            ...(isCorrectAns
                                                ? COMMON_STYLES.CORRECT_ANS
                                                : isWrongAns
                                                ? COMMON_STYLES.WRONG_ANS
                                                : isUserNotAnswered
                                                ? COMMON_STYLES.USER_NOT_ANSWERED
                                                : isLiveTestAnswer
                                                ? COMMON_STYLES.DISABLED
                                                : {}
                                                )
                                        }
                                    } 
                                    id= { idx + 1 } 
                                    key= { idx + 1 }>

                                    <Text style={
                                        {
                                            ...COMMON_STYLES.BTN_TEXT,
                                            ...(isCorrectAns
                                                ? {}
                                                : isUserNotAnswered
                                                ? COMMON_STYLES.USER_NOT_ANSWERED_TEXT
                                                : state.optionSelected === (idx + 1) 
                                                ? COMMON_STYLES.DISABLED_TEXT 
                                                : {})
                                        }
                                    } 
                                    key = { idx + 1 }
                                >{option}</Text>
                                </TouchableHighlight>
                            )
                        })}
                    </ScrollView> 

                    { 
                        state.previewMode &&
                        <View style={testStyles.NAVIGATION_CONT}>
                            <TouchableHighlight disabled={state.quesIdx === 0 ? true : false} onPress={()=> handleChangeQues('prev')} style={{...testStyles.NAV_BTN, ...(state.quesIdx === 0 ? COMMON_STYLES.DISABLED_ARROW : {})}}>
                                <MaterialCommunityIcons name="arrow-left" size={38} color={APP_COLORS.white} />
                            </TouchableHighlight>

                            <TouchableHighlight disabled={state.quesIdx === testQuesData?.length - 1 ? true : false} onPress={()=> handleChangeQues('next')} style={{...testStyles.NAV_BTN, ...(state.quesIdx === testQuesData?.length - 1 ? COMMON_STYLES.DISABLED_ARROW : {})}}>
                                <MaterialCommunityIcons name="arrow-right" size={38} color={APP_COLORS.white} />
                            </TouchableHighlight>
                        </View>
                    }
                </>
            }

            {
                isVideoRecording &&
                <View style={COMMON_STYLES.ROW}>
                    {renderVideoRecordIndicator()}
                </View>
            }
                { isCameraVisible && !route?.params?.previewMode &&
                    <View style={COMMON_STYLES.ROW}>
                        <Camera
                            useCamera2Api= {true}
                            ratio="1:1"
                            ref={cameraRef}
                            style={testStyles.cameraContainer}
                            type={Camera.Constants.Type.front}
                            flashMode={Camera.Constants.FlashMode.on}
                            onMountError={(error) => {
                                console.log("cammera error", error);
                            }}
                        />
                    </View> 
                }
        </SafeAreaView>
    )
}

export default Test;