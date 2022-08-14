import { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable, TouchableHighlight, ScrollView, TouchableNativeFeedback, Alert } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { testStyles } from './testStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES, TEST_TYPES, TEST_TIME_LIMIT, } from "../../constant/constant";
import userRecordingsService from '../../services/userRecordingsService';

import { Camera } from "expo-camera";

const Test = ({navigation, route}) => {
    let timeTimer = useRef();
    let cameraRef = useRef();
    const [time, setTime] = useState(TEST_TIME_LIMIT);
    const [state, setState] = useState({
        testId: "62f6887b7fd9289e51a463a6",
        userId: "62f554ce0128a3d03073b3cc",
        test: [
            {
                quesId: 1,
                question: 'When did the India get freedom?',
                options: [
                    { id: 1, text: '1950'},
                    { id: 2, text: '1947'},
                    { id: 3, text: '1933'},
                    { id: 4, text: '1945'},
                ],
                ans: [2],
            },
            {
                quesId: 2,
                question: 'When did the Nehru become Prime Minister?',
                options: [
                    { id: 1, text: '1950'},
                    { id: 2, text: '1947'},
                    { id: 3, text: '1933'},
                    { id: 4, text: '1945'},
                ],
                ans: [1],
            },
        ],
        quesIdx: 0,
        userAnswered: [],
        optionSelected: false,
        userScore: [],
        previewMode: route?.params?.previewMode || false,
        timeFinished: false,
    });

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
          name: `UserRecording_testId:${state.testId}.mp4`,
          uri: uri,
          type: "video/mp4",
        });

        form.append('testId', state.testId);

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
        let isMediaPerm;
        if (!hasCameraPermission || !hasMicPermission) {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const micStatus = await Camera.requestMicrophonePermissionsAsync();

            console.info({cameraStatus});
            console.info({micStatus});
            isCameraPerm = cameraStatus.status === "granted";
            isMicPerm = micStatus.status === "granted";

            setHasCameraPermission(isCameraPerm);
            setHasMicPermission(isMicPerm);
        }

        if ((hasCameraPermission && hasMicPermission) || (isMicPerm && isCameraPerm)) {
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
        startTest();
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
                setTime((prev) => { return prev - 1 })
            } else {
                handleChangeQues('next');
            }
        }, 1000);

        return timeTimerObj;
    }

    const handleChangeQues = (type) => {
        if (type === 'next') {
            if (state.quesIdx < state?.test?.length - 1) {
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

    const handlePress = (optionId) => {
        calculateUserScore(time);
        //set used answers
        setState(prev=> {
            return { ...prev, optionSelected: optionId, userAnswered: [...prev.userAnswered, { quesId: state.test[state.quesIdx].quesId, optionSelected: optionId }] };
        });

        if(hasCameraPermission && hasMicPermission && !isVideoRecording) {
            recordVideo();
        }
        
    }

    const calculateUserScore = (timeLimit) => {
        const userScore = timeLimit * 10;
        setState(prev => {
            return { ...prev, userScore: [...prev.userScore, userScore]};
        });
    }

    const finishTest = () => {
        setIsVideoRecording(false);
        stopVideoRecording();
        setCameraVisible(false);
        clearInterval(timeTimer.current);
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
                            <Text style={testStyles.LABEL_TEXT}>{time}</Text>
                        </View>
                    </View>

                    <View style={COMMON_STYLES.ROW}>
                        <Text style={testStyles.QUES_TEXT}>
                            {state?.test?.[state.quesIdx]?.question}
                        </Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator ={true} style={testStyles.OPTION_CONT}>
                        {state?.test?.[state.quesIdx]?.options?.map(option => {
                            return (
                                <TouchableHighlight disabled={state.optionSelected ? true : false} onPress={() => handlePress(option.id)} style ={{...COMMON_STYLES.BTN_1, ...(state.optionSelected === option.id ? COMMON_STYLES.DISABLED : {})}} id={option.id} key={option.id}>
                                    <Text style={{...COMMON_STYLES.BTN_TEXT, ...(state.optionSelected === option.id ? COMMON_STYLES.DISABLED_TEXT : {})}} key={option.id}>{option.text}</Text>
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

                            <TouchableHighlight disabled={state.quesIdx === state.test?.length - 1 ? true : false} onPress={()=> handleChangeQues('next')} style={{...testStyles.NAV_BTN, ...(state.quesIdx === state.test?.length - 1 ? COMMON_STYLES.DISABLED : {})}}>
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