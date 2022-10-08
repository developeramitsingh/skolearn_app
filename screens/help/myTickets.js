import { myTicketsStyles } from './myTicketsStyles'; 
import { View, Text, ScrollView, Pressable, Alert } from 'react-native'
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { useEffect, useState } from 'react';
import ModalTicket from '../../components/modals/modalTicket';
import { CLOSE_MODAL, ACTION_TYPES, ROUTES } from '../../constant/constant';
import { setCurrentLanguage } from '../../common/functions/commonHelper';
import { LANGUAGES_DATA, TICKET_STATUSES } from '../../constant/language';
import { sendAppLogService, ticketsRaisedService } from '../../services';
import Loader from '../../components/loader/loader';
import ModalTicketWindow from '../../components/modals/modalTicketWindow';

const MyTickets = ({ user, navigation }) => {
    const [tickets, setTickets] = useState([]);
    const [lang, setLang] = useState();
    const [createTicketModal, setCreateTicket] = useState(false);
    const [ticketWindow, setTicketWindow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [ticketId, setTicketId] = useState(null);

    const getAllRaisedTickets = async () => {
        try {
            setLoading(true);
            const allTickets = await ticketsRaisedService.getAllTicketsRaised('{}', ['_id', 'subject', 'status', 'createdAt']);
            setLoading(false);

            console.info({ data: allTickets?.data })

            if (allTickets?.data) {
                setTickets(allTickets?.data);
            }
            
        } catch (err) {
            console.error(`error in getAllRaisedTickets: ${err}`);
        }
    }

    useEffect(()=> {
        setCurrentLanguage(setLang);
        getAllRaisedTickets();
    }, []);

    
    const raiseNewTicket = async (data) => {
        try {
            console.info('raiseNewTicket called');
            sendAppLogService.sendAppLogs({ msg: 'raised new ticket called'});
            const form = new FormData();

            if(data.ticketImg) {
                form.append('imgFile', {
                    name: `image_UserId:${user?._id}.jpeg`,
                    uri: data.ticketImg,
                    type: "image/jpeg",
                });
            }

            form.append('subject', data['subject']);
            form.append('message', `{ "message": "${data['message']}", "userType": "appUser"}` );

            console.info('createTicketsRaised called');
            sendAppLogService.sendAppLogs({ msg: 'createTicketsRaised called'});

            await ticketsRaisedService.createTicketsRaised(form); 
            console.info(`tickets raised`);
            sendAppLogService.sendAppLogs({ msg: 'raised ticket'});
            Alert.alert(LANGUAGES_DATA[lang]?.ALERT?.SUCCESS, LANGUAGES_DATA[lang]?.HELP?.TICKET?.TICKET_CREATION_SUCCESS, [
                {
                    text: LANGUAGES_DATA[lang]?.ALERT?.CLOSE
                }
            ]);
        } catch (err) {
            console.error(`error in raiseNewTicket: ${err}`);
            Alert.alert(LANGUAGES_DATA[lang]?.ALERT?.ERROR, LANGUAGES_DATA[lang]?.ALERT?.ERROR_TXT, [
                {
                    text: LANGUAGES_DATA[lang]?.ALERT?.CLOSE
                }
            ]);
        }
    }

    const handlePress = async (actionType, payload) => {
        if(actionType === ACTION_TYPES.CREATE_TICKET) {
            console.info('createTicket');
            await raiseNewTicket(payload);
            setTickets((prev) => {
                return [...prev, { ...payload, messages: [ { message: payload.message } ], status: 'Open' }];
            })
            //call api to create ticket entry
            setCreateTicket(false);
        } else if(actionType === CLOSE_MODAL) {
            setCreateTicket(false);
            setTicketWindow(false);
        } else if(actionType === ACTION_TYPES.OPEN_TICKET) {
            console.info({ openticket: payload });
            setTicketId(payload);
            setTicketWindow(true);
        }
    };

    const allTickets = tickets?.map(ticket => {
        console.info({ ticket })
        return (
            <Pressable key={ticket._id} style={COMMON_STYLES.CARD} onPress={()=>handlePress(ACTION_TYPES.OPEN_TICKET, ticket._id)}>
                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{ticket.subject}</Text>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{TICKET_STATUSES[lang]?.[ticket.status?.toLowerCase()]}</Text>
                </View>

                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{ticket.createdAt}</Text>
                </View>
            </Pressable>
        );
    });

    return (
        <View style = { myTicketsStyles.CONTAINER }>
            <Loader isLoading={isLoading}/>
            {
                createTicketModal 
                ? <ModalTicket modalVisible={createTicketModal} handleModalPress={handlePress} title={LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE_NEW_TICKET} actionType= {ACTION_TYPES.CREATE_TICKET} btnTxt = {LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE} placeholder={LANGUAGES_DATA[lang]?.HELP?.TICKET?.ENTER_SUBJECT} fullMsgPlaceholder={LANGUAGES_DATA[lang]?.HELP?.TICKET?.ENTER_FULL_MESSAGE} closeTxt={LANGUAGES_DATA[lang]?.HELP?.TICKET?.CANCEL} uploadTxt={LANGUAGES_DATA[lang]?.HELP?.TICKET?.UPLOAD_TXT} errorTxts={LANGUAGES_DATA[lang]?.HELP?.TICKET?.ERRORS} maxLength={50}/>
                : null
            }

            {
                ticketWindow 
                ? <ModalTicketWindow modalVisible={ticketWindow} handleModalPress={handlePress} title={LANGUAGES_DATA[lang]?.HELP?.TICKET?.TICKET_WINDOW} actionType= {ACTION_TYPES.OPEN_TICKET_WINDOW} closeTxt={LANGUAGES_DATA[lang]?.HELP?.TICKET?.CLOSE} ticketId={ticketId} user={user}/>
                : null
            }
            

            <View style= {myTicketsStyles.ROW_CENTER}>
                <Pressable elevation={3} onPress={()=> setCreateTicket(true)} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>{LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE_NEW_TICKET}</Text>
                </Pressable>
            </View>

            <View style={[myTicketsStyles.ROW, { paddingVertical: 10}]}>
                <Text style={COMMON_STYLES.BODY_HEADING_2}>{LANGUAGES_DATA[lang]?.HELP?.TICKET?.RAISED_TICKETS}</Text>
            </View>
            <View style={COMMON_STYLES.SEPARATOR}></View>
            <ScrollView style={myTicketsStyles.CONTAINER}>
                {allTickets}
            </ScrollView>
        </View>
    )
}

export default MyTickets;