import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableHighlight } from 'react-native';
import { attemptStyles } from './attemptStyles';
import { useState } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {FontAwesome } from '@expo/vector-icons';
import * as Constant from '../../constant/constant';

const Attempt = ({navigation, route }) => {
    const [state, setState] = useState({
        walletMoney: '150',
        freeTickets: 1,
        scholarshipTitle: '10000 Rupees Scholarship',
        usersJoined: 100,
        usersLimit: 500,
        expiresOn: '12/07/2022',
        fee: 49,
        isLangHindi: false,
    })

    const handlePress = ()=> {
        navigation.navigate(Constant.ROUTES.TEST_TIMER_SCREEN, { testId: route?.params?.testId });
    }

    const langSwitch = (val) => {
        console.info(val);
        setState(prev => {
            return { ...prev, isLangHindi: val}
        });
    }
  return (
      <SafeAreaView style={attemptStyles.container}>
          <View style ={COMMON_STYLES.ROW}>
                <View style={attemptStyles.COL_LEFT}>
                    <View>
                        <FontAwesome name="user-circle" size={18} style={{ marginRight: 5}} color="blue" />
                    </View>
                    <View>
                        <Text style={attemptStyles.LABEL_TEXT}>Users Joined</Text>
                        <Text style={attemptStyles.LABEL_TEXT}>{state.usersJoined}/{state.usersLimit}</Text>
                    </View>
                </View>

                <View style={attemptStyles.COL_RIGHT}>
                    <Text style={attemptStyles.LABEL_TEXT}>Expires On</Text>
                    <Text style={attemptStyles.LABEL_TEXT}>{state.expiresOn}</Text>
                </View>
          </View>

          <View style ={COMMON_STYLES.CENTER}>
              <Text style={attemptStyles.LABEL_TEXT}>Wallet: {state.walletMoney} Rupees</Text>
              <Text style={attemptStyles.LABEL_TEXT}>Free Tickets: {state.freeTickets}</Text>
          </View>

          <View style ={COMMON_STYLES.CENTER}>
              <Text style={attemptStyles.HEADING}>
                  {state.scholarshipTitle}
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
              <Text style={attemptStyles.LABEL_TEXT}>Entry fee {state.fee} Rupees</Text>
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
      </SafeAreaView>
  )
}

export default Attempt;