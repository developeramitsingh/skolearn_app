import {  BACKEND_URL } from '../constant/constant';
import axios from '../common/functions/axios';
class RolesService {
    static instance;

     static getInstance() {
        if (!RolesService.instance) {
            RolesService.instance = new RolesService();
        }

        return RolesService.instance;
    }

     createRoles(data) {
        const option = {
            url: `${BACKEND_URL}/roles`,
            data,
        };

        return axios.post(option);
    }

    getAllRoles() {
        const option = {
            url: `${BACKEND_URL}/roles`,
        };

        return axios.get(option);
    }

    getRolesByQuery(query, attribs) {
        const option = {
            url: `${BACKEND_URL}/roles?query=${query}&attribs=${attribs}`,
        };

        console.info(option);

        return axios.get(option);   
    }

    checkRouteAccess(path) {
        const option = {
            url: `${BACKEND_URL}/checkRouteAccess?path=${path}`,
        };
        return axios.get(option);
    }
}

export default RolesService.getInstance();

