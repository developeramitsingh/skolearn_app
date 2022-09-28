import * as Constant from './constant';

export const SUBJECTS = {
    ENGLISH: {
        TITLE: 'Subjects',
        GK: 'GK',
        ENGLISH: 'ENGLISH',
        MATHS: 'MATHS',
        SCIENCE: 'SCIENCE',
        HISTORY: 'HISTORY',
        ECONOMICS: 'ECONOMICS'
    },
    HINDI: {
        TITLE: 'विषय',
        GK: 'जीके',
        ENGLISH: 'अंग्रेजी',
        MATHS: 'गणित',
        SCIENCE: 'विज्ञान',
        HISTORY: 'इतिहास',
        ECONOMICS: 'अर्थशास्त्र'
    }
};
export const LANGUAGES_DATA = {
    [Constant.LANGUAGES.HINDI]: {
        ALERT: {
            INFO: 'जानकारी',
            NOTICE: 'सूचना',
            ERROR: 'गलती',
            WARNING: 'संकेत',
            ERROR_TXT: 'कुछ गलत हो गया, कृपया फिर से प्रयास करें',
        },
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
            WALLET: 'वॉलेट',
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
                        SUBJECTS: SUBJECTS.HINDI,
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
                        SUBJECTS: SUBJECTS.HINDI,
                        STUDENT_JOINED: 'छात्र शामिल हुए',
                        LIVE: 'लाइव',
                        PRACTICE: 'अभ्यास'
                    }
                },
                [Constant.TEST_TYPES.PRACTICE]: {
                    PRACTICE_TESTS: 'अभ्यास टेस्ट',
                    CARDS: {
                        PRACTICE: 'अभ्यास',
                        SUBJECTS: SUBJECTS.HINDI,
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
        ATTEMPT: {
            LESS_BALANCE: 'वॉलेट मनी अपर्याप्त है, कृपया पैसा जमा करें',
            SEAT_FULL: 'टेस्ट सीटें फुल! कृपया दूसरे टेस्ट का प्रयास करें।',
            STUDENTS_JOINED: 'छात्र शामिल हुए',
            EXPIRES_ON: 'समाप्त हो जाएगा',
            WALLET: 'वॉलेट',
            RUPEES: 'रुपये',
            FREE_TICKETS: 'मुफ़्त टिकट',
            SELECT_LANGUAGE: 'भाषा का चयन करें',
            DEFAULT_ENGLISH: 'डिफ़ॉल्ट (अंग्रेज़ी)',
            HINDI: 'हिन्दी',
            ATTEMPT: 'प्रयास करें',
            TEST_FEE: 'टिकट शुल्क',
            TICKET: 'टिकट',
            OR_1_TICKET: 'या 1 प्रयास',
            ATTEMPT_DESC: 'टेस्ट का प्रयास करने के लिए 1 निःशुल्क टिकट या वॉलेट का पैसा काट लिया जाएगा',
            ATTEMPT_NOTICE: 'सुरक्षा उद्देश्यों के लिए आपका डिवाइस कैमरा और माइक्रोफ़ोन चालू रहेगा, कृपया टेस्ट से पहले किसी भी हेडफ़ोन या हेडसेट को हटा दें',
            TEST_REQUIREMENTS: 'टेस्ट आवश्यकताएँ',
            TEST_REQ_TEXT: 'हमें सुरक्षा और पारदर्शिता उद्देश्यों के लिए कैमरे और माइक्रोफ़ोन का उपयोग करने की आवश्यकता है, कृपया टेस्ट से पहले किसी भी हेडफ़ोन या हेडसेट को हटा दें।',
            OK_TO_PROCEED: 'ठीक है शुरू करें',
            CANCEL_ATTEMPT: 'रद्द करें',
            FREE_ENTRY: 'नि:शुल्क प्रवेश',
            TXN_TICKET_TXT: 'टेस्ट देने के लिए 1 निःशुल्क टिकट काटा गया',
            TXN_WALLET_TXT: 'रु. टेस्ट का प्रयास करने के लिए वॉलेट से काट लिया गया',
        },
        TIMER_SCREEN: {
            HEADING: 'टेस्ट शुरू होने जा रहा है, तैयार रहें',
            BODY_TXT: 'प्रश्न का उत्तर तेजी से दें',
            BODY_TXT_2: 'क्योंकि प्रतिक्रिया समय का उपयोग रैंकिंग के लिए किया जाएगा'
        },
        TEST: {
            TOTAL_SCORE: 'कुल अंक',
            SCORE: 'अंक',
            TOTAL_QUES: 'कुल सवाल',
            FINISH: 'समाप्त',
            PERMISSION: 'अनुमति की प्रतीक्षा में',
            NO_PERMISSION: 'कैमरा या माइक्रोफ़ोन के लिए कोई एक्सेस नहीं, कृपया अनुमति दें',
        },
        RESULT_SCREEN: {
            YOU: '(आप)',
            STUDENTS_JOINED: 'छात्र शामिल हुए',
            TEST_FEE: 'टेस्ट शुल्क',
            VIEW_SOLUTION: 'समाधान देखें',
            LEADERBOARD: 'लीडरबोर्ड',
            BREAKUP: 'छात्रवृत्ति ब्रेकअप',
            RANK: 'श्रेणी',
            NAME: 'नाम',
            SCORE: 'अंक',
            SCHOLARSHIP: 'छात्रवृत्ति',
        }
    },
    [Constant.LANGUAGES.ENGLISH]: {
        ALERT: {
            INFO: 'Info',
            ERROR: 'Error',
            NOTICE: 'Notice',
            WARNING: 'Warning',
            ERROR_TXT: 'Something went wrong, Please Try Again',
        },
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
                        SUBJECTS: SUBJECTS.ENGLISH,
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
                        SUBJECTS: SUBJECTS.ENGLISH,
                        STUDENT_JOINED: 'Students Joined',
                        LIVE: 'Live',
                        PRACTICE: 'Practice'
                    }
                },
                [Constant.TEST_TYPES.PRACTICE]: {
                    PRACTICE_TESTS: 'Practice Tests',
                    CARDS: {
                        PRACTICE: 'Practice',
                        SUBJECTS: SUBJECTS.ENGLISH,
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
        ATTEMPT: {
            LESS_BALANCE: 'Wallet Money is insufficient, please add money',
            SEAT_FULL: 'Test seats full!. please attempt another test.',
            STUDENTS_JOINED: 'Students Joined',
            EXPIRES_ON: 'Expires On',
            WALLET: 'Wallet',
            RUPEES: 'Repees',
            FREE_TICKETS: 'Free Tickets',
            SELECT_LANGUAGE: 'Select Language',
            DEFAULT_ENGLISH: 'Default (English)',
            HINDI: 'Hindi',
            ATTEMPT: 'Attempt',
            TEST_FEE: 'Test Fee',
            TICKET: 'Ticket',
            OR_1_TICKET: 'or 1 Ticket',
            ATTEMPT_DESC: '1 free ticket or wallet money will be deducted for attempting the test',
            ATTEMPT_NOTICE: 'Your device camera and microphone will be enabled for security purposes, please remove any headphones or headsets before the test',
            TEST_REQUIREMENTS: 'Test Requirements',
            TEST_REQ_TEXT: 'we need to use the camera and microphone for security and transparency purposes, please remove any headphones or headsets before the test.',
            OK_TO_PROCEED: 'Ok to Proceed',
            CANCEL_ATTEMPT: 'Cancel Attempt',
            FREE_ENTRY: 'Free Entry',
            TXN_TICKET_TXT: '1 Free Ticket Deducted for Attempting the Test',
            TXN_WALLET_TXT: 'Rs. Deducted from Wallet for Attempting the Test',
        },
        TIMER_SCREEN: {
            HEADING: 'Test is going to start be ready',
            BODY_TXT: 'Answer the question fast',
            BODY_TXT_2: 'as response timing will be used for ranking'
        },
        TEST: {
            TOTAL_SCORE: 'Total Score',
            SCORE: 'Score',
            TOTAL_QUES: 'Total Ques',
            FINISH: 'Finish',
            PERMISSION: 'Waiting for Permission',
            NO_PERMISSION: 'No Access for Camera or Microphone, Please give permission',
        },
        RESULT_SCREEN: {
            YOU: '(You)',
            STUDENTS_JOINED: 'Students Joined',
            TEST_FEE: 'Test Fee',
            VIEW_SOLUTION: 'View Solution',
            LEADERBOARD: 'Leaderboard',
            BREAKUP: 'Scholarship Breakup',
            RANK: 'Rank',
            NAME: 'Name',
            SCORE: 'Score',
            SCHOLARSHIP: 'Scholarship',
        }
    }
}