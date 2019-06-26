export class Http {
    post(url, data, options) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                resolve(response.json());
            }
            catch(error) {
                reject(error);
            }
        });
    }
    get(url, options = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, options)
                resolve(response.json());
            }
            catch(error) {
                reject(error);
            }
        });
    }
}

