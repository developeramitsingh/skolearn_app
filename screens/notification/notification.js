import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Linking, TouchableOpacity, BackHandler } from 'react-native';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { APP_COLORS, ROUTES } from '../../constant/constant';
import { notificationStyles } from './notificationStyles';
import {  Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import BackBtn from '../../components/backBtn/backBtn';
import { handleLinkOpen } from '../../common/functions/commonHelper';
import { notificationsService } from '../../services';

const Notification = ({ navigation }) => {
    const [state, setState] = useState({
        notifications: [],
    });
    const backHandler = useRef();

    const getUserNotifications = async () => {
        try {
            const notifications = await notificationsService.getAllNotifications('{ "isRead": false }');
            console.info({notifications});
            if (notifications?.data) {
                setState((prev) => {
                    return { ...prev, notifications: notifications.data }
                });
            }
        } catch (err) {
            console.error(`error in getUserNotification: ${err}`);
        }        
    }

    useEffect(() => {
        getUserNotifications();

        const backAction = () => {
            console.info(`backAction called in notification screen`);
            navigation.navigate(ROUTES.DASHBOARD);
            return true;
          };

          backHandler.current = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => { 
            console.info(`cleaning function in notification screen`);
            backHandler.current.remove();
          };
    }, [])

    const handleDelete = (id) => {
        console.info({id});
        const restNotif = state?.notifications?.filter((elem => elem._id !== id ));

        //call the set read notification API here
        notificationsService.updateNotification({ _id: id, isRead: true })

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
                    <View key={notification._id} style={[COMMON_STYLES.CARD]}>
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
        <SafeAreaView style={COMMON_STYLES.CONTAINER_BLUE}>
            <BackBtn navigation={navigation} routeToGo={ROUTES.DASHBOARD}/>
            <View style={[COMMON_STYLES.ROW_CENTER, { marginBottom: 10 }]}>
                <Text style={COMMON_STYLES.BODY_HEADING_1_WHITE}>Notifications</Text>
            </View>

            <ScrollView style={notificationStyles.CONTAINER}>
                {allNotifications}
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Notification;