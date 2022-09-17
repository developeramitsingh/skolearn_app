import { SafeAreaView, View, Text, TouchableHighlight, TouchableNativeFeedback, Pressable, FlatList, ScrollView } from "react-native";
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {useEffect, useState} from  'react';
import * as Constant from '../../constant/constant';
import { leaderBoardStyles } from './leaderBoardStyles';
import {Ionicons } from '@expo/vector-icons';
import { getFromStorage } from "../../utils/utils";

const TAB_TYPE = {
    LEATHER_BOARD: 'leaderBoard',
    SCHOLARSHIP_BREAKUP: 'scholarshipBreakup'
}
const LeaderBoardContent = ({data, activeTab })=> {
    const [userRankData, setUserRankData] = useState([]);
    const [userId, setUserId] = useState(null);

    const getUserRank = async () => {
        const id = await getFromStorage(Constant.STORAGE_KEYS.USER_ID);

        if(id) {
            if(activeTab === TAB_TYPE.LEATHER_BOARD) {
                const currentUserData = data?.filter(elem => {
                    return elem.userId._id === id;
                });
    
                const len = currentUserData?.length;
 
                const newSortedUserData = [];
                for (let i = len - 1; i >= 0; i-- ) {
                    newSortedUserData.push(currentUserData[i])
                }
                setUserRankData(newSortedUserData);
            }

            setUserId(id);
        }
    }
    useEffect(() => {
        getUserRank();
    }, [data])

    const isleaderBoardTab = activeTab === TAB_TYPE.LEATHER_BOARD;

    const ListItems = ({item, forCurrentUser}) => {
        return (
            <View elevation={3} key={item._id} style={[leaderBoardStyles.ROW_LEATHER_BOARD, forCurrentUser && { backgroundColor: Constant.APP_COLORS.back }]}>
                <View style={leaderBoardStyles.BODY_LEFT_COL}>
                    <Text style={[leaderBoardStyles.LABEL_TEXT, forCurrentUser && { color: 'white'}]}>
                        <Ionicons name="trophy" size={14} color={Constant.APP_COLORS.yellow} />{item.rank ?? '-'}</Text>

                    {/* start For LeatherBoard */}
                    {
                        isleaderBoardTab &&
                        <>
                            <Text style={[leaderBoardStyles.LABEL_TEXT, forCurrentUser && { color: 'white'}]}>{item?.userId?.userName}</Text>
                            <Text style={[leaderBoardStyles.LABEL_TEXT, forCurrentUser && { color: 'white'}]}>{item.score ?? '-'}</Text>
                        </>
                    }
                    {/* end For LeatherBoard */}
                    
                </View>

                <View style={leaderBoardStyles.BODY_RIGHT_COL}>
                    <Text style={[leaderBoardStyles.LABEL_TEXT, forCurrentUser && { color: 'white'} ]}>{item.scholarShip ?? '-'}</Text>
                </View>
            </View>
        )
    }

    const currentUserScore = (isLeatherBoard, userRankScoreData) => {
        return (
            <>
                { 
                    isLeatherBoard && userRankScoreData?.length
                        ?   <ScrollView style={{ maxHeight: '12%' }}>
                                {userRankScoreData.map(userRank => ListItems({ item: userRank, forCurrentUser: true }) )}
                            </ScrollView>
                        :  null
                }
            </>
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

            {/* Show current user rank and score on Top of the list */}
            { currentUserScore(isleaderBoardTab, userRankData)}

            <FlatList
                data = { 
                    isleaderBoardTab && data
                    ? data?.filter(elem => elem?.userId?._id !== userId) 
                    : data
                    ? data
                    : []
                }
                renderItem ={ListItems}
                keyExtractor ={item => item._id}
            />
        </View>
    )
}

const LeaderBoard = ({leaderBoardData, scholarShipBreakUp}) => {
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
                <Pressable onPress={()=>handleChangeTab('scholarshipBreakup')} style={{...btnStyles.btn, ...(activeTab === TAB_TYPE.SCHOLARSHIP_BREAKUP ? btnStyles.btnActive : {})}}>
                    <Text style={{ ...btnStyles.btnTxt, ...(activeTab === TAB_TYPE.SCHOLARSHIP_BREAKUP ? btnStyles.btnTxtActive : {}) }}>Scholarship Breakup</Text>
                </Pressable>
            </View>

            <LeaderBoardContent data={activeTab === TAB_TYPE.LEATHER_BOARD ? leaderBoardData : scholarShipBreakUp} activeTab={activeTab}/>
        </View>
    )
};

export default LeaderBoard;