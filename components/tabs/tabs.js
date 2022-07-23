import { useEffect, useState } from 'react';
import {View, TouchableHighlight, Text} from 'react-native';

import { tabStyles } from './tabStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from  '../../constant/constant';

const Tabs = (props) => {
    const tabs = [{
        name: 'Live Tests',
        key: Constant.TEST_TYPES.LIVE,
    }, 
    {
        name: 'My Tests',
        key: Constant.TEST_TYPES.MY_TEST,
    },
    {
        name: 'Practice',
        key: Constant.TEST_TYPES.PRACTICE,
    }];

    const [state, setState] = useState({
        activeTab: '',
    });

    useEffect(() => {
        if(props.activeTab) {
            setState(prev => {
                return { ...prev, activeTab: props.activeTab };
            })
        }
    }, [props.activeTab])

    const handlePress = (key)=> {
        setState(prev=> {
            return { ...prev, activeTab: key }
        })
        props?.setActiveTab(key);
    }
    return(
        <View style={tabStyles.SUB_CONT}>
            {console.info({activeTabHere: state.activeTab})}
            {tabs.map(tab => {
                return(
                    <TouchableHighlight onPress={() => handlePress(tab.key)} style={{...COMMON_STYLES.BODY_TABS, ...( state.activeTab === tab.key ? COMMON_STYLES.ACTIVE : {})}} key={tab.key}>
                        <Text style={{...COMMON_STYLES.BODY_TABS_TEXT, ...( state.activeTab === tab.key ? COMMON_STYLES.ACTIVE_TEXT : {})}}>{tab.name}</Text>
                    </TouchableHighlight>
                )
            })}
        </View>
    )
}

export default Tabs;