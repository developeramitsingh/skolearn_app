
import {  BACKEND_URL, STORAGE_KEYS } from '../constant/constant';
import axios from '../common/functions/axios';
import { getFromStorage } from '../utils/utils';

class UserService {
    static instance;

     static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

     createUser(data) {
        const option = {
            url: `${BACKEND_URL}/userRegister`,
            data,
        };

        return axios.post(option);
    }

    getUserById(id) {
        const option = {
            url: `${BACKEND_URL}/users/${id}`,
        };

        return axios.get(option);
    }

    updateUser(data) {
        const option = {
            url: `${BACKEND_URL}/users`,
            data,
        };

        return axios.put(option);
    }

    login(data) {
        const option = {
            url: `${BACKEND_URL}/login`,
            data,
        };

        return axios.post(option);
    }

    async verifyOtp(data) {
        const otpToken = await getFromStorage(STORAGE_KEYS.OTP_TOKEN);
        const option = {
            url: `${BACKEND_URL}/verifyotp`,
            data,
            headers: {
                'Authorization': `Bearer ${otpToken}`
            }
        };

        return axios.post(option);
    }

     getAllUsers() {
        const option = {
            url: `${BACKEND_URL}/users`,
        };

        return axios.get(option);
    }


    getLoggedInUser() {
        const option = {
            url: `${BACKEND_URL}/logged-in-user`,
        };

        return axios.get(option);
    }

    getRoleKey() {
        let user  = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user);
        }

        return user?.roleId?.roleKey;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    async checkDoLogin(path) {
        try {
          if (path) {
            let data = await roleService.checkRouteAccess(path);
            console.info({data});
            return false;
          }
        } catch (err) {
          console.info("err", err.message);
          this.dologout();
          //historyState.history.push("/login");
        }
    }

    dologout() {
        localStorage.clear();
        historyState.history.push("/login");
    }
}

export default UserService.getInstance();
