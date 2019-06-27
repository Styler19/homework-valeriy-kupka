import { Http } from './../core'
import { ENV } from './../config/env'

export class WinnersService {
    getWinners({ part = 1, limit = 15 }) {
        const http = new Http();

        return new Promise(async (resolve, reject) => {
            try {
                const response = await http.get(`${ENV.apiUrl}/public/winners?part=${part}&limit=${limit}`);
                if (!response) return reject(response);
                resolve(response);
            }
            catch(error) {
                reject(error)
            }
        })
    }
}