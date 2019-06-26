// // // 


// for (let index = 0; index < 3; index++) {
//     // index
//     setTimeout(() => {
//         console.log(index);
//     }, 1000);
// }

// function User(name, age) {
//     this.name = name
//     this.age = age
//     this.getName = function () {
//         return this.name
//     }

//     this.getAge = function () {
//         return this.age
//     }

//     this.getFullInfo = function () {
//         return `User Name - ${this.userName}`
//     }
// }

// function OtherUser() {
//     this.userName = 'Other user'
// }

// OtherUser.prototype = new User('Pasha', 18)

// const otherUser = new OtherUser()

// const pasha = new User('Pasha', 18);
// const alina = new User('Alina', 30)

// console.log('Pasha - ', pasha)
// console.log('Alina - ', alina)

// // // prototype
// function Car(settings) {
//     const {
//         name,
//         model,
//         totalMiles = 0,
//         totalFuelValue = 10
//     } = settings

//     this.name = name;
//     this.model = model;
//     this.totalMiles = totalMiles;
//     this.totalFuelValue = totalFuelValue;
// }

// Car.prototype.drive = function () {
//     this.totalMiles++;
//     this.totalFuelValue--;
// };

// Car.prototype.refuel = function () {
//     this.totalFuelValue--;
// }

// const myCar = new Car({
//     name: 'BMW',
//     model: 'M10'
// });

// // myCar.drive();
// console.log('BMW M10', myCar);

// const herCar = new Car({
//     name: 'Daewoo',
//     model: 'Matiz',
//     totalMiles: 9999999
// });
// console.log('Daewoo Matiz', herCar);









// // ES6
// class Traktor {
//     constructor(name, key) {
//         this.name = name;
//         this.__myVal = 0;
//         this[key] = () => {
//             console.log('myMethod');
//         }
//     }

//     get myVal() {
//         return this.__myVal;
//     }

//     set myVal(newValue) {
//         if (typeof newValue !== 'number') return console.error('Ууууу Error');

//         this.__myVal = newValue;
//     }



//     singSong() {
//         // Traktor.getDate();
//         console.log('MuMuMuMu....');
//     }

//     static getDate() {
//         return new Date();
//     }
// }

// const myTraktor = new Traktor('Bob', 'method');

// console.log(Traktor.getDate());

// AJAX
// http://easycode.school/courses?limit=10
// GET, POST, PUT, DELETE
// 200, 300, 400, 500 - ответы от сервера

const url = 'https://jsonplaceholder.typicode.com';

// get TODOS
// const xhr = new XMLHttpRequest();

// xhr.open('GET', `${url}/todos`);
// xhr.send();

// xhr.addEventListener('load', () => {
//     console.log(xhr.responseText);
// });


// // get USERS
// const xhr2 = new XMLHttpRequest();

// xhr2.open('GET', `${url}/users`);
// xhr2.send();

// xhr2.addEventListener('load', () => {
//     console.log(xhr2.responseText);
// });

// TODO: write the CustomHttp class
class CustomHttp {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', () => {
            const resp = JSON.parse(xhr.responseText)
            callback(resp);
        });
    }
    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(data);
        xhr.addEventListener('load', () => {
            const resp = JSON.parse(xhr.responseText)
            callback(resp);
        });
    }
}



const http = new CustomHttp();

// http.get('https://jsonplaceholder.typicode.com/todos', (response) => {
//     console.log('TODOS --- ', response);
// });

// http.get('https://jsonplaceholder.typicode.com/users', (response) => {
//     console.log('USERS ---', response);
// });

const data = {
    body: 'Some body',
    userId: 1,
    title: 'Some title'
};
http.post('https://jsonplaceholder.typicode.com/todos', JSON.stringify(data), (response) => {
    console.log(response);
    http.get('https://jsonplaceholder.typicode.com/todos', (response) => {
        console.log('TODOS --- ', response);
    });
});