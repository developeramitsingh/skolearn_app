import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class TestService {
    static instance;

     static getInstance() {
        if (!TestService.instance) {
            TestService.instance = new TestService();
        }

        return TestService.instance;
    }

    getTests(query) {
        const option = {
            url: `${BACKEND_URL}/tests?query=${query}`,
        };

        return axios.get(option);
    }

    getTestById(id) {
        const option = {
            url: `${BACKEND_URL}/tests/${id}`,
        };

        return axios.get(option);   
    }

    
}

export default TestService.getInstance();

