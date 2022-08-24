import * as Updates from 'expo-updates';
export const ASSEST_URLS = {
    LOGO: 'https://ik.imagekit.io/nwxotnqhh/logo.png',
};

export const APP_COLORS = {
    blue: '#1E90FF',
    blueGreen: '#25B0B9',
    yellow: '#FFD81B',
    green: '#95F189',
    orange: '#FF991B',
    skyBlue: '#1BE1FF',
    grey: '#3D3D3D',
    light_grey: '#C1C1C1',
    white: '#fff',
    black: '#000',
    black_opacity: '#00000050',
    white_opacity: '#ffffff70',
    grey_opacity: '#ffffff20',
    red: '#fc0303',
};

const PROD_URL= 'https://eeac-2409-4050-2e3c-b4b6-f53e-6456-7e66-9bc7.ngrok.io';
const STAGE_URL= 'https://eeac-2409-4050-2e3c-b4b6-f53e-6456-7e66-9bc7.ngrok.io';
const DEV_URL= 'https://eeac-2409-4050-2e3c-b4b6-f53e-6456-7e66-9bc7.ngrok.io';
const BETA_URL= 'https://eeac-2409-4050-2e3c-b4b6-f53e-6456-7e66-9bc7.ngrok.io';

function getEnvUrl() {
  try {
    const releaseChannel = Updates.releaseChannel;
    console.info({releaseChannel});

    if (releaseChannel.startsWith('prod')) {
      // matches prod-v1, prod-v2, prod-v3
      return { envName: 'PRODUCTION', backendUrl: PROD_URL };
    } else if (releaseChannel.startsWith('beta')) {
      // matches staging-v1, staging-v2
      return { envName: 'BETA', backendUrl: BETA_URL };
    } else if (releaseChannel.startsWith('staging')) {
      // assume any other release channel is development
      return { envName: 'STAGING', backendUrl: STAGE_URL };
    } else if (releaseChannel.startsWith('dev')) {
      // assume any other release channel is development
      return { envName: 'DEVELOPMENT', backendUrl: DEV_URL };
    } else {
      return { envName: 'DEFAULT', backendUrl: STAGE_URL };
    }
  } catch (err) {
    console.error(err);
  }
  
  return { envName: 'DEFAULT', backendUrl: STAGE_URL }
}

export const BACKEND_URL = getEnvUrl()?.backendUrl;

export const TEST_TYPES = {
    LIVE: 'live',
    MY_TEST: 'mytest',
    PRACTICE: 'practice',
};

export const TEST_CARD_COLORS = [APP_COLORS.blue, APP_COLORS.blueGreen, APP_COLORS.green, APP_COLORS.white, APP_COLORS.yellow, APP_COLORS.orange, APP_COLORS.skyBlue, APP_COLORS.blue, APP_COLORS.blueGreen, APP_COLORS.green];

export const ROUTES = {
    HOME: 'Home',
    DASHBOARD: 'Dashboard',
    LOGIN: 'Login',
    REGISTER: 'Register',
    WALLET: 'Wallet',
    TEST: 'Test',
    HELP: 'Help',
    VERIFY_OTP: 'VerifyOtp',
    ATTEMPT: 'Attempt',
    RESULT_SCREEN: 'ResultScreen',
    TEST_TIMER_SCREEN: 'TestTimerScreen',
    PROFILE: 'Profile',
    EDIT_PROFILE: 'EditProfile',
    NOTIFICATION: 'notification',
};

export const SCREENS = {
    TEST_LIST: 'TestLists',
    WALLET: 'Wallet',
    HELP: 'Help',
};

export const TEST_TIME_LIMIT = 5;

export const CLOSE_MODAL = 'closeModal';

export const ACTION_TYPES = {
    UPDATE_BANK_DETAIL : 'updateBankDetail',
    UPDATE_PAN_DETAIL : 'updatePanDetail',

    CREATE_TICKET: 'createTicket',
    OPEN_TICKET: 'openTicket',

    OPEN_PROFILE: 'openProfile',
    OPEN_NOTIFI: 'openNotification',
};

export const STORAGE_KEYS = {
    FAILED_TEST_RESPONSE: 'failed-test-response',
    LOCAL_APP_NOTIFI_COUNT: 'local-app-notifi-count',

    OTP_TOKEN: 'otp-token',
    USER_TOKEN: 'user-token',
    USER_ID: 'user-id',
    USER: 'user',

    EXPO_USER_PUSH_TOKEN: 'expo-user-push-token',
    TEMP_EXPO_PUSH_TOKEN: 'temp-expo-push-token',
}

export const DASHBOARD_TEST_TABS = [{
  name: 'Live Tests',
  key: TEST_TYPES.LIVE,
}, 
{
  name: 'My Tests',
  key: TEST_TYPES.MY_TEST,
},
{
  name: 'Practice',
  key: TEST_TYPES.PRACTICE,
}];


export const HELP_TAB_TYPE = {
  MY_TICKET: 'my-ticket',
  LIVE_CHAT: 'live-chat',
};

export const HELP_TABS = [
  {
    name: 'My Tickets',
    key: HELP_TAB_TYPE.MY_TICKET,
  }, 
  {
    name: 'Live Chat',
    key: HELP_TAB_TYPE.LIVE_CHAT,
  }, 
];

export const NOTIFICATION_DATA_KEYS = {
  ROUTE: 'route'
}

export const SHARE_TEXT = 'Share this app link is here https://st.depositphotos.com/1770836/1372/i/600/depositphotos_13720433-stock-photo-young-indian-student.jpg'