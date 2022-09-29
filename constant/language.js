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
export const TXN_STATUSES = {
    English: {
        success: 'Success',
        failed: 'Failed',
        initiated: 'Initiated',
        pending: 'Pending',
    },
    Hindi: {
        success: 'सफल',
        failed: 'असफल',
        initiated: 'शुरू किया',
        pending: 'अनिर्णीत',
    }
};
export const TICKET_STATUSES = {
    English: {
        open: 'Open',
        pending: 'Pending',
        inprogress: 'In Progress',
        completed: 'Completed',
    },
    Hindi: {
        open: 'खुला हुआ',
        pending: 'अनिर्णीत',
        inprogress: 'चालू',
        completed: 'पूरा हुआ',
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
            SUCCESS: 'सफल'
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
        },
        WALLET: {
            TOTAL_BALANCE: 'कुल शेष',
            RS: 'रु.',
            FREE_TICKETS: 'मुफ्त टिकट',
            ADD_MONEY: 'पैसे जोड़ें',
            WITHDRAW: 'निकासी',
            TXN_HISTORY: 'लेनदेन का रेकार्ड',
            RAISE_TICKET: 'टिकट बनाएं',
            ADD_MONEY_TO_WALLET: 'वॉलेट में पैसे जोड़ें',
            ENTER_AMOUNT_TO_ADD: 'जोड़ने के लिए राशि दर्ज करें',
            ADD: 'जोड़ें',
            CLOSE: 'बंद करें',
            REQUEST_WITHDRAW_MONEY: 'पैसे निकालने का अनुरोध',
            ENTER_AMOUNT_TO_WITHDRAW: 'निकालने के लिए राशि दर्ज करें',
            TXN_PENDING_TXT: 'लेन-देन सफल है! हालांकि, हम अभी भी बैंक से आपके भुगतान की पुष्टि कर रहे हैं। एक बार हो जाने पर हम आपको सूचित करेंगे',
            TXN_MONEY_SUCCESS_TXT: 'वॉलेट में पैसा सफलतापूर्वक जोड़ा गया!',
            TXN_MONEY_FAILED_TXT: 'वॉलेट में धन जोड़ने में विफल!',
            MONEY_VALIDATION: 'राशि 0 से अधिक होनी चाहिए',
            LESS_BALANCE_TO_WITHDRAW: 'वॉलेट का पैसा अपर्याप्त है!',
            MONEY_WITHDRAW_SUCCESS: 'पैसे निकालने का अनुरोध बनाया गया!'
        },
        HELP: {
            TICKET: {
                CREATE_NEW_TICKET: 'नया टिकट बनाएं',
                ENTER_SUBJECT: 'विषय दर्ज करें',
                ENTER_FULL_MESSAGE: 'यहां पूरा संदेश दर्ज करें',
                CREATE: 'बनाएं',
                CANCEL: 'रद्द करें',
                UPLOAD_TXT: 'फ़ोटो अपलोड करें (यदि कोई हो)',
                RAISED_TICKETS: 'बनाए गए टिकट',
                TICKET_ID: 'टिकट आईडी',
            }
        }, 
        NOTIFICATIONS: {
            NOTI_TXT: 'सूचनाएं',
            GO_TO_LINK: 'लिंक पर जाएं'
        },
        PROFILE: {
            WELCOME_TXT: 'नमस्ते',
            TOTAL_ACHIEVED: 'कुल छात्रवृत्ति प्राप्त हुई',
            EDIT_PROFILE: 'उपयोगकर्ता नाम संपादित करें',
            EDIT_PROFILE_INPUT: 'अपना नया उपयोगकर्ता नाम दर्ज करें',
            UPDATE: 'अपडेट',
            CLOSE: 'बंद करें',
            REFER_TXT: 'रेफ़र करें और 1 निःशुल्क टिकट प्राप्त करें',
            REFERRAL_CODE: 'रेफ़रल कोड',
            REFERRAL_CODE_COPIED: 'रेफ़रल कोड कॉपी किया गया',
            SHARING_LINK_COPIED: 'शेयरिंग लिंक कॉपी किया गया',
            COPY_CODE: 'कोड कॉपी करें',
            COPY_REFERRAL_LINK: 'रेफ़रल लिंक कॉपी करें',
            BANK: 'बैंक',
            PANCARD: 'पैनकार्ड',
            UPDATE_DETAIL: 'विवरण अपडेट करें',
            UPLOAD: 'अपलोड',
            PENDING_VERFI: 'अपूर्ण सत्यापन',
            STUDENT_DOC: 'छात्र दस्तावेज़',
            ENTER_FULL_NAME: 'अपना पूरा नाम दर्ज करें',
            CHOOSE_PHOTO: 'फोटो चुनें',
            SUCCESS_COMMON: {
                SUCCESS_BANK: 'बैंक फ़ोटो सफलतापूर्वक अपडेट किया गया!',
                SUCCESS_PAN: 'पैन फ़ोटो सफलतापूर्वक अपडेट किया गया!',
                SUCCESS_ID: 'छात्र आईडी फ़ोटो सफलतापूर्वक अपडेट किया गया!',
                SUCCESS_PROFILE: 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई',
                SUCCESS_BANK_DETAILS: 'बैंक खाता विवरण सफलतापूर्वक अपडेट किया गया!',
                SUCCESS_PAN_DETAILS: 'पैन कार्ड का विवरण सफलतापूर्वक अपडेट किया गया!',
            },
            ERROR_COMMON: {
                ERROR_UPLOAD: 'फोटो अपलोड करते समय त्रुटि।, कृपया पुन: प्रयास करें!',
                ERROR: 'कुछ गलत हो गया, कृपया पुन: प्रयास करें!',
                ERROR_BANK_DETAILS: 'बैंक विवरण अपडेट करते समय त्रुटि।, कृपया पुन: प्रयास करें!',
                ERROR_PAN_DETAILS: 'पैन विवरण अपडेट करते समय त्रुटि।, कृपया पुन: प्रयास करें!',
            },
            STATUS: {
                PENDING_VERIFICATION: 'सत्यापन अपूर्ण',
                VERIFIED: 'सत्यापित',
                FAILED: 'विफल',
                NOT_SUBMITTED: 'सबमिट नहीं किया गया'
            },
            BANK_MODAL: {
                HEADING: 'बैंक विवरण अपडेट करें',
                ENTER_FULL_NAME: 'अपना पूरा नाम दर्ज करें',
                ENTER_BANK_NAME: 'बैंक का नाम दर्ज करें',
                ENTER_ACCOUNT: 'बैंक खाता संख्या दर्ज करें',
                ENTER_IFSC: 'बैंक आईएफएससी कोड दर्ज करें',
                ERROR_TXTS: {
                    INIT: {
                        userNameInBank: 'नाम आवश्यक है',
                        bankName: 'बैंक का नाम आवश्यक है',
                        bankAccountNum: 'बैंक खाता संख्या आवश्यक है',
                        bankIfscCode: 'बैंक IFSC कोड आवश्यक है',
                    },
                    INVALID: {
                        userNameInBank: 'नाम आवश्यक है',
                        bankName: 'बैंक का नाम आवश्यक है',
                        bankAccountNum: 'बैंक खाता संख्या आवश्यक है',
                        bankIfscCode: 'बैंक IFSC कोड आवश्यक है',
                    }
                }
            },
            PAN_MODAL: {
                HEADING: 'पैन कार्ड विवरण अपडेट करें',
                ENTER_FULL_NAME: 'अपना पूरा नाम दर्ज करें',
                ENTER_PAN: 'पैन कार्ड नंबर दर्ज करें',
                ERROR_TXTS: {
                    INIT: {
                        userNameInPan: 'नाम आवश्यक है',
                        panNum: 'पैन नंबर आवश्यक है',
                    },
                    INVALID: {
                        userNameInPan: 'नाम आवश्यक है',
                        panNum: 'पैन नंबर आवश्यक है',
                    }
                }
            },
            BANK_UPLOAD_MODAL: {
                HEADING: 'बैंक पासबुक/चेक/स्टेटमेंट अपलोड करें',
                NOTICE: 'फोटो में बैंक खाता संख्या और नाम होना चाहिए'
            },
            PAN_UPLOAD_MODAL: {
                HEADING: 'पैन कार्ड अपलोड करें',
            },
            STUDENT_DOC_MODAL: {
                HEADING: 'छात्र दस्तावेज अपलोड करें',
                NOTICE: 'स्वीकृत प्रकार: वर्तमान वर्ष के छात्र आईडी कार्ड या आवेदन पत्र या संस्थान / कॉलेज / स्कूल के विवरण के लिए शुल्क पर्ची'
            }
        }
    },

    [Constant.LANGUAGES.ENGLISH]: {
        ALERT: {
            INFO: 'Info',
            ERROR: 'Error',
            NOTICE: 'Notice',
            WARNING: 'Warning',
            ERROR_TXT: 'Something went wrong, Please Try Again',
            SUCCESS: 'Success'
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
        },
        WALLET: {
            TOTAL_BALANCE: 'Total Balance',
            RS: 'Rs.',
            FREE_TICKETS: 'Free Tickets',
            ADD_MONEY: 'Add Money',
            WITHDRAW: 'Withdraw',
            TXN_HISTORY: 'Transaction History',
            RAISE_TICKET: 'Raise Ticket',
            ADD_MONEY_TO_WALLET: 'Add Money to Wallet',
            ENTER_AMOUNT_TO_ADD: 'Enter Amount To Add',
            ADD: 'Add',
            CLOSE: 'Close',
            REQUEST_WITHDRAW_MONEY: 'Request Withdraw Money',
            ENTER_AMOUNT_TO_WITHDRAW: 'Enter Amount To Withdraw',
            TXN_PENDING_TXT: 'The transaction is successful! However, we are still verifying your payment from the bank. We will notify you once done',
            TXN_MONEY_SUCCESS_TXT: 'Money Added to Wallet Successfully!',
            TXN_MONEY_FAILED_TXT: 'Money addin to Wallet Failed!',
            MONEY_VALIDATION: 'Amount should be greater then 0',
            LESS_BALANCE_TO_WITHDRAW: 'Wallet money is insufficient!',
            MONEY_WITHDRAW_SUCCESS: 'Withdraw request raised!'
        },
        HELP: {
            TICKET: {
                CREATE_NEW_TICKET: 'Raise New Ticket',
                ENTER_SUBJECT: 'Enter Subject',
                ENTER_FULL_MESSAGE: 'Enter Full Message Here',
                CREATE: 'Create',
                CANCEL: 'Cancel',
                UPLOAD_TXT: 'Upload image (if Any)',
                RAISED_TICKETS: 'Raised Tickets',
                TICKET_ID: 'Ticket Id',
            }
        },
        NOTIFICATIONS: {
            NOTI_TXT: 'Notifications',
            GO_TO_LINK: 'Go To Link'
        },
        PROFILE: {
            WELCOME_TXT: 'Hi',
            TOTAL_ACHIEVED: 'Total Scholarship Acheived',
            EDIT_PROFILE: 'Edit User Name',
            EDIT_PROFILE_INPUT: 'Enter Your New User Name',
            UPDATE: 'Update',
            CLOSE: 'Close', 
            REFER_TXT: 'Refer and get 1 Free Ticket',
            REFERRAL_CODE: 'Referral Code',
            REFERRAL_CODE_COPIED: 'Referral Code Copied',
            SHARING_LINK_COPIED: 'Sharing Link Copied',
            COPY_CODE: 'Copy Code',
            COPY_REFERRAL_LINK: 'Copy Referral Link',
            BANK: 'Bank',
            PANCARD: 'Pancard',
            UPDATE_DETAIL: 'Update Detail',
            UPLOAD: 'Upload',
            PENDING_VERFI: 'Pending Verfication',
            STUDENT_DOC: 'Student Document',
            ENTER_FULL_NAME: 'Enter Your Full Name',
            CHOOSE_PHOTO: 'Choose Photo',
            SUCCESS_COMMON: {
                SUCCESS_BANK: 'Bank Photo Updated Successfully!',
                SUCCESS_PAN: 'Pan Photo Updated Successfully!',
                SUCCESS_ID: 'Student Id Photo Updated Successfully!',
                SUCCESS_PROFILE: 'Profile Updated Successfully',
                SUCCESS_BANK_DETAILS: 'Bank Account Details Updated Successfully!',
                SUCCESS_PAN_DETAILS: 'PAN Card Details Updated Successfully!',
            },
            ERROR_COMMON: {
                ERROR_UPLOAD: 'Error While Uploading Image., Please try again!',
                ERROR: 'Something went wrong, Please try again!',
                ERROR_BANK_DETAILS: 'Error While Updating the Bank Details., Please try again!',
                ERROR_PAN_DETAILS: 'Error While Updating the Pan Details., Please try again!',
            },
            STATUS: {
                PENDING_VERIFICATION: 'Pending Verification',
                VERIFIED: 'Verified',
                FAILED: 'Failed',
                NOT_SUBMITTED: 'Not Submitted'
            },
            BANK_MODAL: {
                HEADING: 'Update Bank Details',
                ENTER_BANK_NAME: 'Enter Bank Name',
                ENTER_ACCOUNT: 'Enter Bank Account Number',
                ENTER_IFSC: 'Enter Bank IFSC Code',
                ERROR_TXTS: {
                    INIT: {
                        userNameInBank: 'Name is required',
                        bankName: 'Bank name is required',
                        bankAccountNum: 'Bank account number is required',
                        bankIfscCode: 'Bank IFSC code is required',
                    },
                    INVALID: {
                        userNameInBank: 'Name is invalid',
                        bankName: 'Bank Name is invalid',
                        bankAccountNum: 'Bank Account Number is invalid',
                        bankIfscCode: 'IFSC code is invalid',
                    }
                }
            },
            PAN_MODAL: {
                HEADING: 'Update Pan Card Details',
                ENTER_PAN: 'Enter Pan Card Number',
                ERROR_TXTS: {
                    INIT: {
                        userNameInPan: 'Name is required',
                        panNum: 'Pan number is required',
                    },
                    INVALID: {
                        userNameInPan: 'Name is invalid',
                        panNum: 'Pan Number is invalid',
                    }
                }
            },
            BANK_UPLOAD_MODAL: {
                HEADING: 'Upload Bank Passbook/Cheque/Statement',
                NOTICE: 'Image should contain bank account number and name'
            },
            PAN_UPLOAD_MODAL: {
                HEADING: 'Upload Pan Card',
            },
            STUDENT_DOC_MODAL: {
                HEADING: 'Upload Student Document',
                NOTICE: '"Allowed types are current year student id card or fee slip or application form or details of institute/college/school'
            }
        }
    }
}