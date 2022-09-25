import * as Constant from './constant';

const SUBJECTS_ENGLISH =  {
    TITLE: 'Subjects',
    GK: 'GK',
    ENGLISH: 'ENGLISH',
    MATHS: 'MATHS',
    SCIENCE: 'SCIENCE',
    HISTORY: 'HISTORY',
    ECONOMICS: 'ECONOMICS'
};

const SUBJECTS_HINDI =  {
    TITLE: 'विषय',
    GK: 'जीके',
    ENGLISH: 'अंग्रेजी',
    MATHS: 'गणित',
    SCIENCE: 'विज्ञान',
    HISTORY: 'इतिहास',
    ECONOMICS: 'अर्थशास्त्र'
};
export const LANGUAGES_DATA = {
    [Constant.LANGUAGES.HINDI]: {
        DRAWER: {
            WELCOME: 'स्वागत हे',
            PROFILE: 'प्रोफ़ाइल',
            CHANGE_LANGUAGE: 'भाषा बदलो',
            CHANGE_TO: 'अंग्रेजी में बदलें',
            CHANGE: 'बदलें',
            CANCEL: 'रद्द करें',
            LANGUAGE: 'भाषा',
            ABOUT_US: 'हमारे बारे में',
            FAQ: 'अक्सर पूछे जाने वाले प्रश्न',
            TERMS_COND: 'नियम और शर्तें',
            PRIVACY_POLICY: 'गोपनीयता नीति',
            REFUND_POLICY: 'धनवापसी नीति',
            LOGOUT: 'लॉगआउट',
        },
        FOOTER_ICON_BAR: {
            HOME: 'होम',
            WALLET: 'पर्स',
            HELP: 'मदद',
        },
        
        DASHBOARD:{
            [Constant.SCREENS.TEST_LIST]: {
                TABS: {
                    [Constant.DASHBOARD_TEST_TABS[0].key]: 'लाइव टेस्ट',
                    [Constant.DASHBOARD_TEST_TABS[1].key]: 'मेरे टेस्ट',
                    [Constant.DASHBOARD_TEST_TABS[2].key]: 'अभ्यास टेस्ट',
                },
                [Constant.TEST_TYPES.LIVE]: {
                    MEGA_SCHOLAR: 'मेगा छात्रवृत्ति',
                    SCHOLAR_EVERYONE: 'सभी के लिए छात्रवृत्ति',

                    CARDS: {
                        DIFFICULTI_LEVEL: {
                            TITLE: 'कठिनाई स्तर',
                            EASY: 'आसान',
                            MEDIUM: 'मध्यम',
                            HARD: 'कठिन',
                        },
                        PARTICIPATE: 'भाग लेना',
                        TEST_FEE: 'टेस्ट शुल्क',
                        RS: 'रु.',
                        SUBJECTS: SUBJECTS_HINDI,
                        STUDENT_JOINED: 'छात्र शामिल हुए',
                    }
                },
                [Constant.TEST_TYPES.MY_TEST]: {
                    TEST_COMPLETED: 'टेस्ट पूर्ण',
                    NO_TEST_APPEARED: 'कोई टेस्ट नहीं हुआ, कृपया टेस्ट का प्रयास करें',

                    CARDS: {
                        COMPLETED_ON: 'पूरा किया',

                        VIEW_RESULT: 'परिणाम देखें',
                        TEST_FEE: 'टेस्ट शुल्क',
                        RS: 'रु.',
                        SUBJECTS: SUBJECTS_HINDI,
                        STUDENT_JOINED: 'छात्र शामिल हुए',
                        LIVE: 'लाइव',
                        PRACTICE: 'अभ्यास'
                    }
                },
                [Constant.TEST_TYPES.PRACTICE]: {
                    PRACTICE_TESTS: 'अभ्यास टेस्ट',
                    CARDS: {
                        PRACTICE: 'अभ्यास',
                        SUBJECTS: SUBJECTS_HINDI,
                    }
                },
            },
            [Constant.SCREENS.HELP]: {
                TABS: {
                    [Constant.HELP_TABS[0].key]: 'मेरे टिकट',
                    [Constant.HELP_TABS[1].key]: 'सीधी बातचीत',
                },
            },          
        },
    },
    [Constant.LANGUAGES.ENGLISH]: {
        DRAWER: {
            WELCOME: 'Welcome',
            PROFILE: 'Profile',
            CHANGE_LANGUAGE: 'Change Language',
            CHANGE_TO: 'Change to Hindi',
            CHANGE: 'Change',
            CANCEL: 'Cancel',
            LANGUAGE: 'Language',
            ABOUT_US: 'About Us',
            FAQ: 'FAQ',
            TERMS_COND: 'Terms & Conditions',
            PRIVACY_POLICY: 'Privacy Policy',
            REFUND_POLICY: 'Refund Policy',
            LOGOUT: 'logout',
        },
        FOOTER_ICON_BAR: {
            HOME: 'Home',
            WALLET: 'Wallet',
            HELP: 'Help',
        },
        DASHBOARD:{
            [Constant.SCREENS.TEST_LIST]: {
                TABS: {
                    [Constant.DASHBOARD_TEST_TABS[0].key]: Constant.DASHBOARD_TEST_TABS[0].name,
                    [Constant.DASHBOARD_TEST_TABS[1].key]: Constant.DASHBOARD_TEST_TABS[1].name,
                    [Constant.DASHBOARD_TEST_TABS[2].key]: Constant.DASHBOARD_TEST_TABS[2].name,
                },
                [Constant.TEST_TYPES.LIVE]: {
                    MEGA_SCHOLAR: 'Mega Scholarships',
                    SCHOLAR_EVERYONE: 'Scholarships for everyone',

                    CARDS: {
                        DIFFICULTI_LEVEL: {
                            TITLE: 'Difficulty Level',
                            EASY: 'EASY',
                            MEDIUM: 'MEDIUM',
                            HARD: 'HARD',
                        },
                        PARTICIPATE: 'Participate',
                        TEST_FEE: 'Test Fee',
                        RS: 'Rs.',
                        SUBJECTS: SUBJECTS_ENGLISH,
                        STUDENT_JOINED: 'Students Joined',
                    }
                },
                [Constant.TEST_TYPES.MY_TEST]: {
                    TEST_COMPLETED: 'Test Completed',
                    NO_TEST_APPEARED: 'No Test Appeared, Please attempt the test',

                    CARDS: {
                        COMPLETED_ON: 'Completed On',

                        VIEW_RESULT: 'View Result',
                        TEST_FEE: 'Test Fee',
                        RS: 'Rs.',
                        SUBJECTS: SUBJECTS_ENGLISH,
                        STUDENT_JOINED: 'Students Joined',
                        LIVE: 'Live',
                        PRACTICE: 'Practice'
                    }
                },
                [Constant.TEST_TYPES.PRACTICE]: {
                    PRACTICE_TESTS: 'Practice Tests',
                    CARDS: {
                        PRACTICE: 'Practice',
                        SUBJECTS: SUBJECTS_ENGLISH,
                    }
                },
            },
            [Constant.SCREENS.HELP]: {
                TABS: {
                    [Constant.HELP_TABS[0].key]: Constant.HELP_TABS[0].name,
                    [Constant.HELP_TABS[1].key]: Constant.HELP_TABS[1].name,
                },
            },         
        },
    }
}