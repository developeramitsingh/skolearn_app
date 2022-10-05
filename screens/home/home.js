import { View, Text, ImageBackground, Pressable, SafeAreaView, Linking, Alert } from 'react-native';
import { homeStyles } from './homeStyles';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import * as Constant from '../../constant/constant';

import backImage from '../../assets/background.png';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {  Platform } from 'react-native';
import { handleLinkOpen } from '../../common/functions/commonHelper';

import { getFromStorage, saveToStorage } from '../../utils/utils';
import { sendAppLogService, userService } from '../../services/index';

import Loader from '../../components/loader/loader';
import { LANGUAGES_DATA } from '../../constant/language';
import Slideshow from '../../components/slideshow/slideshow';

//push notification functions
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
const Home = ({navigation}) => {
    //this holds the notification alerts
    const notificationListener = useRef();
    //this holds responses if user clicks on notification
    const responseListener = useRef();
    
    const [isLoading, setLoading] = useState(true);
    const [lang, setLang] = useState();

    const checkIfUserLoggedIn = async () => {
      try {
          console.info('checkIfUserLoggedIn called');
          //const user = await userService.getLoggedInUser();
          const user  = await getFromStorage(Constant.STORAGE_KEYS.USER);

          if (user) {
            console.info(`user is logged in`);
            console.info(user);
            navigation.navigate(Constant.ROUTES.DASHBOARD, { user });
          }
      } catch(err) {
        console.error(`error in checkIfUserLoggedIn: ${err}`);
      }

      setLoading(false);
    }

    const checkAndSaveLanguage = async () => {
      try {
        let savedLang = await getFromStorage(Constant.STORAGE_KEYS.CURRENT_LANGUAGE);
        setLang(savedLang);

        if (savedLang) {
          return;
        }

        Alert.alert('Select Language', 'Select any Language', [
          {
            text: 'Hindi', onPress: ()=> {
              savedLang = Constant.LANGUAGES.HINDI;
              saveToStorage(Constant.STORAGE_KEYS.CURRENT_LANGUAGE, savedLang);
              setLang(savedLang);
            }
          },
          {
            text: 'English', onPress: ()=> {
              savedLang = Constant.LANGUAGES.ENGLISH;
              saveToStorage(Constant.STORAGE_KEYS.CURRENT_LANGUAGE, savedLang);
              setLang(savedLang);
            }
          }
        ]);
      } catch (err) {
        console.error(`error in checkAndSaveLanguage: ${err}`);
      }
    }

    useEffect(()=> {
        //--------------push notification setup ---------------------------//
        initNotificationSetup(notificationListener, responseListener, navigation);

        //check if language is saved or not
        checkAndSaveLanguage();
        //check if user is already logged in
        checkIfUserLoggedIn();
        

        
        return () => {
            removeNotificationListeners(notificationListener, responseListener);
        };
    }, [navigation]);

    const handlePress = (btnType)=> {
        //sets color when btn pressed
        // setState(prev => {
        //     return {...prev, [btnType]: !state[btnType] }
        // })

        if(btnType === 'login') {
            navigation.navigate('Login');
        } else if(btnType === 'register') {
            navigation.navigate('Register');
        }
    }

  return (
      <SafeAreaView style={homeStyles.container}>
          <Loader isLoading={isLoading}/>
          <ImageBackground source={{ uri: 'https://ik.imagekit.io/nwxotnqhh/splashfinal_BnUFAQxRr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664917251827'}} style={homeStyles.backImage}>
            <View style ={homeStyles.tagLineView}>
                <Text style={homeStyles.tagLine}>
                  {LANGUAGES_DATA[lang]?.HOME?.HEADING}
                </Text>
            </View>

            {/* <Slideshow/> */}
            

            <View style={homeStyles.loginBtnContainter}>
                <Pressable elevation={3} handlePress={() => handlePress('login')} onPressOut={() => handlePress('login')} onPressIn={() => handlePress('login')} onPress= {handlePress} style={COMMON_STYLES.BTN_1}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>{LANGUAGES_DATA[lang]?.HOME?.LOGIN_TXT}</Text>
                </Pressable>

                <Pressable elevation={3} handlePress={() => handlePress('register')} onPressOut={() => handlePress('register')} onPressIn={() => handlePress('register')} style={COMMON_STYLES.BTN_1}>
                    <Text style={COMMON_STYLES.BTN_TEXT}>{LANGUAGES_DATA[lang]?.HOME?.REGISTER_TXT}</Text>
                </Pressable>
            </View>

            {/* <Text style={COMMON_STYLES.BODY_TEXT_WHITE}>{LANGUAGES_DATA[lang]?.HOME?.TERMS_TXT}<Text style={COMMON_STYLES.LINK_TEXT} onPress={()=>Linking.openURL(`${Constant.BACKEND_URL}/terms`)}> {LANGUAGES_DATA[lang]?.HOME?.TERMS_LINK}</Text></Text> */}
        </ImageBackground>
      </SafeAreaView>
  )
}

