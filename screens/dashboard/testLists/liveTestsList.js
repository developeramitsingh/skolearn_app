import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking, Alert } from 'react-native';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';
import { useEffect, useState } from 'react';
import { testService } from '../../../services/index';
import Loader from '../../../components/loader/loader';

const LiveTestsList = ({navigation})=> {
    const [megaliveDataList, setMegaLiveTestList] = useState([]);
    const [liveDataList, setLiveTestList] = useState([]);
    const [isLoading, setLoading] = useState(false);


    const getMegaLiveDataList = async () => {
        try {
            console.info(`getMegaLiveDataList called`);
            const tests = await testService.getTests('{ "testType": "live", "testCategory": "mega", "isActive": true }');

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
            const tests = await testService.getTests('{ "testType": "live", "testCategory": "general", "isActive": true }');

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
        getAllTests();
    }, []);

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
            navigation.navigate(Constant.ROUTES.ATTEMPT, { test: data });
        } else {
            Alert.alert('Info', 'Test seats full!. please attempt another test.', [
                {
                    text: 'Close', onPress: () => {}
                },
            ])
        }
        
    }
    return (
        <View style={{ flex: 1 }}>
            <Loader isLoading={isLoading}/>
            <Text style={testListsStyles.HEADING_WHITE}>Mega Scholarships</Text>
            <CardList testType={ Constant.TEST_TYPES.LIVE } handleBtnPress = {handleBtnPress} customStyle={{ flex: 0 }} dataList={megaliveDataList} horizontal = {true}/>
            <View style={COMMON_STYLES.SEPARATOR}></View>

            <Text style={testListsStyles.HEADING_WHITE}>Scholarships for everyone</Text>
            <CardList testType={ Constant.TEST_TYPES.LIVE } handleBtnPress = {handleBtnPress} customStyle={testListsStyles.BACK_PANEL} dataList={liveDataList} horizontal = {false}/>
        </View>
    )   
}

export default LiveTestsList;