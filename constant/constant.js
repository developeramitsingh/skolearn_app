import * as Updates from 'expo-updates';

export const APP_VERSION = '1.0.0';

export const ASSEST_URLS = {
    LOGO: 'https://ik.imagekit.io/nwxotnqhh/logo.png',
};

export const APP_COLORS = {
    blue: '#1E90FF',
    appBlue: '#222957', 
    blueGreen: '#25B0B9',
    yellow: '#FFD81B',
    green: '#26d606',
    orange: '#FF991B',
    skyBlue: '#1BE1FF',
    lightBlue: '#bedbfa',
    grey: '#3D3D3D',
    light_grey: '#C1C1C1',
    white: '#fff',
    back: '#222957',
    black: '#000',
    black_opacity: '#00000050',
    white_opacity: '#ffffff70',
    grey_opacity: '#ffffff20',
    red: '#fc0303',
    lightGrey2: '#f7f7f7',
    backPanelColor: '#Edf3ff',
    lightYellow: '#feffe8',
};

const PROD_URL= 'https://skolearn.herokuapp.com';
const STAGE_URL= 'https://0bee-2409-4050-2d34-7dcb-e54d-b236-245b-89af.in.ngrok.io';
const DEV_URL= 'https://0bee-2409-4050-2d34-7dcb-e54d-b236-245b-89af.in.ngrok.io';
const BETA_URL= 'https://skolearn.herokuapp.com';

export const ENVS = {
  STAGING: 'staging',
  PROD: 'production',
  DEV: 'development',
  BETA: 'beta',
  DEFAULT: 'default',
};

function getEnvUrl() {
  try {
    const releaseChannel = Updates.releaseChannel;
    console.info({releaseChannel});

    if (releaseChannel.startsWith('prod')) {
      // matches prod-v1, prod-v2, prod-v3
      return { envName: ENVS.PROD, backendUrl: PROD_URL };
    } else if (releaseChannel.startsWith('beta')) {
      // matches staging-v1, staging-v2
      return { envName: ENVS.BETA, backendUrl: BETA_URL };
    } else if (releaseChannel.startsWith('staging')) {
      // assume any other release channel is development
      return { envName: ENVS.STAGING, backendUrl: STAGE_URL };
    } else if (releaseChannel.startsWith('dev')) {
      // assume any other release channel is development
      return { envName: ENVS.DEV, backendUrl: DEV_URL };
    } else {
      return { envName: ENVS.DEFAULT, backendUrl: DEV_URL };
    }
  } catch (err) {
    console.error(err);
  }
  
  return { envName: ENVS.DEFAULT, backendUrl: STAGE_URL }
}

export const BACKEND_URL = getEnvUrl()?.backendUrl;
export const APP_ENV = getEnvUrl()?.envName;

//Test Keys
const PAYTM_MERCHANT_ID_TEST = 'ROZYPs29556505548094';
//PROD KEYS
const PAYTM_MERCHANT_ID_PROD = 'ivIILa37249090069885';

export const PAYTM_MERCHANT_ID = APP_ENV === ENVS.PROD ?  PAYTM_MERCHANT_ID_PROD: PAYTM_MERCHANT_ID_TEST;
export const PAYTMENT_CALLBACK_BACKEND = `${BACKEND_URL}/paytm-callback-url`;

export const PAGES_LINK = {
  ABOUT_US: `${BACKEND_URL}/admin`
}


export const TEST_TYPES = {
    LIVE: 'live',
    MY_TEST: 'mytest',
    PRACTICE: 'practice',
};

//export const TEST_CARD_COLORS = [APP_COLORS.green, APP_COLORS.blue, APP_COLORS.blueGreen, APP_COLORS.yellow, APP_COLORS.orange, APP_COLORS.skyBlue, APP_COLORS.light_grey, APP_COLORS.back];
export const TEST_CARD_COLORS = [APP_COLORS.white, APP_COLORS.white, APP_COLORS.white, APP_COLORS.white, APP_COLORS.white, APP_COLORS.white, APP_COLORS.white, APP_COLORS.white];

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
    NOTIFICATION: 'Notification',
    WEB_VIEW: 'WebView'
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
    UPDATE_PROFILE : 'updateProfile',

    UPLOAD_BANK_ID : 'uploadBankId',
    UPLOAD_PAN : 'updatePan',
    UPLOAD_STUDENT_ID: 'uploadStudentId',

    CREATE_TICKET: 'createTicket',
    OPEN_TICKET: 'openTicket',

    OPEN_PROFILE: 'openProfile',
    OPEN_LANGUAGE: 'openLanguage',
    OPEN_NOTIFI: 'openNotification',

    OPEN_ABOUT_US: 'openAboutUs',
    OPEN_FAQ: 'openFaq',
    OPEN_TERMS_POLICY: 'openTermsPolicy',
    OPEN_PRIVACY_POLICY: 'openPrivacyPolicy',
    OPEN_REFUND_POLICY: 'openRefundPolicy',
    OPEN_HOW_TO_GET_SCHOLARSHIP: 'openHowToGetScholarship',
    LOGOUT: 'logout',
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

    ALERT_READ_CACHE: 'alert-read-cache',

    CURRENT_LANGUAGE: 'current-language',
}

export const LANGUAGES = {
  ENGLISH: 'English',
  HINDI: 'Hindi'
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

export const SHARE_TEXT = `Join me on Skolearn to get Scholarship at no cost.
Create your free account by using this link here: https://skolearn.com/download`;

export const TXN_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  INITIATED: 'initiated',
  PENDING: 'pending'
}

export const TXN_TYPE = {
  ADD_MONEY: 'addMoney',
  WITHDRAWAL: 'withdrawal',
  WALLET_DEDUCTED_FOR_TEST: 'walletDeductedForTest',
  FREE_TICKET_DEDUCTED_FOR_TEST: 'freeTicketDeductedForTest'
}

export const ALPHA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'];