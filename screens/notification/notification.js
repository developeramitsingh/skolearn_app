import { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Linking } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';
import { notificationStyles } from './notificationStyles';

const Notification = () => {
    const [state, setState] = useState({
        notifications: [
            {
                _id: '1',
                userId: '',
                title: "Result declared",
                message: 'Hello your result has been declared',
                type: 'in-app',
                link: '',
            }
        ],
    });

    const allNotifications = state.notifications?.map(notification => {
        return (
            <View key={notification._id} style={[COMMON_STYLES.CARD, { backgroundColor: APP_COLORS.grey }]}>
                <View style={notificationStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{notification.title}</Text>
                </View>

                <View style={notificationStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{notification.message}</Text>
                </View>
                
            </View>
        );
    });

    return (
        <SafeAreaView style={COMMON_STYLES.CONTAINER}>
            <View style={COMMON_STYLES.ROW}>
                <Text style={COMMON_STYLES.TITLE_TEXT}>Notifications</Text>
            </View>

            <ScrollView style={notificationStyles.CONTAINER}>
                {allNotifications}
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Notification;