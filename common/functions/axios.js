import axios from 'axios';
import { STORAGE_KEYS } from '../../constant/constant';
import { getFromStorage } from '../../utils/utils';
// import userService from  '../../services/userService';

class Axios {
    constructor() {}
    static instance;

    static getInstance() {
        if (!Axios.instance) {
            Axios.instance = new Axios();
        }

        return Axios.instance;
    }

    async get(options) {
        options.method = "get";
        options.headers = await this.getHeaders(options.headers);
        return new Promise((resolve, reject) => {
          axios
            .get(options.url, options)
            .then((response) => {
              resolve(response.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

    async post(options) {
        options.method = "POST";
        options.headers = await this.getHeaders(options.headers);

        options.timeout = 1000*500;

        return new Promise((resolve, rej) => {
            axios(options)
                .then((res) => {
                    resolve(res);
                })
                .catch(err => {
                    rej(err);
                });
        });
    }

    async upload(options) {
        options.method = "POST";
        options.headers = await this.getHeaders(options.headers);
        options.headers["content-type"] = "multipart/form-data";
        return new Promise((resolve, reject) => {
          axios(options)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

      async patch(options) {
        options.method = "PATCH";
        options.headers = await this.getHeaders(options.headers);
        return new Promise((resolve, reject) => {
          axios(options)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    
      async put(options) {
        options.method = "PUT";
        options.headers = await this.getHeaders(options.headers);
        return new Promise((resolve, reject) => {
          axios(options)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

      async delete(options) {
        options.method = "DELETE";
        options.headers = await this.getHeaders(options.headers);
        return new Promise((resolve, reject) => {
          axios(options)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

    async getHeaders(headers) {
        const token = await getFromStorage(STORAGE_KEYS.USER_TOKEN);
        return {
          Authorization: `Bearer ${token}`,
          ...headers
        };
    }

}

export default Axios.getInstance();