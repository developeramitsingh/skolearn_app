import { SafeAreaView } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';
import { useState } from 'react';
import Tabs from '../../components/tabs/tabs';
import StatusBar from '../../components/statusBar/statusBar';
import LiveTestsList from '../dashboard/testLists/liveTestsList';
import MyTestsList from '../dashboard/testLists/myTestsList';
import PracticeTestsList from './testLists/practiceTestsList';

const Dashboard = () => {
    const [state, setState] = useState({
        userName: 'Amit',
        activeTab: Constant.TEST_TYPES.LIVE,
    });

    const setActiveTab = (key) => {
        setState(prev => {
            return { ...prev, activeTab: key }
        })
    }

    return (
        <SafeAreaView style={COMMON_STYLES.CONTAINER}>
            <StatusBar text ={state.userName}/>
            <Tabs setActiveTab={setActiveTab}/>
            {
                state.activeTab === Constant.TEST_TYPES.LIVE 
                ? <LiveTestsList/>
                : state.activeTab === Constant.TEST_TYPES.MY_TEST
                ? <MyTestsList/>
                : <PracticeTestsList/>
            
            }

        </SafeAreaView>
    )
}

export default Dashboard;