import { View, Text, Alert, SafeAreaView, Switch, TouchableHighlight, BackHandler } from 'react-native';
import { attemptStyles } from './attemptStyles';
import { useState, useEffect } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';
import BackBtn from '../../components/backBtn/backBtn';

const Attempt = ({navigation, route }) => {
    const [state, setState] = useState({
        walletMoney: '150',
        freeTickets: 1,
        testName: '',
        userEnrolled: 0,
        userSeats: 0,
        expireOn: '',
        entryFee: 0,
        isLangHindi: false,
    })

    const handlePress = ()=> {
        const alertMsg= 'We need to use camera and microphone for security and transparency purpose, Please remove any headphone or headset before the test.';
        
        Alert.alert('Test Requirements', alertMsg, [
            {
                text: 'Cancel Attempt', onPress: () => {
                    console.info(`cancelled`);
                }
            },
            {
                text: 'Ok To Proceed', onPress: () => {
                    navigation.navigate(Constant.ROUTES.TEST_TIMER_SCREEN, { testId: route?.params?.testId });
                }
            },
            
        ]);   
    }

    useEffect(()=> {
        if(route?.params?.test) {
            setState((prev) => {
                return { ...prev, ...route.params.test }
            })
        }

        const backAction = () => {
            console.info(`backAction called in attempt screen`);
            navigation.navigate(Constant.ROUTES.DASHBOARD);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
    }, [route?.params?.test]);

    const langSwitch = (val) => {
        console.info(val);
        setState(prev => {
            return { ...prev, isLangHindi: val}
        });
    }
  return (
      <SafeAreaView style={attemptStyles.container}>
        <BackBtn navigation={navigation} routeToGo={Constant.ROUTES.DASHBOARD} color={Constant.APP_COLORS.black}/>

        <View style={[attemptStyles.container, { justifyContent: 'space-between' } ]}>
            <View style ={COMMON_STYLES.ROW}>
                    <View style={attemptStyles.COL_LEFT}>
                        <View>
                            <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color="blue" />
                        </View>
                        <View>
                            <Text style={attemptStyles.LABEL_TEXT}>Users Joined</Text>
                            <Text style={attemptStyles.LABEL_TEXT}>{state.userEnrolled}/{state.userSeats}</Text>
                        </View>
                    </View>

                    <View style={attemptStyles.COL_RIGHT}>
                        <Text style={attemptStyles.LABEL_TEXT}>Expires On</Text>
                        <Text style={attemptStyles.LABEL_TEXT}>{state.expireOn}</Text>
                    </View>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.LABEL_TEXT}>Wallet: {state.walletMoney} Rupees</Text>
                <Text style={attemptStyles.LABEL_TEXT}>Free Tickets: {state.freeTickets}</Text>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.HEADING}>
                    {state.testName}
                </Text>
            </View>

            <View>
                <Text style={[COMMON_STYLES.BODY_TITLE_BLACK, COMMON_STYLES.CENTER]}>Select Language</Text>
                <View style ={COMMON_STYLES.ROW_CENTER}>
                    <Text>Default (English)</Text>
                    <Switch
                        trackColor={{ false: Constant.APP_COLORS.blue, true: Constant.APP_COLORS.yellow }}
                        thumbColor={state.isLangHindi ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={langSwitch}
                        value={state.isLangHindi}
                    />
                    <Text>Hindi</Text>
                    </View>
            </View>

            <TouchableHighlight style ={COMMON_STYLES.BTN_1} onPress={handlePress}>
                <Text style = {COMMON_STYLES.BTN_TEXT}>Attempt</Text>
            </TouchableHighlight>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.LABEL_TEXT}>Entry entryFee {state.entryFee} Rupees</Text>
                <Text style={attemptStyles.LABEL_TEXT}>or 1 Ticket</Text>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.LABEL_TEXT}>1 free ticket or wallet money will be deducted for attempting the test</Text>
            </View>

            <View style ={COMMON_STYLES.CENTER}>
                <Text style={attemptStyles.NOTICE_TEXT}>
                    Your device camera and microphone will be enabled for security purpose, Please remove any headphone or headset before the test.
                </Text>
            </View>
        </View>
      </SafeAreaView>
  )
}

export default Attempt;