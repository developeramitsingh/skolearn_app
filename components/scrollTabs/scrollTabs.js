import React, { useEffect, useState } from 'react';
import {View, Pressable, Text, ScrollView} from 'react-native';

import { scrollTabStyles } from './scrollTabStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { LANGUAGES_DATA } from '../../constant/language';
import { setCurrentLanguage } from '../../common/functions/commonHelper';

const ScrollTabs = ({ tabList, activeTab, setActiveTab, tabsIn, screen }) => {
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
        <ScrollView style={scrollTabStyles.SUB_CONT} horizontal={true} showsHorizontalScrollIndicator={false}>
            {tabList.map(tab => {
                return(
                    <Pressable onPress={() => handlePress(tab.key)} style={{...scrollTabStyles.BODY_TABS, ...( state.activeTab === tab.key ? COMMON_STYLES.ACTIVE_TAB : {})}} key={tab.key}>
                        <Text style={{...scrollTabStyles.BODY_TABS_TEXT, ...( state.activeTab === tab.key ? COMMON_STYLES.ACTIVE_TEXT_TAB : {})}}>{LANGUAGES_DATA[lang]?.[screen]?.[tabsIn]?.CAT_TABS?.[tab.key]}</Text>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}

export default  React.memo(ScrollTabs);