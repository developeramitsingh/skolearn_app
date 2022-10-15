import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking, Alert } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';
import React, { useEffect, useState } from 'react';
import { testService } from '../../../services/index';
import Loader from '../../../components/loader/loader';
import { LANGUAGES_DATA } from '../../../constant/language';
import { setCurrentLanguage } from '../../../common/functions/commonHelper';

const LiveTestsList = ({navigation, userId, testGroup })=> {
    const [megaliveDataList, setMegaLiveTestList] = useState([]);
    const [liveDataList, setLiveTestList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [lang, setLang] = useState();

    const getMegaLiveDataList = async () => {
        try {
            console.info(`getMegaLiveDataList called`);
            if (!testGroup) {
                return
            }

            const tests = await testService.getTests(`{ "testType": "live", "testCategory": "mega", "isActive": true, "group": "${testGroup}" }`);

            if (tests?.data?.data) {
                setMegaLiveTestList(tests.data.data);
            }
        } catch (err) {
            console.error(`error in getMegaLiveDataList: ${err}`);
        }
    }

    const getLiveDataList = async () => {
        try {
            console.info(`getLiveDataList called`);
            if (!testGroup) {
                return
            }
            const tests = await testService.getTests(`{ "testType": "live", "testCategory": "general", "isActive": true, "group": "${testGroup}" }`);

            if (tests?.data?.data) {
                setLiveTestList(tests.data.data);
            }
        } catch (err) {
            console.error(`error in getMegaLiveDataList: ${err}`);
        }
    }

    const getAllTests = async () => {
        console.info('getAllTests called');
        setLoading(true);
        await Promise.all([getMegaLiveDataList(), getLiveDataList()]);
        setLoading(false);
    }

    useEffect(() => {
        setCurrentLanguage(setLang);
        getAllTests();
    }, [testGroup]);

    const handleBtnPress = async (_id) => {
        console.info({_id});
        setLoading(true);

        const test = await testService.getTestById(_id);
        setLoading(false);

        console.info({test})

        if (!test?.data) {
            return;
        }

        const data = test.data;

        console.info({ isActve: data.isActive ,userEnrolled: data.userEnrolled, userSeats: data.userSeats });

        if (data.isActive) {
            console.info('here in live userId', userId);
            navigation.navigate(Constant.ROUTES.ATTEMPT, { test: data, userId });
        } else {
            Alert.alert('Info', 'Test seats full!. please attempt another test.', [
                {
                    text: 'Close', onPress: () => {}
                },
            ])
        }
        
    }

    if (!megaliveDataList?.length && !liveDataList?.length) {
        return (
            <View style={[COMMON_STYLES.CONTAINER_LIGHT_ALL_CENTER, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                <Loader isLoading={isLoading}/>
                <Text style={[COMMON_STYLES.BODY_TITLE, { textAlign: 'center'}]}>{ testGroup ? LANGUAGES_DATA[lang]?.COMMON?.NO_DATA : LANGUAGES_DATA[lang]?.COMMON?.FETCHING_DATA }</Text>
            </View>
        )
    }
    
    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <Loader isLoading={isLoading}/>
            {/* <Text style={testListsStyles.HEADING_WHITE}>{LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.LIVE]?.MEGA_SCHOLAR}</Text> */}
            <CardList testType={Constant.TEST_TYPES.LIVE } handleBtnPress = {handleBtnPress} customStyle={{ flex: 0 }} dataList={megaliveDataList} horizontal = {true} langData={
                LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.LIVE]?.CARDS
            }/>
            <View style={{ marginVertical: 5 }}></View>

            {/* <Text style={testListsStyles.HEADING_WHITE}>{LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.LIVE]?.SCHOLAR_EVERYONE}</Text> */}
            <CardList testType={ Constant.TEST_TYPES.LIVE } handleBtnPress = {handleBtnPress} customStyle={{}} dataList={liveDataList} horizontal = {false} langData={
                LANGUAGES_DATA[lang]?.DASHBOARD?.[Constant.SCREENS.TEST_LIST]?.[Constant.TEST_TYPES.LIVE]?.CARDS
            }/>
        </View>
    )   
}


export default React.memo(LiveTestsList);