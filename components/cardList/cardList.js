import { FlatList, View, Text, Pressable } from "react-native";
import cardListStyles from "./cardListStyles";
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';

const showSubjects = ({subjects}, isHorizontal)=> {
    return (
        <View style ={[cardListStyles.ROW_LEFT, { marginTop: 5 }]}>
            <Text style={cardListStyles.CARD_LABEL_HEAD}>Subjects</Text>
            { subjects?.map(subject => (
                <Text style={[cardListStyles.CARD_LABEL, !isHorizontal && cardListStyles.CARD_LABEL_VERT]}>{subject?.toUpperCase()}</Text>
            ))}
        </View>
    )
}

const CardList = (props) => {
    const renderCard = ({item})=> {    
        const testListType = props?.testType?.toLowerCase();
        const isLive  = testListType === Constant.TEST_TYPES.LIVE;
        const isMyTest = testListType === Constant.TEST_TYPES.MY_TEST;
        const isPractice = testListType === Constant.TEST_TYPES.PRACTICE;
        const isHorizontal = props.horizontal;

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
            <View elevation={1} key={item.enrolledId ||item._id} style ={[isHorizontal ? cardListStyles.CARD_HORIZONTAL : {...cardListStyles.CARD_VERTICAL }, isMyTest && { paddingBottom: 0 }]}>
                
                <View style ={cardListStyles.ROW}>
                    <View style={[cardListStyles.COL_LEFT, isHorizontal && { maxWidth: 200 }, isPractice && { maxWidth: '100%'}]}>
                        <Text style={cardListStyles.TITLE}>{item.testName}</Text>
                    </View>
                    { 
                        difficultyLevel &&
                        <View style={[cardListStyles.COL_RIGHT, isHorizontal && { backgroundColor: 'white' }]}>
                            <Text style={cardListStyles.LABEL_TEXT}>{difficultyLevel}</Text>
                            <Text style={cardListStyles.LABEL_TEXT_BODY}>{difficultiLevelVal}</Text>
                        </View>
                    }
                </View>

                <View style ={cardListStyles.ROW}>
                    <View style={cardListStyles.COL_LEFT_2}>
                        <Pressable elevation={2} onPress={() => props?.handleBtnPress(item._id, item.enrolledId)} style= {btnStyle.btn}>
                            <Text style = {btnStyle.btnTxt}>{btnText}</Text>
                        </Pressable>
                    </View>
                    { 
                        (isLive || isMyTest) &&
                        <View style={cardListStyles.COL_RIGHT_2}>
                            <View>
                                <Text style={cardListStyles.LABEL_TEXT}>Test Fee</Text>
                                <Text style={cardListStyles.FEE}>{item?.testType !== Constant.TEST_TYPES.PRACTICE ? item.entryFee : 0 } Rs.</Text>
                            </View>
                            
                            
                            <View style = {cardListStyles.COL_RIGHT_SUB}>
                                <View>
                                    <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color={isHorizontal ? Constant.APP_COLORS.white : Constant.APP_COLORS.lightBlue} />
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
                    item.subjects?.length 
                    ? showSubjects(item, isHorizontal)
                    : null
                }
                

                {
                    isMyTest 
                        ?  <Text style={[cardListStyles.CARD_TEST_TYPE, isTestLive && { backgroundColor: Constant.APP_COLORS.blueGreen, color: 'white' } ]}>{testType?.toUpperCase()}</Text>
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