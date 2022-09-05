import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class NotificationsService {
    static instance;

     static getInstance() {
        if (!NotificationsService.instance) {
            NotificationsService.instance = new NotificationsService();
        }

        return NotificationsService.instance;
    }

    getAllNotifications(query) {
        const option = {
            url: `${BACKEND_URL}/notifications?query=${query}`,
        };

        return axios.get(option);
    }

    updateNotification(data) {
        const option = {
            url: `${BACKEND_URL}/notifications`,
            data,
        };

        return axios.put(option);
    }
}

export default NotificationsService.getInstance();

