import { myTicketsStyles } from './myTicketsStyles'; 
import {TouchableHighlight, View, Text, ScrollView, Pressable } from 'react-native'
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { useState } from 'react';
import ModalWindow from '../../components/modals/modalTicket';
import { CLOSE_MODAL, HELP_TABS } from '../../constant/constant';

const MyTickets = ({handleOpenTicket}) => {
    const ACTIONS = {
        CREATE_TICKET: 'createTicket',
        OPEN_TICKET: 'openTicket',
    };

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
        if(actionType === ACTIONS.CREATE_TICKET) {
            console.info('createTicket');
            //call api to create ticket entry
            setCreateTicket(false);
        } else if(actionType === CLOSE_MODAL) {
            setCreateTicket(false);
        } else if(actionType === ACTIONS.OPEN_TICKET) {
            console.info({ openticket: payload });
            handleOpenTicket(payload);
        }
    };

    const allTickets = state.allTickets?.map(ticket => {
        return (
            <Pressable key={ticket.id} style={COMMON_STYLES.CARD} onPress={()=>handlePress(ACTIONS.OPEN_TICKET, ticket.id)}>
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
            <ModalWindow modalVisible={createTicketModal} handleModalPress={handlePress} title="Create New Ticket" actionType= {ACTIONS.CREATE_TICKET} btnTxt = 'Create' placeholder='Enter Subject'/>

            <View style= {myTicketsStyles.ROW_CENTER}>
                <TouchableHighlight onPress={()=> setCreateTicket(true)} style={COMMON_STYLES.SUB_BTN_1}>
                    <Text style={COMMON_STYLES.SUB_BTN_TXT}>Raise a new Ticket</Text>
                </TouchableHighlight>
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