export default Home;



async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  
  //get the push token and subscribe the push service
  const initNotificationSetup = (notificationListener, responseListener, navigation) => {
    registerForPushNotificationsAsync().then(token => {
      //save the token in local storage and on server
      saveExpoToken(token?.toString());
    });
  
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      //setNotification(notification);
      console.info(notification);
    });
  
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //handle click of notificaton by user
      if (response?.notification?.request?.content) {
        handleClickNotification(response.notification.request.content, navigation);
      }
    });
  }
  
  const removeNotificationListeners = (notificationListener, responseListener) => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  }
  
  //save expo push token to local and on server
  const saveExpoToken = async (_expoToken) => {
    console.info(`saveExpoToken called`);
    const expoKey = Constant.STORAGE_KEYS.EXPO_USER_PUSH_TOKEN;
    const existingExpoToken = await getFromStorage(expoKey);
    const userId = await getFromStorage(Constant.STORAGE_KEYS.USER_ID);
  
    console.info({ existingExpoToken, userId});
    sendAppLogService.sendAppLogs({ msg: { existingExpoToken, _expoToken, userId} });
    
    //if token is not found and user is logged in or regisered then save the token
    if (!existingExpoToken && userId) {
      const logMsg = `expo push token is not saved, saving now:: userId ${userId}::${existingExpoToken}`;
      console.info(logMsg);
      sendAppLogService.sendAppLogs({ msg: logMsg });
  
      saveToStorage(expoKey, _expoToken);
      userService.updateUser({ id: userId, expoPushToken: _expoToken }).then(res => console.info('expo token updated', res));
  
    } else if (existingExpoToken && userId && existingExpoToken !== _expoToken?.toString()) {
      /* if token is found but not matching with new token and
        user is loggedIn or regisered then save the token
      */
      const logMsg = `expo push token is not matching:: userId ${userId}::${JSON.stringify({ existingExpoToken, _expoToken })}`;
      console.info(logMsg);
      sendAppLogService.sendAppLogs({ msg: logMsg });
  
      saveToStorage(expoKey, _expoToken);
      userService.updateUser({ id: userId, expoPushToken: _expoToken });
    } else if (existingExpoToken && userId) {
      const getUser =  await userService.getUserById(userId);
      const savedServerToken = getUser?.data?.expoPushToken?.toString();

      if (!savedServerToken) {
        const logMsg = `server expo push token not found then updating on server:: userId ${userId}::${JSON.stringify({ existingExpoToken, _expoToken })}`;
        console.info(logMsg);
        userService.updateUser({ id: userId, expoPushToken: _expoToken });
      } else if(savedServerToken != _expoToken) {
        const logMsg = `server expo push token not matched hence updating on server:: userId ${userId}::${JSON.stringify({ existingExpoToken, _expoToken })}`;
        console.info(logMsg);
        userService.updateUser({ id: userId, expoPushToken: _expoToken });
      }
    }

    console.info(`saveExpoToken ended here`);
  }
  
  const handleClickNotification = (notificationContent, navigation) => {
    const data = notificationContent?.data;
  
    //if link type is internal screen then navigate to it
    if (data?.type === Constant.NOTIFICATION_DATA_KEYS.ROUTE) {
      console.info(`notificaton data type: ${data.type}`);
      const routeName = data.link;
      const props = data.props;
  
      //open the link internaly
      handleLinkOpen(navigation, routeName, props);
    }
  }