import { useEffect, useState } from 'react';
import {View, TouchableHighlight, Text} from 'react-native';

import { tabStyles } from './tabStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';

const Tabs = ({ tabList, activeTab, setActiveTab }) => {
    const [state, setState] = useState({
        activeTab: '',
    });

    useEffect(() => {
        if(activeTab) {
            setState(prev => {
                return { ...prev, activeTab: activeTab };
            })
        }
    }, [activeTab])

    const handlePress = (key)=> {
        setState(prev=> {
            return { ...prev, activeTab: key }
        })
        setActiveTab(key);
    }
    return(
        <View style={tabStyles.SUB_CONT}>
            {console.info({activeTabHere: state.activeTab})}
            {tabList.map(tab => {
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