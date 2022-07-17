import {  BACKEND_URL } from '../constant/constant';
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
            url: `${BASE_URL}/roles`,
            data,
        };

        return axios.post(option);
    }

    getAllRoles() {
        const option = {
            url: `${BASE_URL}/roles`,
        };

        return axios.get(option);
    }

    checkRouteAccess(path) {
        const option = {
            url: `${BASE_URL}/checkRouteAccess?path=${path}`,
        };
        return axios.get(option);
    }
}

export default RolesService.getInstance();

