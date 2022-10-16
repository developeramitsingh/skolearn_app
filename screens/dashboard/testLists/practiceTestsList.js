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

const PracticeTestsList = ({navigation, testGroup})=> {
    const [practiceTestsData, setPracticeListData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [lang, setLang] = useState();

    const getPracticeTests = async () => {
        try {
            if (!testGroup) {
                return;
            }
            console.info(`getPracticeTests called`);
            setLoading(true);
            const tests = await testService.getTests(`{ "testType": "${Constant.TEST_TYPES.PRACTICE}", "group": "${testGroup !== Constant.TEST_GROUPS.GENERAL.VALUE ? testGroup : ''}" }`);
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
    }, [testGroup]);
    
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

    if (!practiceTestsData?.length) {
        return (
            <View style={[COMMON_STYLES.CONTAINER_LIGHT_ALL_CENTER, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                <Loader isLoading={isLoading}/>
                <Text style={[COMMON_STYLES.BODY_TITLE, { textAlign: 'center'}]}>{ testGroup ? LANGUAGES_DATA[lang]?.COMMON?.NO_DATA : LANGUAGES_DATA[lang]?.COMMON?.FETCHING_DATA }</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
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