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

    incrementEnrolledCount(testId) {
        const option = {
            url: `${BACKEND_URL}/increment-enrolled-count/${testId}`,
        };
        console.info({option});

        return axios.get(option);   
    }

    getEnrolledSeatStatus(testId) {
        const option = {
            url: `${BACKEND_URL}/getenrolled-seats-status/${testId}`,
        };

        return axios.get(option);   
    }

    getScholarhipBreakUpByTestId(testId) {
        const option = {
            url: `${BACKEND_URL}/scholarhip-breakUp/${testId}`,
        };

        return axios.get(option);   
    }

    updateTest(data) {
        const option = {
            url: `${BACKEND_URL}/tests`,
            data,
        };

        return axios.put(option);   
    }
    
}

export default TestService.getInstance();

