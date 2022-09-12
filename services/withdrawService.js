import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class WithdrawService {
    static instance;

     static getInstance() {
        if (!WithdrawService.instance) {
            WithdrawService.instance = new WithdrawService();
        }

        return WithdrawService.instance;
    }

    createWithdraw(data) {
        const option = {
            url: `${BACKEND_URL}/withdraw-request`,
            data
        };

        return axios.post(option);
    }

    getAllWithdraw(query, attribs) {
        const option = {
            url: `${BACKEND_URL}/withdraw-request?query=${query}&attribs=${attribs}`,
        };

        return axios.get(option);
    }

    getWithdrawById(id) {
        const option = {
            url: `${BACKEND_URL}/withdraw-request/${id}`,
        };

        return axios.get(option);
    }

    updateWithdraw(data) {
        const option = {
            url: `${BACKEND_URL}/withdraw-request`,
            data
        };

        return axios.put(option);
    }
}

export default WithdrawService.getInstance();

