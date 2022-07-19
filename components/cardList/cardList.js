import { FlatList, View, Text, TouchableHighlight } from "react-native";
import cardListStyles from "./cardListStyles";
import {FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';
import { useState } from "react";

const CardList = (props) => {
    const [state, setState] = useState({
    })

    const renderCard = ({item})=> {
        const expireLabel = item.listType?.toLowerCase() ===    Constant.TEST_TYPES.LIVE
            ? 'Expires on'
            : item.listType?.toLowerCase() === Constant.TEST_TYPES.MY_TEST
            ? 'Completed on'
            : null;

        const btnText =
            item.listType?.toLowerCase() === Constant.TEST_TYPES.LIVE
                ? 'Participate'
                : item.listType?.toLowerCase() === Constant.TEST_TYPES.MY_TEST
                ? 'View Result'
                : item.listType?.toLowerCase() === Constant.TEST_TYPES.PRACTICE
                ? 'Practice'
                : ''
        const color = Constant.TEST_CARD_COLORS[Math.floor(Math.random()*10)];
        return (
            <View style ={ props.horizontal ? {...cardListStyles.CARD_HORIZONTAL} : {...cardListStyles.CARD_VERTICAL, backgroundColor: color}}>
                <View style ={cardListStyles.ROW}>
                    <View style={cardListStyles.COL_LEFT}>
                        <Text style={cardListStyles.TITLE}>{item.title}</Text>
                    </View>
                    { 
                        expireLabel &&
                        <View style={cardListStyles.COL_RIGHT}>
                            <Text style={cardListStyles.LABEL_TEXT}>{expireLabel}</Text>
                            <Text style={cardListStyles.LABEL_TEXT}>{item.expiresOn}</Text>
                        </View>
                    }
                </View>

                <View style ={cardListStyles.ROW}>
                    <View style={cardListStyles.COL_LEFT_2}>
                        <TouchableHighlight onPress={() => props?.handleBtnPress(item.id)} style= {cardListStyles.CARD_BTN}>
                            <Text style = {cardListStyles.CARD_BTN_TEXT}>{btnText}</Text>
                        </TouchableHighlight>
                    </View>
                    { 
                        [Constant.TEST_TYPES.LIVE, Constant.TEST_TYPES.MY_TEST].includes(item.listType?.toLowerCase()) &&
                        <View style={cardListStyles.COL_RIGHT_2}>
                            <View>
                                <Text style={cardListStyles.LABEL_TEXT}>Entry Fee</Text>
                                <Text style={cardListStyles.FEE}>{item.entryFee}</Text>
                            </View>
                            
                            
                            <View style = {cardListStyles.COL_RIGHT_SUB}>
                                <View>
                                    <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color="blue" />
                                </View>
                                
                                <View>
                                    <Text style={cardListStyles.LABEL_TEXT}>Users Joined</Text>
                                    <Text style={cardListStyles.LABEL_TEXT}>{item.usersJoined}/{item.usersLimit}</Text>
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
                keyExtractor ={item => item.id}
                horizontal = {props.horizontal ? true : false }
            />
        </View>
        
    )
}

export default CardList;