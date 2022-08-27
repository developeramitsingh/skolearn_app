import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';

const PracticeTestsList = ({navigation})=> {
    const practiceTestsDataList = [
        {
            "_id": "62f6887b7fd9289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "practice",
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": true,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "2022-08-27T19:52:00.775Z"
        },
        {
            "_id": "62f6887b7fd4289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "practice",
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": true,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "2022-08-27T19:52:32.543Z"
        },
        {
            "_id": "62f6887b7f345289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "practice",
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": true,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "2022-08-27T19:52:45.098Z"
        },
        {
            "_id": "62f6887b7fd9289e4541a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "practice",
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": true,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "2022-08-27T19:52:46.097Z"
        },
        {
            "_id": "62f6887b7235d289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "practice",
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": true,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "2022-08-27T19:52:47.168Z"
        },
        {
            "_id": "62f6887b7fd2359284951a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "practice",
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": true,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "2022-08-27T19:52:48.281Z"
        },
        {
            "_id": "62f6887b7fd23439289e5163a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "practice",
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": true,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "2022-08-27T19:52:49.228Z"
        }
    ];
    const handleBtnPress = (id) => {
        console.info({id});
        navigation.navigate(Constant.ROUTES.ATTEMPT, { testId: id });
    }

    return (
        <View style={testListsStyles.BACK_PANEL}>
            <Text style={testListsStyles.HEADING}>Practice Tests</Text>
            <View style={[COMMON_STYLES.SEPARATOR, { marginHorizontal: 15 }]}></View>
            <CardList handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={practiceTestsDataList} horizontal = {false}/>
        </View>
    )   
}

export default PracticeTestsList;