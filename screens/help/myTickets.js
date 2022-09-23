import { myTicketsStyles } from './myTicketsStyles'; 
import { View, Text, ScrollView, Pressable } from 'react-native'
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { useState } from 'react';
import ModalTicket from '../../components/modals/modalTicket';
import { CLOSE_MODAL, HELP_TABS, ACTION_TYPES } from '../../constant/constant';

const MyTickets = ({handleOpenTicket}) => {
    const [state, setState] = useState({
        allTickets: [{
            id: 1,
            ticketSubject: "Not able to open test",
            status: 'Open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            ticketSubject: "Not able to open test",
            status: 'Open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 3,
            ticketSubject: "Not able to open test",
            status: 'Open',
            createdAt: new Date().toISOString(),
        }],
    });

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
                    <Text style={COMMON_STYLES.BODY_TEXT}>{ticket.status}</Text>
                </View>
                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>Ticket Id {ticket.id}</Text>
                    
                </View>

                <View style={myTicketsStyles.ROW}>
                    <Text style={COMMON_STYLES.BODY_TEXT}>{ticket.createdAt}</Text>
                </View>
            </Pressable>
        );
    });

    return (
        <View style = { myTicketsStyles.CONTAINER }>
            <ModalTicket modalVisible={createTicketModal} handleModalPress={handlePress} title="Create New Ticket" actionType= {ACTION_TYPES.CREATE_TICKET} btnTxt = 'Create' placeholder='Enter Subject'/>

            <View style= {myTicketsStyles.ROW_CENTER}>
                <Pressable elevation={3} onPress={()=> setCreateTicket(true)} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>Raise a new Ticket</Text>
                </Pressable>
            </View>

            <View style={myTicketsStyles.ROW}>
                <Text style={COMMON_STYLES.BODY_TITLE}>Raised Tickets</Text>
            </View>
            <ScrollView style={myTicketsStyles.CONTAINER}>
                {allTickets}
            </ScrollView>
        </View>
    )
}

export default MyTickets;