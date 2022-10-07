import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class TicketsRaisedService {
    static instance;

     static getInstance() {
        if (!TicketsRaisedService.instance) {
            TicketsRaisedService.instance = new TicketsRaisedService();
        }

        return TicketsRaisedService.instance;
    }

    createTicketsRaised(data) {
        const option = {
            url: `${BACKEND_URL}/tickets-raised`,
            data,
            headers: {
                'content-type': "multipart/form-data"
            }
        };

        return axios.post(option);
    }

    getAllTicketsRaised(query, attribs) {
        const option = {
            url: `${BACKEND_URL}/tickets-raised?query=${query}&attribs=${attribs}`,
        };

        return axios.get(option);
    }

    getTicketsRaisedById(id) {
        const option = {
            url: `${BACKEND_URL}/tickets-raised/${id}`,
        };

        return axios.get(option);
    }

    updateTicketsRaised(data) {
        const option = {
            url: `${BACKEND_URL}/tickets-raised`,
            data,
            headers: {
                'content-type': "multipart/form-data"
            }
        };

        return axios.put(option);
    }
}

export default TicketsRaisedService.getInstance();

