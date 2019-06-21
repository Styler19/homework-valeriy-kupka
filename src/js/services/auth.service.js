import {
    Http
} from './../core/http.service'
import {
    ENV
} from './../config/env'

export class AuthService {
    login(email, password) {
        const http = new Http()

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/login`, {
                email,
                password
            })
            .then((res) => {
                // Если нет авторизации - рареджектим промис, чтобы отстрелил catch
                // либо сразу дернем reject(es.message) и catch нам не нужен
                if (!res.auth) return Promise.reject(res.message)

                localStorage.setItem('sn_user_id', res.id)
                localStorage.setItem('sn_user_token', res.token)
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    signup() {
        const http = new Http()

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/signup`, {
                email: "cupotowotu@eyeemail.com",
                password: "dmgame12345",
                nickname: "dmgame",
                first_name: "Denis",
                last_name: "Mescheryakov",
                phone: "0631234567",
                gender_orientation: "male", // or "female"
                city: "Kharkiv",
                country: "Ukrane",
                date_of_birth_day: 1,
                date_of_birth_month: 3,
                date_of_birth_year: 1989
            })
            .then((res) => {
                if (res.error) return Promise.reject(res.message)

                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    //public/auth/signup

}