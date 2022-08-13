import {  BACKEND_URL } from '../constant/constant';
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
            url: `${BASE_URL}/user-recordings`,
            data,
        };

        return axios.post(option);
    }

    getAllUserRecordings() {
        const option = {
            url: `${BASE_URL}/user-recordings`,
        };

        return axios.get(option);
    }

    getRecordingById(id) {
        const option = {
            url: `${BASE_URL}/user-recordings/${id}`,
        };

        return axios.get(option);
    }
}

export default UserRecordingsService.getInstance();

