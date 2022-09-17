import { FlatList, View, Text, TouchableHighlight } from "react-native";
import cardListStyles from "./cardListStyles";
import {FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';

const CardList = (props) => {
    const renderCard = ({item})=> {        
        const testType = props?.testType?.toLowerCase();
        const isLive  = testType === Constant.TEST_TYPES.LIVE;
        const isMyTest = testType === Constant.TEST_TYPES.MY_TEST;
        const isPractice = testType === Constant.TEST_TYPES.PRACTICE;

        const difficultyLevel = isLive
            ? 'Difficulty Level'
            : isMyTest
            ? 'Completed on'
            : null;

        const difficultiLevelVal = isLive
            ? item.difficultyLevel
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
            <View elevation={3} key={item._id} style ={[props.horizontal ? cardListStyles.CARD_HORIZONTAL : {...cardListStyles.CARD_VERTICAL, backgroundColor: Constant.APP_COLORS.white }, isMyTest && { paddingBottom: 0 }]}>
                
                <View style ={cardListStyles.ROW}>
                    <View style={[cardListStyles.COL_LEFT, props.horizontal && { maxWidth: 200 }, isPractice && { maxWidth: '100%'}]}>
                        <Text style={cardListStyles.TITLE}>{item.testName}</Text>
                    </View>
                    { 
                        difficultyLevel &&
                        <View style={[cardListStyles.COL_RIGHT, props.horizontal && { backgroundColor: 'white' }]}>
                            <Text style={cardListStyles.LABEL_TEXT}>{difficultyLevel}</Text>
                            <Text style={cardListStyles.LABEL_TEXT_BODY}>{difficultiLevelVal}</Text>
                        </View>
                    }
                </View>

                <View style ={cardListStyles.ROW}>
                    <View style={cardListStyles.COL_LEFT_2}>
                        <TouchableHighlight onPress={() => props?.handleBtnPress(item._id)} style= {btnStyle.btn}>
                            <Text style = {btnStyle.btnTxt}>{btnText}</Text>
                        </TouchableHighlight>
                    </View>
                    { 
                        [Constant.TEST_TYPES.LIVE, Constant.TEST_TYPES.MY_TEST].includes(props?.testType?.toLowerCase()) &&
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
                                    <Text style={cardListStyles.LABEL_TEXT}>{item.userEnrolled}/{item.userSeats}</Text>
                                </View>
                            </View>    
                        </View>
                    }
                </View>

                {
                    isMyTest 
                        ?  <Text style={cardListStyles.CARD_LABEL}>{item.testType?.toUpperCase()}</Text>
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
                keyExtractor ={item => item._id}
                horizontal = {props.horizontal ? true : false }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        
    )
}

export default CardList;