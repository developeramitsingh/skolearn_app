import { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES } from '../../constant/constant';
import { notificationStyles } from './notificationStyles';
import {  Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import BackBtn from '../../components/backBtn/backBtn';
import { handleLinkOpen } from '../../common/functions/commonHelper';

const Notification = ({ navigation }) => {
    const [state, setState] = useState({
        notifications: [
            {
                _id: '1',
                userId: '',
                title: "Result declared bhai sahab, dekho jara wahan ja kar",
                message: 'Hello your result has been declared',
                type: 'in-app',
                link: 'Dashboard',
                props: 'activeScreen=TestLists;activeTab=mytest'
            },
            {
                _id: '2',
                userId: '',
                title: "Paise kamm hai wallet me",
                message: 'Jayo aur add karo jaldi',
                type: 'in-app',
                link: 'Dashboard',
                props: 'activeScreen=Wallet'
            },
        ],
    });

    const handleDelete = (id) => {
        console.info({id});
        const restNotif = state.notifications.filter((elem => elem._id !== id ));

        //call the set read notification API here

        setState((prev) => {
            return { ...prev, notifications: restNotif }
        })
    }

    const renderLeftAction = () =>{
        return (
            <View style={[COMMON_STYLES.CARD, { backgroundColor: APP_COLORS.grey_opacity, width: '100%'}]}>
                <View style={[notificationStyles.ROW_CENTER, { alignItems: 'center', justifyContent: 'flex-start' }]}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>Delete</Text>
                </View>
            </View>
        )
    }
    const allNotifications = state.notifications?.map(notification => {
        return (
            <GestureHandlerRootView key={notification._id}>
                <Swipeable 
                    renderLeftActions={renderLeftAction}
                    onSwipeableLeftOpen={() => handleDelete(notification._id)}
                >
                    <View key={notification._id} style={[COMMON_STYLES.CARD, { backgroundColor: APP_COLORS.grey}]}>
                        <View style={notificationStyles.ROW}>
                            <Text style={COMMON_STYLES.BODY_TITLE}>{notification.title}</Text>
                        </View>

                        <View style={notificationStyles.ROW}>
                            <Text style={[COMMON_STYLES.BODY_TEXT, { lineHeight: 17 } ]}>{notification.message}</Text>
                        </View>

                        {
                            notification.link 
                            ? <View style={notificationStyles.ROW}>
                                <TouchableOpacity onPress={ ()=> handleLinkOpen(navigation, notification.link, notification.props)} style={COMMON_STYLES.SUB_BTN_2}>
                                    <Text style={COMMON_STYLES.SUB_BTN_TXT_2}>Go to Link</Text>
                                </TouchableOpacity>
                            </View>
                            : null
                        }
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    });

    return (
        <SafeAreaView style={COMMON_STYLES.CONTAINER}>
            <BackBtn navigation={navigation} routeToGo={ROUTES.DASHBOARD}/>
            <View style={[COMMON_STYLES.ROW_CENTER, { marginBottom: 10 }]}>
                <Text style={COMMON_STYLES.BODY_HEADING_1}>Notifications</Text>
            </View>

            <ScrollView style={notificationStyles.CONTAINER}>
                {allNotifications}
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Notification;