import { Http } from './../core';
import { ENV } from './../config/env';

export class NewsService {
    getNews(userToken) {
        const http = new Http();

        return new Promise(async (resolve, reject) => {
            try {
                const response = await http.get(`${ENV.apiUrl}/public/news?part=1&limit=15`, {
                    headers: {
                        'x-access-token': userToken
                    }
                })
                resolve(response);
            }
            catch(error) {
                reject(error);
            }
        })
    }
}