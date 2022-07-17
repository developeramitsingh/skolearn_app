import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import dashboardStyles from './dashboardStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { BACKEND_URL } from '../../constant/constant';
import {FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import Tabs from '../../components/tabs/tabs';
import StatusBar from '../../components/statusBar/statusBar';

const Dashboard = () => {
    const [state, setState] = useState({
        userName: 'Amit',
        activeTab: 'liveTests',
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
        </SafeAreaView>
    )
}

export default Dashboard;