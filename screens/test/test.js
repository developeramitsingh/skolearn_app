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

            console.info({cameraStatus});
            console.info({micStatus});
            isCameraPerm = cameraStatus.status === "granted";
            isMicPerm = micStatus.status === "granted";

            setHasCameraPermission(isCameraPerm);
            setHasMicPermission(isMicPerm);
        }

        if ((hasCameraPermission && hasMicPermission) || (isMicPerm && isCameraPerm) || (route?.params?.previewMode)) {
            console.info({'insdie here: useEffedct': route?.params?.previewMode})
            if (!route?.params?.previewMode) {
                timeTimer.current = timeLimitTimer();
            } else {
                setState(prev => {
                    return {... prev, previewMode: route?.params?.previewMode, userAnswered: [{ quesId: 1, optionSelected: 2}, { quesId: 2, optionSelected: 3}] }
                })
            }
        }
    }

    useEffect(()=> {
        if (route?.params?.testQues) {
            setTestQuesData(route.params.testQues);
            startTest();
        }
        navigation.addListener('beforeRemove', (e) => {
            if (state.timeFinished || state.previewMode) {
              //if test is finished then only allow screen exit else not
              navigation.dispatch(e.data.action);
            }

             // Prevent default behavior of leaving the screen
            e.preventDefault();
        });


        return (() => {
            clearInterval(timeTimer?.current);
        })
    }, [state.quesIdx, state.userScore, time, route?.params?.previewMode, navigation, state.timeFinished ])

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
        if (type === 'next') {
            if (state.quesIdx < testQuesData?.length - 1) {
                setState(prev => {
                    return { ...prev, optionSelected: state?.userAnswered?.[state.quesIdx + 1]?.optionSelected || null, quesIdx: prev.quesIdx + 1 }
                });

                //reset the time for next question
                setTime(TEST_TIME_LIMIT);
            } else {
                finishTest();
            }
        } else if (type === 'prev') {
            if (state.quesIdx > 0) {
                setState(prev => {
                    return { ...prev, optionSelected: prev?.userAnswered?.[prev.quesIdx-1]?.optionSelected, quesIdx: prev.quesIdx - 1}
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
                    ...prev.userAnswered, 
                    { 
                        quesId: testQuesData[state.quesIdx]._id, 
                        optionSelected: optionId, 
                        timeSecondsLeft: time 
                    }
                ] };
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
        console.info({currentQues});

        const answers = currentQues['answers'];

        console.info({answers});
        console.info({optionId});

        let userScore = 0;
        if (answers?.includes(+optionId)) {
            userScore = timeLimit * 10;
        }

        console.info({userScore});

        return userScore;
    }

    const updateScoreAndUserAnswers = async () => {
        const score = state?.userScore?.reduce((accum, elem)=> {
             return accum + elem 
        }, 0) || 0;

        const userQuesAns = {};
        state?.userAnswered.forEach(userRes => {
            userQuesAns[userRes.quesId?.toString()] = { 
                optionSelected: [userRes.optionSelected],
                timeSecondsLeft: userRes.timeSecondsLeft,
            };
        });

        const data = {
            score,
            testId: `${route?.params?.testId}`,
            userQuesAns,
        }

        console.info({ data });

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
        clearInterval(timeTimer.current);
        //saving the score and userAnswers
        updateScoreAndUserAnswers();
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

    if (hasCameraPermission === null || hasMicPermission === null) {
        return <View style={COMMON_STYLES.CONTAINER_LIGHT_ALL_CENTER}>
            <View style ={COMMON_STYLES.ROW_CENTER}>
                <Text style={COMMON_STYLES.BODY_TITLE_BLACK}>Waiting for permission</Text>
            </View>
        </View>;
    }

    if (hasCameraPermission === false || hasMicPermission === false) {
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
                        <Text style={testStyles.LABEL_TEXT}>Score: {state.userScore?.[state.quesIdx]}</Text>
                        <View style={COMMON_STYLES.ROW}> 
                            <MaterialIcons name="timer" size={28} color="white" />
                            <Text style={testStyles.LABEL_TEXT}>{time?.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.ROW}>
                        <Text style={testStyles.QUES_TEXT}>
                            {testQuesData?.[state.quesIdx]?.rubric}
                        </Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator ={true} style={testStyles.OPTION_CONT}>
                        {testQuesData?.[state.quesIdx]?.options?.map((option, idx) => {
                            return (
                                <TouchableHighlight disabled={state.optionSelected ? true : false} onPress={() => handlePress(idx + 1)} style ={{...COMMON_STYLES.BTN_1, ...(state.optionSelected === (idx+1) ? COMMON_STYLES.DISABLED : {})}} id={idx+1} key={idx+1}>
                                    <Text style={{...COMMON_STYLES.BTN_TEXT, ...(state.optionSelected === (idx + 1) ? COMMON_STYLES.DISABLED_TEXT : {})}} key={idx+1}>{option}</Text>
                                </TouchableHighlight>
                            )
                        })}
                    </ScrollView> 

                    { 
                        state.previewMode &&
                        <View style={testStyles.NAVIGATION_CONT}>
                            <TouchableHighlight disabled={state.quesIdx === 0 ? true : false} onPress={()=> handleChangeQues('prev')} style={{...testStyles.NAV_BTN, ...(state.quesIdx === 0 ? COMMON_STYLES.DISABLED : {})}}>
                                <MaterialCommunityIcons name="arrow-left" size={38} color={APP_COLORS.white} />
                            </TouchableHighlight>

                            <TouchableHighlight disabled={state.quesIdx === testQuesData?.length - 1 ? true : false} onPress={()=> handleChangeQues('next')} style={{...testStyles.NAV_BTN, ...(state.quesIdx === testQuesData?.length - 1 ? COMMON_STYLES.DISABLED : {})}}>
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