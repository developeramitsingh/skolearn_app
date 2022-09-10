import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class TransactionService {
    static instance;

     static getInstance() {
        if (!TransactionService.instance) {
            TransactionService.instance = new TransactionService();
        }

        return TransactionService.instance;
    }

    createTransaction(data) {
        const option = {
            url: `${BACKEND_URL}/transaction`,
            data
        };

        return axios.post(option);
    }

    getAllTransaction(query, attribs) {
        const option = {
            url: `${BACKEND_URL}/transaction?query=${query}&attribs=${attribs}`,
        };

        return axios.get(option);
    }

    getTransactionById(id) {
        const option = {
            url: `${BACKEND_URL}/transaction/${id}`,
        };

        return axios.get(option);
    }

    updateTransaction(data) {
        const option = {
            url: `${BACKEND_URL}/transaction`,
            data
        };

        return axios.put(option);
    }
}

export default TransactionService.getInstance();

