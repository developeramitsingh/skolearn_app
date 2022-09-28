import { myTicketsStyles } from './myTicketsStyles'; 
import { View, Text, ScrollView, Pressable } from 'react-native'
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { useEffect, useState } from 'react';
import ModalTicket from '../../components/modals/modalTicket';
import { CLOSE_MODAL, ACTION_TYPES } from '../../constant/constant';
import { setCurrentLanguage } from '../../common/functions/commonHelper';
import { LANGUAGES_DATA, TICKET_STATUSES } from '../../constant/language';

const MyTickets = ({handleOpenTicket}) => {
    const [state, setState] = useState({
        allTickets: [{
            id: 1,
            ticketSubject: "Not able to open test",
            status: 'open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            ticketSubject: "Not able to open test",
            status: 'open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 3,
            ticketSubject: "Not able to open test",
            status: 'open',
            createdAt: new Date().toISOString(),
        }],
    });
    const [lang, setLang] = useState();

    useEffect(()=> {
        setCurrentLanguage(setLang);
    }, []);

    const [createTicketModal, setCreateTicket] = useState(false);

    const handlePress = (actionType, payload) => {
        if(actionType === ACTION_TYPES.CREATE_TICKET) {
            console.info('createTicket');
            //call api to create ticket entry
            setCreateTicket(false);
        } else if(actionType === CLOSE_MODAL) {
            setCreateTicket(false);
        } else if(actionType === ACTION_TYPES.OPEN_TICKET) {
            console.info({ openticket: payload });
            handleOpenTicket(payload);
        }
    };

    const allTickets = state.allTickets?.map(ticket => {
        return (
            <Pressable key={ticket.id} style={COMMON_STYLES.CARD} onPress={()=>handlePress(ACTION_TYPES.OPEN_TICKET, ticket.id)}>
                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{ticket.ticketSubject}</Text>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{TICKET_STATUSES[lang]?.[ticket.status]}</Text>
                </View>
                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{LANGUAGES_DATA[lang]?.HELP?.TICKET?.TICKET_ID} {ticket.id}</Text>
                    
                </View>

                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{ticket.createdAt}</Text>
                </View>
            </Pressable>
        );
    });

    return (
        <View style = { myTicketsStyles.CONTAINER }>
            <ModalTicket modalVisible={createTicketModal} handleModalPress={handlePress} title={LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE_NEW_TICKET} actionType= {ACTION_TYPES.CREATE_TICKET} btnTxt = {LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE} placeholder={LANGUAGES_DATA[lang]?.HELP?.TICKET?.ENTER_SUBJECT} fullMsgPlaceholder={LANGUAGES_DATA[lang]?.HELP?.TICKET?.ENTER_FULL_MESSAGE} closeTxt={LANGUAGES_DATA[lang]?.HELP?.TICKET?.CANCEL} uploadTxt={LANGUAGES_DATA[lang]?.HELP?.TICKET?.UPLOAD_TXT}/>

            <View style= {myTicketsStyles.ROW_CENTER}>
                <Pressable elevation={3} onPress={()=> setCreateTicket(true)} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>{LANGUAGES_DATA[lang]?.HELP?.TICKET?.CREATE_NEW_TICKET}</Text>
                </Pressable>
            </View>

            <View style={myTicketsStyles.ROW}>
                <Text style={COMMON_STYLES.BODY_TITLE}>{LANGUAGES_DATA[lang]?.HELP?.TICKET?.RAISED_TICKETS}</Text>
            </View>
            <ScrollView style={myTicketsStyles.CONTAINER}>
                {allTickets}
            </ScrollView>
        </View>
    )
}

export default MyTickets;