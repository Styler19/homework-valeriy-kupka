import { Http } from './../core';
import { ENV } from './../config/env';

export class NewsService {
    getNews(userToken) {
        const http = new Http();

        return new Promise(async (resolve, reject) => {
            try {
                const response = await http.get(`${ENV.apiUrl}/public/news`, {
                    headers: {
                        'x-access-token': userToken
                    }
                })
                console.log(response);
                resolve(response);
            }
            catch(error) {
                reject(error);
            }
        })
    }
}