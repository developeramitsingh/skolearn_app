import { View, Text } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';
import { useEffect, useState } from 'react';
import { testService } from '../../../services/index';
import Loader from '../../../components/loader/loader';

const PracticeTestsList = ({navigation})=> {
    const [practiceTestsData, setPracticeListData] = useState([]);
    const [isLoading, setLoading] = useState(false);


    const getPracticeTests = async () => {
        try {
            console.info(`getPracticeTests called`);
            setLoading(true);
            const tests = await testService.getTests('{ "testType": "practice" }');
            setLoading(false);
            if (tests?.data?.data) {
                setPracticeListData(tests.data.data);
            }
        } catch (err) {
            console.error(`error in getPracticeTests: ${err}`);
        }
    }

    useEffect(() => {
        getPracticeTests();
    }, []);
    
    const handleBtnPress = async (id) => {
        console.info({id});
        setLoading(true);

        const test = await testService.getTestById(id);
        setLoading(false);

        console.info({test})

        if (!test?.data) {
            return;
        }

        const data = test.data;

        console.info({ isActve: data.isActive ,userEnrolled: data.userEnrolled, userSeats: data.userSeats });

        navigation.navigate(Constant.ROUTES.ATTEMPT, { test: data });
    }

    return (
        <View style={testListsStyles.BACK_PANEL}>
            <Loader isLoading={isLoading}/>
            <Text style={testListsStyles.HEADING}>Practice Tests</Text>
            <View style={[COMMON_STYLES.SEPARATOR, { marginHorizontal: 15 }]}></View>
            <CardList testType={ Constant.TEST_TYPES.PRACTICE }  handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={practiceTestsData} horizontal = {false}/>
        </View>
    )   
}

export default PracticeTestsList;