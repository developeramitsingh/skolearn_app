import { useState } from 'react';
import {View, TouchableHighlight, Text} from 'react-native';

import { tabStyles } from './tabStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';

const Tabs = (props) => {
    const tabs = [{
        name: 'Live Tests',
        key: 'liveTests',
    }, 
    {
        name: 'My Tests',
        key: 'myTests',
    },
    {
        name: 'Practice',
        key: 'practiceTests',
    }];

    const [state, setState] = useState({
        activeTab: tabs[0].key,
    });

    const handlePress = (key)=> {
        setState(prev=> {
            return { ...prev, activeTab: key }
        })
        props?.setActiveTab(key);
    }
    return(
        <View style={tabStyles.SUB_CONT}>
            {tabs.map(tab => {
                return(
                    <TouchableHighlight onPress={() => handlePress(tab.key)} style={{...COMMON_STYLES.BODY_TABS, ...( state.activeTab === tab.key ? COMMON_STYLES.ACTIVE : {})}} key={tab.key}>
                        <Text style={COMMON_STYLES.BODY_TABS_TEXT}>{tab.name}</Text>
                    </TouchableHighlight>
                )
            })}
        </View>
    )
}

export default Tabs;