import { Http } from './../core';
import { ENV } from './../config/env';

export class UserService {
    getUser(id) {
        const http = new Http();

        return new Promise(async (resolve, reject) => {
            try {
                const response = await http.get(`${ENV.apiUrl}/public/users/get-info/${id}`)
                resolve(response);
            }
            catch(error){
                reject(error);
            };
        });
    }

    async getUserImages(id) {
        const http = new Http();

        return await http.get(`${ENV.apiUrl}/public/users/my-images/${id}`)
    }
}