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

    async sendAppLogs(data) {
        try {
            const option = {
                url: `${BACKEND_URL}/send-app-logs`,
                data,
            };

            console.info({option})
    
            return await axios.post(option);
        } catch (err) {
            console.error(`error in sendAppLogs`, err);
        }
    }
}

export default SendAppLogService.getInstance();

