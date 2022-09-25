import { View, Text } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';
import { useEffect, useState } from 'react';
import { testService } from '../../../services/index';
import Loader from '../../../components/loader/loader';
import { LANGUAGES_DATA } from '../../../constant/language';
import { setCurrentLanguage } from '../../../common/functions/commonHelper';

const PracticeTestsList = ({navigation})=> {
    const [practiceTestsData, setPracticeListData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [lang, setLang] = useState();

    const getPracticeTests = async () => {
        try {
            console.info(`getPracticeTests called`);
            setLoading(true);
            const tests = await testService.getTests(`{ "testType": "${Constant.TEST_TYPES.PRACTICE}" }`);
            setLoading(false);
            if (tests?.data?.data) {
                setPracticeListData(tests.data.data);
            }
        } catch (err) {
            console.error(`error in getPracticeTests: ${err}`);
        }
    }

    useEffect(() => {
        setCurrentLanguage(setLang);
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
            <Text style={testListsStyles.HEADING}>{LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.PRACTICE]?.PRACTICE_TESTS}</Text>
            <View style={[COMMON_STYLES.SEPARATOR, { marginHorizontal: 15 }]}></View>
            <CardList testType={ Constant.TEST_TYPES.PRACTICE }  handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={practiceTestsData} horizontal = {false} langData={
                LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.PRACTICE]?.CARDS
            }/>
        </View>
    )   
}

export default PracticeTestsList;