import { myTicketsStyles } from './myTicketsStyles'; 
import { View, Text, ScrollView, Pressable } from 'react-native'
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { useEffect, useState } from 'react';
import ModalTicket from '../../components/modals/modalTicket';
import { CLOSE_MODAL, ACTION_TYPES } from '../../constant/constant';
import { setCurrentLanguage } from '../../common/functions/commonHelper';
import { LANGUAGES_DATA, TICKET_STATUSES } from '../../constant/language';
import { ticketsRaisedService } from '../../services';

const MyTickets = ({handleOpenTicket}) => {
    const [tickets, setTickets] = useState([]);
    const [lang, setLang] = useState();
    const [createTicketModal, setCreateTicket] = useState(false);

    const getAllRaisedTickets = async () => {
        try {
            const allTickets = await ticketsRaisedService.getAllTicketsRaised('{}', []);

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
            const formData = new FormData();

            formData.append('imgFile', {
                name: `image_UserId:${route?.params?.user?._id}.jpeg`,
                uri: data.ticketImg,
                type: "image/jpeg",
            });

            for (const key in data) {
                formData.append(key, data[key]);
            }

            await ticketsRaisedService.createTicketsRaised(formData); 
        } catch (err) {
            console.error(`error in raiseNewTicket: ${err}`);
        }
    }

    const handlePress = async (actionType, payload) => {
        if(actionType === ACTION_TYPES.CREATE_TICKET) {
            console.info('createTicket');
            await raiseNewTicket(payload);
            //call api to create ticket entry
            setCreateTicket(false);
        } else if(actionType === CLOSE_MODAL) {
            setCreateTicket(false);
        } else if(actionType === ACTION_TYPES.OPEN_TICKET) {
            console.info({ openticket: payload });
            handleOpenTicket(payload);
        }
    };

    const allTickets = tickets?.map(ticket => {
        return (
            <Pressable key={ticket._id} style={COMMON_STYLES.CARD} onPress={()=>handlePress(ACTION_TYPES.OPEN_TICKET, ticket._id)}>
                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TITLE}>{ticket.subject}</Text>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{TICKET_STATUSES[lang]?.[ticket.status]}</Text>
                </View>
                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{LANGUAGES_DATA[lang]?.HELP?.TICKET?.TICKET_ID} {ticket._id}</Text>
                    
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