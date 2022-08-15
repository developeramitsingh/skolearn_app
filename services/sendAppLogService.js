import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class SendAppLogService {
    static instance;

     static getInstance() {
        if (!SendAppLogService.instance) {
            SendAppLogService.instance = new SendAppLogService();
        }

        return SendAppLogService.instance;
    }

     sendAppLogs(data) {
        const option = {
            url: `${BACKEND_URL}/send-app-logs`,
            data,
        };

        return axios.post(option);
    }
}

export default SendAppLogService.getInstance();

