import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class UserDocsService {
    static instance;

     static getInstance() {
        if (!UserDocsService.instance) {
            UserDocsService.instance = new UserDocsService();
        }

        return UserDocsService.instance;
    }

    createOrUpdateUserDocs(data) {
        const option = {
            url: `${BACKEND_URL}/userdocs`,
            data
        };

        return axios.post(option);
    }

    getAllUserDocs(query, attribs) {
        const option = {
            url: `${BACKEND_URL}/userdocs?query=${query}`,
        };

        return axios.get(option);
    }

    getUserDocsById(id) {
        const option = {
            url: `${BACKEND_URL}/userdocs/${id}`,
        };

        return axios.get(option);
    }
    uploadUserDocs(data) {
        const option = {
            url: `${BACKEND_URL}/userdocs`,
            data,
            headers: {
                'content-type': "multipart/form-data"
            }
        };

        return axios.post(option);
    }
}

export default UserDocsService.getInstance();

