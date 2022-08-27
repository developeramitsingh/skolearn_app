import { SafeAreaView, View, Text, TouchableHighlight, BackHandler } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {useEffect, useState} from  'react';
import * as Constant from '../../constant/constant';
import {resultScreenStyles} from './resultScreenStyles';

import LeaderBoard from '../../components/leaderBoard/leaderBoard';
import BackBtn from "../../components/backBtn/backBtn";

const ResultScreen = ({navigation, testId}) => {
    const [state, setState] = useState({
        testData: {
            id: '1',
            title: '1000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
            isResultDeclared: true,
        },
        leaderBoardData: [{
            id: 1,
            rank: 1,
            userName: 'Rohan',
            userScore: 1500,
            scholarship: 10000
        },
        {
            id: 2,
            rank: 2,
            userName: 'Kishan',
            userScore: 1000,
            scholarship: 10000
        },
        {
            id: 3,
            rank: 3,
            userName: 'Dhoni',
            userScore: 1000,
            scholarship: 10000
        },
        {
            id: 4,
            rank: 4,
            userName: 'Rahul',
            userScore: 1000,
            scholarship: 10000
        },
        {
            id: 5,
            rank: 5,
            userName: 'Test user',
            userScore: 1000,
            scholarship: 10000
        },
        {
            id: 6,
            rank: 6,
            userName: 'Test user 2',
            userScore: 1000,
            scholarship: 10000
        },
        {
            id: 7,
            rank: 7,
            userName: 'Test user 3',
            userScore: 1000,
            scholarship: 10000
        },
        {
            id: 8,
            rank: 8,
            userName: 'Test user 4',
            userScore: 1000,
            scholarship: 10000
        },
        {
            id: 9,
            rank: 9,
            userName: 'Test user 5',
            userScore: 1000,
            scholarship: 10000
        },]
    });

    useEffect(()=> {
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
    }, []);

    const handlePress = ()=>{
        navigation.navigate(Constant.ROUTES.TEST, { previewMode: true, istestId: state.testData.id });
    }

    return (
        <SafeAreaView style={resultScreenStyles.CONTAINER}>
            <BackBtn navigation={navigation} routeToGo={Constant.ROUTES.DASHBOARD}/>
            <View style={resultScreenStyles.ROW}>
                <Text style={resultScreenStyles.LABEL_TEXT}>Participant Joined: <Text>{state.testData.usersJoined + '/'} {state.testData.usersLimit}</Text>
                </Text>
                <Text style={resultScreenStyles.LABEL_TEXT}>Entry Fee: <Text>{state.testData.entryFee}</Text>
                </Text>
            </View>

            <View style={resultScreenStyles.ROW}>
                <Text style ={resultScreenStyles.HEADING}>{state.testData.title}</Text>
            </View>

            <TouchableHighlight onPress = {handlePress} style={COMMON_STYLES.BTN_1}>
                <Text style={COMMON_STYLES.BTN_TEXT}>View Solution</Text>
            </TouchableHighlight>

            <LeaderBoard dataList={state.leaderBoardData}/>
        </SafeAreaView>
    )
}

export default ResultScreen;