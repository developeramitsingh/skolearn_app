import { View, Text } from 'react-native';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';

const MyTestsList = ({navigation})=> {
    const myTestDataList = [
        {
            id: '1',
            title: '1000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
            isResultDeclared: true,
        },
        {
            id: '2',
            title: '2000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
            isResultDeclared: false,
        },
        {
            id: '3',
            title: '3000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
            isResultDeclared: false,
        },
        {
            id: '4',
            title: '4000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
            isResultDeclared: false,
        },
        {
            id: '5',
            title: '5000 Rupees Scholarship',
            entryFee: '49',
            usersJoined: '100',
            usersLimit: '500',
            listType: Constant.TEST_TYPES.MY_TEST,
            expiresOn: '12/08/2022',
            isResultDeclared: false,
        }
    ];
    const handleBtnPress = (id) => {
        console.info({id});
        navigation.navigate(Constant.ROUTES.RESULT_SCREEN, { testId: id });
    }
    return (
        <View style={{flex: 1}}>
            <Text style={testListsStyles.HEADING}>Test Completed</Text>
            <CardList handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={myTestDataList} horizontal = {false}/>
        </View>
    )   
}

export default MyTestsList;