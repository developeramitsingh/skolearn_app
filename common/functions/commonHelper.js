import { Alert, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { sendAppLogService, userService } from '../../services';
import { getFromStorage, saveToStorage } from '../../utils/utils';
import { LANGUAGES, STORAGE_KEYS } from '../../constant/constant';

export const onShare = async (sharingData) => {
    try {
      const result = await Share.share({
        message: sharingData,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.info('shared', result.activityType);
        } else {
          // shared
          console.info('shared 2', result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.info('dismissed', result.activityType);
      }
    } catch (error) {
      alert(error.message);
      console.info(error.message);
    }
};

export const copyToClipboard = (data) => {
  Clipboard.setStringAsync(data);
  console.info('data copied', data);
}

export const pickImage = async () => {
  let uri = '';
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    //allowsEditing: true,
    //aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
      console.log({uri: result.uri});
      uri = result.uri;
  }

  return uri;
};

export const handleLinkOpen = (navigation, link, linkProps) => {
  try {
      sendAppLogService.sendAppLogs({ msg: `openinin link: ${link}` });
      
      const finalProps = {};

      const propsData = linkProps?.split(';') || [];

      for (const prop of propsData) {
          const [key, value] = prop?.split('=') || [];
          finalProps[key] = value;
      }
      
      console.info({finalProps});
      navigation.navigate(link, { ...finalProps });
      sendAppLogService.sendAppLogs({ msg: `opened link: ${link}` });
  } catch(err) {
      sendAppLogService.sendAppLogs({ msg: err });
  }
}

export const checkValidEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email.match(emailRegex) ? true : false;
};

export const checkAndGetIfErrorFound = (errors) => {
  let isErrorFound = false;
  let errorMsg = '';
  for (const errorKey in errors) {
    if (errors[errorKey]) {
      isErrorFound = true;
      errorMsg = errors[errorKey];
      break;
    }
  }

  return { isErrorFound, errorMsg };
}

export const refreshUserInLocal = async (_userId) => {
  try {
    const userId = _userId ? _userId : await getFromStorage(STORAGE_KEYS.USER_ID);

    if (!userId) {
      const msg = 'userId not found in refreshUserInLocal';
      console.warn(msg);
      sendAppLogService.sendAppLogs({ warnMsg: msg })
      return;
    }

    const userFromServer = await userService.getUserById(userId);

    if (!userFromServer?.data) {
      const msg = `user not found in refreshUserInLocal:: userId:${userId}`;
      console.warn(msg);
      sendAppLogService.sendAppLogs({ warnMsg: msg })
      return;
    }

    if (userFromServer?.data) {
      saveToStorage(STORAGE_KEYS.USER, userFromServer?.data);
      const msg = `user refreshed in refreshUserInLocal:: userId:${userId}`;
      console.info(msg);
      sendAppLogService.sendAppLogs({ info: msg })
    }
  } catch (err) {
    const errMsg = `error in refreshUserInLocal: ${err}`;
    console.error(errMsg);
    sendAppLogService.sendAppLogs({ errMsg })
  } 
}

export const showAlert = (title, message) => {
  Alert.alert(title, message, [{
    text: 'Close', onPress: () => {}
  }]);
}

export const setCurrentLanguage = async (callBack) => {
  const lang =  await getFromStorage(STORAGE_KEYS.CURRENT_LANGUAGE);

  callBack(lang || LANGUAGES.ENGLISH);

  return lang;
}