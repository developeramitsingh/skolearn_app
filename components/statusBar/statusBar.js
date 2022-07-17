import { View, Text, Image, TouchableHighlight, SafeAreaView, Linking } from 'react-native';
import statusBarStyles from './statusBarStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { BACKEND_URL } from '../../constant/constant';
import {FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import Tabs from '../../components/tabs/tabs';

const StatusBar = (props) => {
    return (
        <View style={statusBarStyles.SUB_CONT}>
            <Text style={statusBarStyles.STATUS_BAR_TEXT}>Hello {props.text}!</Text>
            <FontAwesome name="user-circle" size={32} color="white" />
        </View>
    )
}

export default StatusBar;