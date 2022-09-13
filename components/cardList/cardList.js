import { FlatList, View, Text, TouchableHighlight } from "react-native";
import cardListStyles from "./cardListStyles";
import {FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';
import { useState } from "react";
import { COMMON_STYLES } from "../../common/styles/commonStyles";

const CardList = (props) => {
    const [state, setState] = useState({
    })

    const renderCard = ({item})=> {        
        const testType = props?.testType?.toLowerCase();

        const difficultyLevel = testType ===  Constant.TEST_TYPES.LIVE
            ? 'Difficulty Level'
            : testType === Constant.TEST_TYPES.MY_TEST
            ? 'Completed on'
            : null;

        const difficultiLevelVal = testType ===  Constant.TEST_TYPES.LIVE
            ? item.difficultyLevel
            : testType === Constant.TEST_TYPES.MY_TEST
            ? item.userCompletedOn
            : null;

        const btnText =
            testType === Constant.TEST_TYPES.LIVE
                ? 'Participate'
                : testType === Constant.TEST_TYPES.MY_TEST
                    ? item.isResultDeclared
                    ? 'View Result' 
                    : 'Result Awaited'
                : testType === Constant.TEST_TYPES.PRACTICE
                ? 'Practice'
                : ''

        const btnStyle = {
            btn: {
                ...cardListStyles.CARD_BTN,
                ...(testType === Constant.TEST_TYPES.MY_TEST && !item.isResultDeclared ? COMMON_STYLES.DISABLED : {})
            },
            btnTxt: {
                ...cardListStyles.CARD_BTN_TEXT,
                ...(testType === Constant.TEST_TYPES.MY_TEST && !item.isResultDeclared ? COMMON_STYLES.DISABLED_TEXT : {})
            }
        };

        const isDisabled = testType === Constant.TEST_TYPES.MY_TEST && !item.isResultDeclared ? true : false;
        return (
            <View key={item._id} style ={ props.horizontal ? {...cardListStyles.CARD_HORIZONTAL} : {...cardListStyles.CARD_VERTICAL, backgroundColor: Constant.APP_COLORS.white, }}>
                <View style ={cardListStyles.ROW}>
                    <View style={cardListStyles.COL_LEFT}>
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
                        <TouchableHighlight disabled={isDisabled} onPress={() => props?.handleBtnPress(item._id)} style= {btnStyle.btn}>
                            <Text style = {btnStyle.btnTxt}>{btnText}</Text>
                        </TouchableHighlight>
                    </View>
                    { 
                        [Constant.TEST_TYPES.LIVE, Constant.TEST_TYPES.MY_TEST].includes(props?.testType?.toLowerCase()) &&
                        <View style={cardListStyles.COL_RIGHT_2}>
                            <View>
                                <Text style={cardListStyles.LABEL_TEXT}>Test Fee</Text>
                                <Text style={cardListStyles.FEE}>{item.entryFee}</Text>
                            </View>
                            
                            
                            <View style = {cardListStyles.COL_RIGHT_SUB}>
                                <View>
                                    <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color="blue" />
                                </View>
                                
                                <View>
                                    <Text style={cardListStyles.LABEL_TEXT}>Users Joined</Text>
                                    <Text style={cardListStyles.LABEL_TEXT}>{item.userEnrolled}/{item.userSeats}</Text>
                                </View>
                            </View>    
                        </View>
                    }
                </View>
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