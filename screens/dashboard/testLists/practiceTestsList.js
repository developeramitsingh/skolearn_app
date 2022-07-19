import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';

const PracticeTestsList = ({navigation})=> {
    const practiceTestsDataList = [
        {
            id: '1',
            title: '1000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '2',
            title: '2000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '3',
            title: '3000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '4',
            title: '4000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.PRACTICE,
            expiresOn: '12/08/2022',
        },
        {
            id: '5',
            title: '5000 Rupees Scholarship',
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
        <View style={{flex: 1}}>
            <Text style={testListsStyles.HEADING}>Practice Tests</Text>
            <CardList handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={practiceTestsDataList} horizontal = {false}/>
        </View>
    )   
}

export default PracticeTestsList;