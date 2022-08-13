import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class UserRecordingsService {
    static instance;

     static getInstance() {
        if (!UserRecordingsService.instance) {
            UserRecordingsService.instance = new UserRecordingsService();
        }

        return UserRecordingsService.instance;
    }

     createUserRecording(data) {
        const option = {
            url: `${BACKEND_URL}/user-recordings`,
            data,
        };

        return axios.upload(option);
    }

    getAllUserRecordings() {
        const option = {
            url: `${BACKEND_URL}/user-recordings`,
        };

        return axios.get(option);
    }

    getRecordingById(id) {
        const option = {
            url: `${BACKEND_URL}/user-recordings/${id}`,
        };

        return axios.get(option);
    }
}

export default UserRecordingsService.getInstance();

