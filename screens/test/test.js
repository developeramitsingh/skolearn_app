import { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable, TouchableHighlight, ScrollView, TouchableNativeFeedback } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { testStyles } from './testStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES, TEST_TYPES, TEST_TIME_LIMIT, } from "../../constant/constant";

import { Camera } from "expo-camera";

const Test = ({navigation, route}) => {
    let timeTimer = useRef();
    const [time, setTime] = useState(TEST_TIME_LIMIT);
    const [state, setState] = useState({
        testId: 1,
        userId: 1,
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

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMicPermission, setHasMicPermission] = useState(null);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const [isCameraVisible, setCameraVisible ] = useState(true);
    const cameraRef = useRef();

    const recordVideo = async () => {
        console.info({cameraRef});
        if (cameraRef.current) {
            try {
            const videoRecordPromise = cameraRef.current.recordAsync();
            if (videoRecordPromise) {
                setIsVideoRecording(true);
                const data = await videoRecordPromise;
                console.info({data});
                const source = data.uri;
                if (source) {
                console.log("video source hello", source);
                setVideoSource(source);
                }
            }
            } catch (error) {
            console.warn(error);
            }
        }
    };
    const stopVideoRecording = () => {
        if (cameraRef.current) {
            setIsVideoRecording(false);
            setCameraVisible(false);
            cameraRef.current.stopRecording();
        }
    };

    const renderVideoRecordIndicator = () => (
        <View style={testStyles.recordIndicatorContainer}>
            <View style={testStyles.recordDot} />
            <Text style={testStyles.recordTitle}>{"Recording..."}</Text>
        </View>
    );    

    useEffect(()=> {
        console.info('useEffect here');
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            const micStatus = await Camera.requestMicrophonePermissionsAsync();
  
            console.info({status});
            console.info({micStatus});
            setHasCameraPermission(status === "granted");
            setHasMicPermission(micStatus.status === "granted");
            recordVideo();
          })();
        console.info({'insdie here: useEffedct': route?.params?.previewMode})
        if (!route?.params?.previewMode) {
            timeTimer.current = timeLimitTimer();
        } else {
            setState(prev => {
                return {... prev, previewMode: route?.params?.previewMode, userAnswered: [{ quesId: 1, optionSelected: 2}, { quesId: 2, optionSelected: 3}] }
            })
        }

        return (() => {
            clearInterval(timeTimer.current);
            console.info('cleared timer', timeTimer?.current);
            stopVideoRecording();
            setCameraVisible(false);
            setIsVideoRecording(false);
        })
    }, [state.quesIdx, state.userScore, time, route?.params?.previewMode ])

    const timeLimitTimer = () => {
        console.info('time timer created');

        let timeTimerObj = setInterval(() => {
            console.info('time timer running', {time});

            if (time > 0) {
                setTime((prev) => { return prev - 1 })
            } else {
                handleChangeQues('next');
            }
        }, 1000);

        return timeTimerObj;
    }

    const handleChangeQues = (type) => {
        console.info({ quesIdx: state.quesIdx });
        console.info('state?.userAnswered', state?.userAnswered);
        console.info('temp', state?.userAnswered?.[state.quesIdx]?.optionSelected);

        if (type === 'next') {
            if (state.quesIdx < state?.test?.length - 1) {
                console.info('next', state.quesIdx );
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
                console.info('prev', state.quesIdx);
                setState(prev => {
                    return { ...prev, optionSelected: prev?.userAnswered?.[prev.quesIdx-1]?.optionSelected, quesIdx: prev.quesIdx - 1}
                })

                //reset the time for next question
                setTime(TEST_TIME_LIMIT);
            }
        }
    }

    const handlePress = (optionId) => {
        console.info(optionId);
        calculateUserScore(time);
        //set used answers
        setState(prev=> {
            return { ...prev, optionSelected: optionId, userAnswered: [...prev.userAnswered, { quesId: state.test[state.quesIdx].quesId, optionSelected: optionId }] };
        })
    }

    const calculateUserScore = (timeLimit) => {
        const userScore = timeLimit * 10;
        setState(prev => {
            return { ...prev, userScore: [...prev.userScore, userScore]};
        });
    }

    const finishTest = () => {
        stopVideoRecording();
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
        return <View><Text>waiting for permission</Text></View>;
    }

    if (hasCameraPermission === false || hasMicPermission === false) {
        return <Text style={testStyles.text}>No access to camera or microphone</Text>;
    }

    return (
        <SafeAreaView style={{...testStyles.container, ...(state.timeFinished ? {justifyContent: 'center'} : {})}}>
            { isCameraVisible &&
                <Camera
                    ref={cameraRef}
                    style={testStyles.cameraContainer}
                    type={Camera.Constants.Type.front}
                    flashMode={Camera.Constants.FlashMode.on}
                    //onCameraReady={onCameraReady}
                    onMountError={(error) => {
                        console.log("cammera error", error);
                    }}
                />
            }

            <View style={COMMON_STYLES.ROW}>
                {isVideoRecording && renderVideoRecordIndicator()}
            </View>
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
            
        </SafeAreaView>
    )
}

export default Test;