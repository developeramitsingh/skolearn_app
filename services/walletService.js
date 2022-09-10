import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

class WalletService {
    static instance;

     static getInstance() {
        if (!WalletService.instance) {
            WalletService.instance = new WalletService();
        }

        return WalletService.instance;
    }

    getWalletBalance() {
        const option = {
            url: `${BACKEND_URL}/get-wallet-balance-user`,
        };

        return axios.get(option);
    }

    updateWallet(data) {
        const option = {
            url: `${BACKEND_URL}/wallet`,
            data,
        };

        return axios.put(option);
    }
}

export default WalletService.getInstance();

