import { SafeAreaView, View, Text, TouchableHighlight, TouchableNativeFeedback, Pressable, FlatList } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {useState} from  'react';
import * as Constant from '../../constant/constant';
import { leaderBoardStyles } from './leaderBoardStyles';
import {Ionicons } from '@expo/vector-icons';

const TAB_TYPE = {
    LEATHER_BOARD: 'leaderBoard',
    SCHOLARSHIP: 'scholarship'
}
const LeaderBoardContent = ({data, activeTab})=> {
    const isleaderBoardTab = activeTab === TAB_TYPE.LEATHER_BOARD;

    const ListItems = ({item}) => {
        return (
            <View elevation={3} key={item.id} style={leaderBoardStyles.ROW_LEATHER_BOARD}>
                <View style={leaderBoardStyles.BODY_LEFT_COL}>
                    <Text style={leaderBoardStyles.LABEL_TEXT}>
                        <Ionicons name="trophy" size={14} color={Constant.APP_COLORS.yellow} />{item.rank}</Text>
                    {
                        isleaderBoardTab &&
                        <>
                            <Text style={leaderBoardStyles.LABEL_TEXT}>{item.userName}</Text>
                            <Text style={leaderBoardStyles.LABEL_TEXT}>{item.userScore}</Text>
                        </>
                    }
                    
                </View>

                <View style={leaderBoardStyles.BODY_RIGHT_COL}>
                    <Text style={leaderBoardStyles.LABEL_TEXT}>{item.scholarship}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{flex: 1}}>
            <View style={{...COMMON_STYLES.ROW, borderBottomWidth: 1, borderBottomColor: Constant.APP_COLORS.light_grey }}>
                <View style={leaderBoardStyles.BODY_LEFT_COL}>
                    <Text style={leaderBoardStyles.TAB_BTN_TEXT}>Rank</Text>
                    {
                        isleaderBoardTab &&
                        <>
                            <Text style={leaderBoardStyles.TAB_BTN_TEXT}>Name</Text>
                            <Text style={leaderBoardStyles.TAB_BTN_TEXT}>Score</Text>
                        </>
                    }  
                    
                </View>

                <View style={leaderBoardStyles.BODY_RIGHT_COL}>
                    <Text style={leaderBoardStyles.TAB_BTN_TEXT}>Scholarship</Text>
                </View>
            </View>            
            <FlatList
                data = { data || []}
                renderItem ={ListItems}
                keyExtractor ={item => item.id}
            />
        </View>
    )
}

const LeaderBoard = ({dataList}) => {
    const [activeTab, setActive] = useState(TAB_TYPE.LEATHER_BOARD);
    const btnStyles = {
        btn: {...leaderBoardStyles.TAB_BTN, },
        btnTxt: { ...leaderBoardStyles.TAB_BTN_TEXT },
        btnActive: { ...leaderBoardStyles.TAB_BTN_ACTIVE },
        btnTxtActive: { ...leaderBoardStyles.TAB_BTN_TEXT_ACTIVE },
    }

    const handleChangeTab = (tabKey) => {
        setActive(tabKey);
    }

    return (
        <View style={leaderBoardStyles.LEATHER_BOARD_CONT_LIGHT}>
            <View style={leaderBoardStyles.BOARD_ROW}>
                <Pressable onPress={()=>handleChangeTab(TAB_TYPE.LEATHER_BOARD)} style={{...btnStyles.btn, ...(activeTab === TAB_TYPE.LEATHER_BOARD ? btnStyles.btnActive : {})}}>
                    <Text style={{ ...btnStyles.btnTxt, ...(activeTab === TAB_TYPE.LEATHER_BOARD ? btnStyles.btnTxtActive : {}) }}>LeaderBoard</Text>
                </Pressable>
                <Pressable onPress={()=>handleChangeTab('scholarshipBreakup')} style={{...btnStyles.btn, ...(activeTab === 'scholarshipBreakup' ? btnStyles.btnActive : {})}}>
                    <Text style={{ ...btnStyles.btnTxt, ...(activeTab === 'scholarshipBreakup' ? btnStyles.btnTxtActive : {}) }}>Scholarship Breakup</Text>
                </Pressable>
            </View>

            <LeaderBoardContent data={dataList} activeTab={activeTab}/>
        </View>
    )
};

export default LeaderBoard;