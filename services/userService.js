
import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';

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

     getAllUsers() {
        const option = {
            url: `${BACKEND_URL}/users`,
        };

        return axios.get(option);
    }

    doAfterLogin(encodedToken) {
        const decodedToken = jwt.decode(encodedToken, { complete: true });

        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify(decodedToken.payload))

        return decodedToken.payload;
    }

    getUser() {
        let user  = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user);
        }

        return user;
    }

    getRoleKey() {
        let user  = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user);
        }

        return user?.roleId?.roleKey;
    }

    getUserStoreIds() {
        let user  = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user);
        }

        return user?.stores;
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
