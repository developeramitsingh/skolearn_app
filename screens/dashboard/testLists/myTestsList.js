import { View, Text } from 'react-native';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';

const MyTestsList = ({navigation})=> {
    const myTestDataList = [
        {
            "_id": "62f6887b7fd9289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": Constant.TEST_TYPES.MY_TEST,
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
            "userCompletedOn": "28-08-2022"
        },
        {
            "_id": "6222f6887b7fd9289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": Constant.TEST_TYPES.MY_TEST,
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 500,
            "userCompletedOn": "28-08-2022"
        },
        {
            "_id": "62f688347b7fd9289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": Constant.TEST_TYPES.MY_TEST,
            "testCategory": "general",
            "expireOn": "2023-08-12T17:06:03.236Z",
            "totalAmount": 100000,
            "userSeats": 500,
            "cutOffRank": 10,
            "isResultDeclared": false,
            "difficultyLevel": "easy",
            "isActive": false,
            "createdAt": "2022-08-12T17:06:03.241Z",
            "updatedAt": "2022-08-12T17:06:03.241Z",
            "__v": 0,
            "userEnrolled": 200,
            "userCompletedOn": "28-08-2022"
        },
        {
            "_id": "62f6887b7f45d9289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": Constant.TEST_TYPES.MY_TEST,
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
            "userCompletedOn": "28-08-2022"
        },
        {
            "_id": "623f6887b7fd9289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": Constant.TEST_TYPES.MY_TEST,
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
            "userCompletedOn": "28-08-2022"
        },
        {
            "_id": "62f68874b7fd9289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": Constant.TEST_TYPES.MY_TEST,
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
            "userCompletedOn": "28-08-2022"
        },
        {
            "_id": "62f6887b7fd49289e51a463a6",
            "testName": "510020 rupees scholarship",
            "entryFee": 39,
            "testType": Constant.TEST_TYPES.MY_TEST,
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
            "userCompletedOn": "28-08-2022"
        }
    ];
    const handleBtnPress = (id) => {
        console.info({id});
        navigation.navigate(Constant.ROUTES.RESULT_SCREEN, { testId: id });
    }
    return (
        <View style={testListsStyles.BACK_PANEL}>
            <Text style={testListsStyles.HEADING}>Test Completed</Text>
            <View style={[COMMON_STYLES.SEPARATOR, { marginHorizontal: 15 }]}></View>
            <CardList handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={myTestDataList} horizontal = {false}/>
        </View>
    )   
}

export default MyTestsList;