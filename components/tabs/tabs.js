import { useEffect, useState } from 'react';
import {View, Pressable, Text} from 'react-native';

import { tabStyles } from './tabStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { LANGUAGES_DATA } from '../../constant/language';
import { SCREENS } from '../../constant/constant';
import { setCurrentLanguage } from '../../common/functions/commonHelper';

const Tabs = ({ tabList, activeTab, setActiveTab, tabsIn, screen }) => {
    const [state, setState] = useState({
        activeTab: '',
    });
    const [lang, setLang] = useState();

    useEffect(() => {
        setCurrentLanguage(setLang);
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
            {tabList.map(tab => {
                return(
                    <Pressable elevation={3} onPress={() => handlePress(tab.key)} style={{...COMMON_STYLES.BODY_TABS, ...( state.activeTab === tab.key ? COMMON_STYLES.ACTIVE : {})}} key={tab.key}>
                        <Text style={{...COMMON_STYLES.BODY_TABS_TEXT, ...( state.activeTab === tab.key ? COMMON_STYLES.ACTIVE_TEXT : {})}}>{LANGUAGES_DATA[lang]?.[screen]?.[tabsIn]?.TABS?.[tab.key]}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default Tabs;