import { Http } from './../core'
import { ENV } from './../config/env'

export class WinnersService {
    getWinners(part, limit) {
        const http = new Http();

        return new Promise(async (resolve, reject) => {
            try {
                const response = await http.get(`${ENV.apiUrl}/public/winners?part=${part}&limit=${limit}`)
                resolve(response);
            }
            catch(error) {
                reject(error)
            }
        })
    }
}