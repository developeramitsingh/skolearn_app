import { View, Text } from 'react-native';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import React, { useEffect, useState } from 'react';
import { enrolledTestsService } from '../../../services/index';
import Loader from '../../../components/loader/loader';
import { LANGUAGES_DATA } from '../../../constant/language';
import { setCurrentLanguage } from '../../../common/functions/commonHelper';


const MyTestsList = ({navigation})=> {
    const [myTestsList, setMyTestsList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [lang, setLang] = useState();

    const getMyTestsList = async () => {
        try {
            console.info(`getMyTestsList called`);
            setLoading(true);
            const tests = await enrolledTestsService.getAllEnrolledTests();

            setLoading(false);
            if (tests?.data) {
                setMyTestsList(tests.data);
                
            }
        } catch (err) {
            console.error(`error in getMyTestsList: ${err}`);
        }
    }

    useEffect(() => {
        setCurrentLanguage(setLang);
        getMyTestsList();
    }, []);
    
    const handleBtnPress = (id, enrolledId) => {
        console.info({id, enrolledId});
        navigation.navigate(Constant.ROUTES.RESULT_SCREEN, { testId: id, enrolledId });
    }
    return (
        <View style={ { flex: 1 }}>
            <Loader isLoading={isLoading}/>
            <Text style={testListsStyles.HEADING}>{LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.MY_TEST]?.TEST_COMPLETED}</Text>
            <View style={[COMMON_STYLES.SEPARATOR, { marginHorizontal: 15 }]}></View>
            {
                myTestsList?.length 
                  ? <CardList testType={ Constant.TEST_TYPES.MY_TEST } handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={myTestsList} horizontal = {false} langData={
                    LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.MY_TEST]?.CARDS
                }/>
                  : <Text style= {[COMMON_STYLES.BODY_TEXT, { marginTop: 10, textAlign: 'center'}]}>{LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.MY_TEST]?.NO_TEST_APPEARED}</Text>
            }
            
        </View>
    )   
}

export default React.memo(MyTestsList);