import * as Updates from 'expo-updates';

export const APP_VERSION = '1.0.0';

export const DOB = {
  DAYS: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
  MONTHS: [
    {label: 'Jan', value: '1'},
    {label: 'Feb', value: '2'},
    {label: 'Mar', value: '3'},
    {label: 'Apr', value: '4'},
    {label: 'May', value: '5'},
    {label: 'Jun', value: '6'},
    {label: 'Jul', value: '7'},
    {label: 'Aug', value: '8'},
    {label: 'Sep', value: '9'},
    {label: 'Oct', value: '10'},
    {label: 'Nov', value: '11'},
    {label: 'Dec', value: '12'},
  ],
  YEARS: function(startYear) {
    let currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;  
    while ( startYear <= currentYear ) {
        years.push(startYear++);
    }   
    return years;
  }
}

export const ASSEST_URLS = {
    LOGO: 'https://ik.imagekit.io/nwxotnqhh/logo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664917053868',
    HOME: 'https://ik.imagekit.io/nwxotnqhh/splashfinal_BnUFAQxRr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664917251827',
    REFERRAL_IMAGE: 'https://ik.imagekit.io/nwxotnqhh/referralImg_NCrTW_FPM.jpeg',
};

export const APP_COLORS = {
    blue: '#1E90FF',
    appThemeColor: '#360173', 
    lightAppThemeColor: '#eadcfc', 
    blueGreen: '#25B0B9',
    yellow: '#FFD81B',
    green: '#26d606',
    orange: '#FF991B',
    skyBlue: '#1BE1FF',
    lightBlue: '#bedbfa',
    grey: '#3D3D3D',
    light_grey: '#C1C1C1',
    white: '#fff',
    back: '#360173',
    black: '#000',
    black_opacity: '#00000050',
    black_opacity_90: '#00000090',
    voilet: '#1a0336',
    voilet_dark: '#290238',
    white_opacity: '#ffffff70',
    grey_opacity: '#ffffff20',
    red: '#fc0303',
    lightGrey2: '#f7f7f7',
    backPanelColor: '#Edf3ff',
    lightYellow: '#feffe8',
};

const PROD_URL= 'https://skolearn.herokuapp.com';
const STAGE_URL= 'https://8a8f-2409-4050-2d11-84c-4d5a-1d78-b9a4-7fea.in.ngrok.io';
const DEV_URL= 'https://8a8f-2409-4050-2d11-84c-4d5a-1d78-b9a4-7fea.in.ngrok.io';
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

export const POLICY = {
  ABOUT_US: 'about-us',
  FAQ: 'faq',
  TERMS_COND: 'terms-and-conditions',
  PRIVACY_POLICY: 'privacy-policy',
  REFUND_POLICY: 'refund-policy',
  HOW_TO_ATTEMPT_TEST: 'how-to-attempt-test'
}


export const TEST_TYPES = {
    LIVE: 'live',
    MY_TEST: 'mytest',
    PRACTICE: 'practice',
};

//export const TEST_CARD_COLORS = [APP_COLORS.green, APP_COLORS.blue, APP_COLORS.blueGreen, APP_COLORS.yellow, APP_COLORS.orange, APP_COLORS.skyBlue, APP_COLORS.light_grey, APP_COLORS.appThemeColor];
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
    PROFILE: 'Profile'
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
    OPEN_HOW_TO_ATTEMPT_TEST: 'openHowToAttemptTest',
    
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

    OTP_RESEND_COUNT: 'otp-resend-count',
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

export const TEST_GROUPS = {
  GENERAL:  { KEY: 'GENERAL', VALUE: 'general' },
  HIGH_SCHOOL:  { KEY: '10th', VALUE: '10th' },
  INTER: { KEY: '12th', VALUE: '12th' },
  SSC: { KEY: 'SSC', VALUE: 'ssc' },
  RAILWAY: { KEY: 'Railway', VALUE: 'railway' },
  BANK: { KEY: 'Bank', VALUE: 'bank' },
  GRADUATION: { KEY: 'Graduation', VALUE: 'graduation' },
  PCS: { KEY: 'PCS', VALUE: 'pcs' },
  UPSC: { KEY: 'UPSC', VALUE: 'upsc' },
  JEE: { KEY: 'JEE', VALUE: 'jee' },
  NDA: { KEY: 'NDA', VALUE: 'nda' },
  CAT: { KEY: 'CAT', VALUE: 'cat' },
  TGT: { KEY: 'TGT', VALUE: 'tgt' },
  PGT: { KEY: 'PGT', VALUE: 'pgt' },
};

export const DASHBOARD_TEST_GROUP_TABS = Object.keys(TEST_GROUPS).map(cat => {
  const { KEY, VALUE } = TEST_GROUPS[cat];
  return { name: KEY, key: VALUE };
});

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

export const SHARE_TEXT = (code) => {
  return `Join me on Skolearn to get Scholarship at no cost for your tution fee. Use my referral Code to get 1 free ticket: Code: ${code}. Create your account free by using this link here: https://skolearn.com`
};

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