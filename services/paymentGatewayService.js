import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class PaymentGatewayService {
    static instance;

     static getInstance() {
        if (!PaymentGatewayService.instance) {
            PaymentGatewayService.instance = new PaymentGatewayService();
        }

        return PaymentGatewayService.instance;
    }

    getTxnToken(data) {
        const option = {
            url: `${BACKEND_URL}/initiate-txn-token-paytm`,
            data
        };

        return axios.post(option);
    }

    verifyTxnStatus(data) {
        const option = {
            url: `${BACKEND_URL}/verify-txn-status-paytm`,
            data
        };

        return axios.post(option);
    }
}

export default PaymentGatewayService.getInstance();

