import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';

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