import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';

const LiveTestsList = ({navigation})=> {
    const megaliveDataList = [
        {
            _id: '1',
            testName: '100000  Rupees Scholarship',
            entryFee: '1',
            usersJoined: '4000',
            usersLimit: '5000',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Easy',
        },
        {
            _id: '2',
            testName: '100000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Easy',
        },
        {
            _id: '3',
            testName: '50000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Medium',
        },
        {
            _id: '4',
            testName: '4000 Rupees Scholarship',
            entryFee: '10',
            usersJoined: '10000',
            usersLimit: '50000',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Easy',
        },
        {
            _id: '5',
            testName: '5000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Hard',
        }
    ];

    const liveDataList = [
        {
            _id: '1',
            testName: '10000 Rupees Scholarship',
            entryFee: '10',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Hard',
        },
        {
            _id: '2',
            testName: '20000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Easy',
        },
        {
            _id: '3',
            testName: '3000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Medium',
        },
        {
            _id: '4',
            testName: '4000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Easy',
        },
        {
            _id: '5',
            testName: '5000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            testType: Constant.TEST_TYPES.LIVE,
            expiresOn: '12/08/2022',
            difficultiLevel: 'Hard',
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