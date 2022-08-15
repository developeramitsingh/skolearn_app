import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class EnrolledTestsService {
    static instance;

     static getInstance() {
        if (!EnrolledTestsService.instance) {
            EnrolledTestsService.instance = new EnrolledTestsService();
        }

        return EnrolledTestsService.instance;
    }

    getAllEnrolledTests() {
        const option = {
            url: `${BACKEND_URL}/enrolled-tests`,
        };

        return axios.get(option);
    }

    getEnrolledQuesTestByTestId(testId) {
        const option = {
            url: `${BACKEND_URL}/enrolled-tests-ques/${id}`,
        };

        return axios.get(option);
    }

    getEnrolledTestByTestId(testId) {
        const option = {
            url: `${BACKEND_URL}/enrolled-tests-testid/${testId}`,
        };

        return axios.get(option);
    }

    getEnrolledTestById(_id) {
        const option = {
            url: `${BACKEND_URL}/enrolled-tests/${_id}`,
        };

        return axios.get(option);
    }

    updateEnrolledTests(data) {
        const option = {
            url: `${BACKEND_URL}/enrolled-tests`,
            data
        };

        return axios.put(option);
    }
}

export default EnrolledTestsService.getInstance();

