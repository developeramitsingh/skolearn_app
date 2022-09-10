import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class QuestionBankService {
    static instance;

     static getInstance() {
        if (!QuestionBankService.instance) {
            QuestionBankService.instance = new QuestionBankService();
        }

        return QuestionBankService.instance;
    }

    generateTest(query) {
        const option = {
            url: `${BACKEND_URL}/generate-test?query=${query}`,
        };

        return axios.get(option);
    }
}

export default QuestionBankService.getInstance();

