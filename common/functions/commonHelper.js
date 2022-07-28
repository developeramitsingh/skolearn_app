import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';

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