import { View, Text, SafeAreaView, Touchable, Pressable, TouchableHighlight } from 'react-native';
import { attemptStyles } from './attemptStyles';
import { useState } from 'react';

import { COMMON_STYLES } from '../../common/styles/commonStyles';
import {FontAwesome } from '@expo/vector-icons';

const Attempt = ({navigation, route }) => {
    const [state, setState] = useState({
        walletMoney: '150',
        freeTickets: 1,
        scholarshipTitle: '10000 Rupees Scholarship',
        usersJoined: 100,
        usersLimit: 500,
        expiresOn: '12/07/2022',
        fee: 49,
    })

    const handlePress = (btnType)=> {
        alert('In Development, will appear in next release');
    }

    const handleChange = (val) => {
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
                  {state.scholarshipTitle}:: id: {route?.params?.testId}
              </Text>
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
            <Text style={attemptStyles.LABEL_TEXT}>
                The result will be announced after user participation seats get full
            </Text>
          </View>
      </SafeAreaView>
  )
}

export default Attempt;