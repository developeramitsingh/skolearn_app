import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class FreeTicketsService {
    static instance;

     static getInstance() {
        if (!FreeTicketsService.instance) {
            FreeTicketsService.instance = new FreeTicketsService();
        }

        return FreeTicketsService.instance;
    }

    getFreeTickets() {
        const option = {
            url: `${BACKEND_URL}/get-free-tickets-user`,
        };

        return axios.get(option);
    }

    updateFreeTickets(data) {
        const option = {
            url: `${BACKEND_URL}/freeTickets`,
            data,
        };

        return axios.put(option);
    }
}

export default FreeTicketsService.getInstance();

