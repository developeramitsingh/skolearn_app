import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';

const LiveTestsList = ({navigation})=> {
    const megaliveDataList = [
        {
            "userEnrolled": 0,
            "_id": "62f5607484f03dc553cc233c",
            "testName": "50000 rupees scholarship",
            "entryFee": 39,
            "testType": "live",
            "testCategory": "general",
            "totalAmount": 50000,
            "userSeats": 500,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "medium",
            "isActive": true,
            "createdAt": "2022-08-11T20:03:00.521Z",
            "updatedAt": "2022-08-11T20:03:00.521Z",
            "__v": 0
        },
        {
            "userEnrolled": 0,
            "_id": "62f5608284f03dc553cc233e",
            "testName": "510000 rupees scholarship",
            "entryFee": 39,
            "testType": "live",
            "testCategory": "general",
            "expireOn": "2023-08-11T20:03:14.844Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "medium",
            "isActive": true,
            "createdAt": "2022-08-11T20:03:14.847Z",
            "updatedAt": "2022-08-11T20:03:14.847Z",
            "__v": 0
        },
        {
            "_id": "62f7d947803797d741ffc4b5",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "live",
            "testCategory": "",
            "expireOn": "2023-08-13T17:03:03.526Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "userEnrolled": 0,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": true,
            "createdAt": "2022-08-13T17:03:03.556Z",
            "updatedAt": "2022-08-13T17:03:03.556Z",
            "__v": 0
        },
        {
            "_id": "62f7d9a28e39a9316fc59aaa",
            "testName": "50000 rupees scholarship",
            "entryFee": 40,
            "testType": "live",
            "testCategory": "",
            "expireOn": "2024-08-13T17:04:34.695Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "userEnrolled": 500,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-13T17:04:34.701Z",
            "updatedAt": "2022-08-13T17:04:34.701Z",
            "__v": 0
        },
        {
            "_id": "630a5e973e8eba1e2d35187d",
            "testName": "510000 rupees scholarship",
            "entryFee": 49,
            "testType": "live",
            "testCategory": "",
            "expireOn": "2024-08-27T18:12:39.581Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "userEnrolled": 100,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": true,
            "createdAt": "2022-08-27T18:12:39.584Z",
            "updatedAt": "2022-08-27T18:12:39.584Z",
            "__v": 0
        }
    ];

    const liveDataList = [
        {
            "userEnrolled": 0,
            "_id": "62f5607484f03dc553cc233c",
            "testName": "50000 rupees scholarship",
            "entryFee": 39,
            "testType": "live",
            "testCategory": "general",
            "totalAmount": 50000,
            "userSeats": 500,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "medium",
            "isActive": true,
            "createdAt": "2022-08-11T20:03:00.521Z",
            "updatedAt": "2022-08-11T20:03:00.521Z",
            "__v": 0
        },
        {
            "userEnrolled": 0,
            "_id": "62f5608284f03dc553cc233e",
            "testName": "510000 rupees scholarship",
            "entryFee": 39,
            "testType": "live",
            "testCategory": "general",
            "expireOn": "2023-08-11T20:03:14.844Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "medium",
            "isActive": true,
            "createdAt": "2022-08-11T20:03:14.847Z",
            "updatedAt": "2022-08-11T20:03:14.847Z",
            "__v": 0
        },
        {
            "_id": "62f7d947803797d741ffc4b5",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": "live",
            "testCategory": "",
            "expireOn": "2023-08-13T17:03:03.526Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "userEnrolled": 0,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": true,
            "createdAt": "2022-08-13T17:03:03.556Z",
            "updatedAt": "2022-08-13T17:03:03.556Z",
            "__v": 0
        },
        {
            "_id": "62f7d9a28e39a9316fc59aaa",
            "testName": "50000 rupees scholarship",
            "entryFee": 40,
            "testType": "live",
            "testCategory": "",
            "expireOn": "2024-08-13T17:04:34.695Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "userEnrolled": 500,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-13T17:04:34.701Z",
            "updatedAt": "2022-08-13T17:04:34.701Z",
            "__v": 0
        },
        {
            "_id": "630a5e973e8eba1e2d35187d",
            "testName": "510000 rupees scholarship",
            "entryFee": 49,
            "testType": "live",
            "testCategory": "",
            "expireOn": "2024-08-27T18:12:39.581Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "userEnrolled": 100,
            "cutOffRank": 20,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": true,
            "createdAt": "2022-08-27T18:12:39.584Z",
            "updatedAt": "2022-08-27T18:12:39.584Z",
            "__v": 0
        }
    ];

    const handleBtnPress = (_id) => {
        console.info({_id});
        navigation.navigate(Constant.ROUTES.ATTEMPT, { test_id: _id });
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={testListsStyles.HEADING_WHITE}>Mega Scholarships</Text>
            <CardList handleBtnPress = {handleBtnPress} customStyle={{ flex: 0 }} dataList={megaliveDataList} horizontal = {true}/>
            <View style={COMMON_STYLES.SEPARATOR}></View>

            <Text style={testListsStyles.HEADING_WHITE}>Scholarships for everyone</Text>
            <CardList handleBtnPress = {handleBtnPress} customStyle={testListsStyles.BACK_PANEL} dataList={liveDataList} horizontal = {false}/>
        </View>
    )   
}

export default LiveTestsList;