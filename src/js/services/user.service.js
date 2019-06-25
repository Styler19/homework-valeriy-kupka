import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class UserService {
    getUser(id) {
        const http = new Http();

        return new Promise(async (resolve, reject) => {
            try {
                const response = await http.get(`${ENV.apiUrl}/public/users/get-info/${id}`)
                console.log(response);
                resolve(response);
            }
            catch(error) {
                console.log(error);
                reject(error);
            }
        });
    }
}