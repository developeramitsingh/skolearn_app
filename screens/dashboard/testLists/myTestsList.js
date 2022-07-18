import { View, Text } from 'react-native';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';

const MyTestsList = ()=> {
    const myTestDataList = [
        {
            id: '1',
            title: '1000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
        },
        {
            id: '2',
            title: '2000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
        },
        {
            id: '3',
            title: '3000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
        },
        {
            id: '4',
            title: '4000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
        },
        {
            id: '5',
            title: '5000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
        }
    ];
    return (
        <View>
            <Text style={testListsStyles.HEADING}>Test Completed</Text>
            <CardList dataList={myTestDataList} horizontal = {false} height = "80%"/>
        </View>
    )   
}

export default MyTestsList;