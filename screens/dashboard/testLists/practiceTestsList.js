import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';

const PracticeTestsList = ({navigation})=> {
    const practiceTestsDataList = [
        {
            id: '1',
            title: 'Practice test 1 easy',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '2',
            title: 'Practice test 2 easy',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '3',
            title: 'Practice test 3 hard',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '4',
            title: 'Practice test 4 easy',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '5',
            title: 'Practice test 5 easy',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
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