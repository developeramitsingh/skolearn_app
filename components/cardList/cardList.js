import { FlatList, View, Text, Pressable } from "react-native";
import cardListStyles from "./cardListStyles";
import {FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';

const CardList = (props) => {
    const renderCard = ({item})=> {        
        const testListType = props?.testType?.toLowerCase();
        const isLive  = testListType === Constant.TEST_TYPES.LIVE;
        const isMyTest = testListType === Constant.TEST_TYPES.MY_TEST;
        const isPractice = testListType === Constant.TEST_TYPES.PRACTICE;

        const testType = item?.testType;

        const isTestLive = testType === Constant.TEST_TYPES.LIVE;

        const difficultyLevel = isLive
            ? 'Difficulty Level'
            : isMyTest
            ? 'Completed on'
            : null;

        const difficultiLevelVal = isLive
            ? item.difficultyLevel?.toUpperCase()
            : isMyTest
            ? item.userCompletedOn
            : null;

        const btnText =
            isLive
                ? 'Participate'
                : isMyTest
                    ? 'View Result'
                : isPractice
                ? 'Practice'
                : ''

        const btnStyle = {
            btn: cardListStyles.CARD_BTN,
            btnTxt: cardListStyles.CARD_BTN_TEXT,
        };

        return (
            <View elevation={1} key={item.enrolledId ||item._id} style ={[props.horizontal ? cardListStyles.CARD_HORIZONTAL : {...cardListStyles.CARD_VERTICAL, backgroundColor: Constant.APP_COLORS.white }, isMyTest && { paddingBottom: 0 }]}>
                
                <View style ={cardListStyles.ROW}>
                    <View style={[cardListStyles.COL_LEFT, props.horizontal && { maxWidth: 200 }, isPractice && { maxWidth: '100%'}]}>
                        <Text style={cardListStyles.TITLE}>{item.testName}</Text>
                    </View>
                    { 
                        difficultyLevel &&
                        <View style={[cardListStyles.COL_RIGHT, props.horizontal && { backgroundColor: 'white' }]}>
                            <Text style={cardListStyles.LABEL_TEXT}>{difficultyLevel}</Text>
                            <Text style={cardListStyles.LABEL_TEXT}>{difficultiLevelVal}</Text>
                        </View>
                    }
                </View>

                <View style ={cardListStyles.ROW}>
                    <View style={cardListStyles.COL_LEFT_2}>
                        <Pressable elevation={3} onPress={() => props?.handleBtnPress(item._id, item.enrolledId)} style= {btnStyle.btn}>
                            <Text style = {btnStyle.btnTxt}>{btnText}</Text>
                        </Pressable>
                    </View>
                    { 
                        (isLive || isMyTest) &&
                        <View style={cardListStyles.COL_RIGHT_2}>
                            <View>
                                <Text style={cardListStyles.LABEL_TEXT}>Test Fee</Text>
                                <Text style={cardListStyles.FEE}>{item?.testType !== Constant.TEST_TYPES.PRACTICE ? item.entryFee : 0 }</Text>
                            </View>
                            
                            
                            <View style = {cardListStyles.COL_RIGHT_SUB}>
                                <View>
                                    <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color={Constant.APP_COLORS.back} />
                                </View>
                                
                                <View>
                                    <Text style={cardListStyles.LABEL_TEXT}>Users Joined</Text>
                                    {
                                        testType !== Constant.TEST_TYPES.PRACTICE 
                                            ? <Text style={cardListStyles.LABEL_TEXT}>{item.userEnrolled}/{item.userSeats}</Text>
                                            : <Text style={cardListStyles.LABEL_TEXT}>{item.userEnrolled}</Text>
                                    }
                                </View>
                            </View>    
                        </View>
                    }
                </View>

                {
                    isMyTest 
                        ?  <Text style={[cardListStyles.CARD_LABEL, isTestLive && { backgroundColor: Constant.APP_COLORS.blueGreen, color: 'white' } ]}>{testType?.toUpperCase()}</Text>
                        : null
                }
            </View>
        )
    }

    return (
        <View style={props.customStyle}>
            <FlatList
                data = { props.dataList || []}
                renderItem ={renderCard}
                keyExtractor ={item => { return item.enrolledId || item._id } }
                horizontal = {props.horizontal ? true : false }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        
    )
}

export default CardList;