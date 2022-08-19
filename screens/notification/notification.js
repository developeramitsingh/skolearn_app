import { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS } from '../../constant/constant';
import { notificationStyles } from './notificationStyles';
//import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Notification = () => {
    const [state, setState] = useState({
        notifications: [
            {
                _id: '1',
                userId: '',
                title: "Result declared bhai sahab, dekho jara wahan ja kar",
                message: 'Hello your result has been declared',
                type: 'in-app',
                link: '',
            },
            {
                _id: '2',
                userId: '',
                title: "New update Available",
                message: 'Please download the latest app from the following link\n\nImprovements\n1. New User Interface.\n2. bug fixes.',
                type: 'in-app',
                link: 'https://www.skolearn.in/download',
            }
        ],
    });

    const handleDelete = (id) => {
        console.info({id});
        const restNotif = state.notifications.filter((elem => elem._id !== id ));

        //call the delete notification API here

        setState((prev) => {
            return { ...prev, notifications: restNotif }
        })
    }

    const handleLinkOpen = (link) => {
        Linking.openURL(link);
    }

    const allNotifications = state.notifications?.map(notification => {
        return (
            <View key={notification._id} style={[COMMON_STYLES.CARD, { backgroundColor: APP_COLORS.grey}]}>
                <AntDesign style={ notificationStyles.closeBtn } onPress={() => handleDelete(notification._id)} name="closecircleo" size={20} color={APP_COLORS.white} />

                <View style={notificationStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{notification.title}</Text>
                </View>

                <View style={notificationStyles.ROW}>
                    <Text style={[COMMON_STYLES.BODY_TEXT, { lineHeight: 17 } ]}>{notification.message}</Text>
                </View>

                {
                    notification.link 
                    ? <View style={notificationStyles.ROW}>
                        <TouchableOpacity onPress={ ()=> handleLinkOpen(notification.link)} style={COMMON_STYLES.SUB_BTN_2}>
                            <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Go to Link</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
                
                
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