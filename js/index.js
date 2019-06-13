// 1. Есть класс Planet
// function Planet(name) {
//     this.name = name;
//     this.getName = function () {
//         return 'Planet name is ' + this.name;
//     }
// }
// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет
// принимать, кроме name, название спутника (satelliteName). Переопределите метод
// getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку +
// дополнительный текст 'The satellite is' + satelliteName.
// Например:
// var earth = new PlanetWithSatellite('earth', 'moon');
// earth.getName(); // 'Planet name is earth. The satellite is moon’

function Planet(name) {
    this.name = name;
    this.getName = function () {
        return 'Planet name is ' + this.name;
    }
}

function PlanetWithSatellite(name, satelliteName) {
    Planet.call(this, name);
    this.satelliteName = satelliteName;
    const planetName = this.getName();
    this.getName = function () {
        return planetName + '. ' + 'The satellite is' + ' ' + this.satelliteName;
    }
}

const earth = new PlanetWithSatellite('earth', 'moon');

console.log('1. earth(Class PlanetWithSatellite)', earth);

// 2. Создайте класс “Здание” (пусть у него будет имя, количество этажей,
// метод “получить количество этажей” и метод “установить количество этажей”).
// Создайте наследников этого класса:
// классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование

class Building {
    constructor(name, numberOfFloors) {
        this.name = name;
        this.floors = numberOfFloors;
    }
    
    get numberOfFloors() {
        return this.floors;
    }
    
    set numberOfFloors(value) {
        this.floors = value;   
    }
}

// У жилого дома появится свойство “количество квартир на этаже”, а метод
// “получить количество этажей” должен вернуть объект вида {
//     этажи: 5,
//     всегоКвартир: 5 * количествоКвартир
//     }

class House extends Building {
    constructor(name, numberOfFloors, numberOfApartmentsPerFloor) {
        super(name, numberOfFloors);
        this.apartmentsPerFloor = numberOfApartmentsPerFloor;
    }
    
    get numberOfFloors() {
        const floors = super.numberOfFloors;
        const totalApartments = floors * this.apartmentsPerFloor
        
        return {
            floors,
            totalApartments
        }
    }
    
    set numberOfFloors(value) {
        super.numberOfFloors = value
    }
}

// У торгового центра появится свойство “количество магазинов на этаже”, а метод
// “получить количество этажей” должен вернуть объект вида {
//     этажи: 3,
//     всегоМагазинов: 3 * количествоМагазинов
//     }
// От каждого класса создать экземпляр (дом, торговый центр)

class ShoppingCenter extends Building {
    constructor(name, numberOfFloors, numberOfStoresPerFloor) {
        super(name, numberOfFloors);
        this.storesPerFloor = numberOfStoresPerFloor;
    }

    get numberOfFloors() {
        const floors = super.numberOfFloors;
        const totalStores = floors * this.storesPerFloor;

        return {
            floors,
            totalStores
        }
    }

    set numberOfFloors(value) {
        super.numberOfFloors = value;
    }
}


const HouseCity = new House('HouseCity', 10, 3);
const ShoppingCity = new ShoppingCenter('ShoppingCity', 5, 14);

console.log('2. HouseCity(Class House) =>', HouseCity);
console.log('2. ShoppingCity(Class ShoppingCenter) =>', ShoppingCity);

// 3. Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом
// “получить информацию” (метод должен вывести имя и цену). Метод должен быть
// объявлен с помощью прототипов (Func.prototype...). Создать два экземпляра
// класса “Мебель”: экземпляр “ОфиснаяМебель” и “Мебель для дома”.
// Придумайте им по одному свойству, которые будут характерны только для этих
// экземпляров (например, для офисной мебели - наличие компьютерного стола или шредера).
// Метод “получить информацию” должен учитывать и добавленное вами новое свойство.
// Задача на переопределение метода у экземпляров класса.

function Furniture(name, price) {
        this.name = name;
        this.price = price;
}

Furniture.prototype.getInfo = function () {
    const {name, price} = this
    
    return {
        name,
        price
    };
}

// Office furniture
function OfficeFurniture(name, price, computerTableValue) {
    Furniture.call(this, name, price);
    this.computerTable = computerTableValue;
}

OfficeFurniture.prototype = Object.create(Furniture.prototype);
OfficeFurniture.prototype.constructor = OfficeFurniture;

OfficeFurniture.prototype.getInfo = function () {
    const info = Furniture.prototype.getInfo.call(this);
    info.computerTable = this.computerTable;
    return info;
}

// Home furniture
function HomeFurniture(name, price, ecoFriendlyValue) {
    Furniture.call(this, name, price);
    this.ecoFriendly = ecoFriendlyValue;
}

HomeFurniture.prototype = Object.create(Furniture.prototype);
HomeFurniture.prototype.constructor = HomeFurniture;

HomeFurniture.prototype.getInfo = function () {
    const info = Furniture.prototype.getInfo.call(this);
    info.ecoFriendly = this.ecoFriendly;
    return info;
}

// Test
const table = new OfficeFurniture('Table', 6500, false);
const bed = new HomeFurniture('Bed', 12500, true);

console.log('3. OfficeFurniture =>', table);
console.log('3. HomeFurniture =>', bed);

// 4. Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации”
// и методом “получить информацию” (метод должен вывести имя и дату регистрации).
// Метод должен быть объявлен с помощью прототипов (Func.prototype...) Создать два
// наследника класса “Пользователь”: класс “Админ” и класс “Гость”.
// У класса “Админ” должно быть дополнительное свойство “суперАдмин”
// (может быть true/false, должно быть скрытым).
// Свойства определяются в момент вызова конструктора.
// У класса “Гость” должно быть свойство “срокДействия” (validDate, например),
// содержащее дату (например, одну неделю от момента регистрации).
// У классов-наследников метод “получить информацию” должен так же содержать
// информацию о дополнительных свойствах (“суперАдмин” и “срокДействия”)

function User(name, dateOfRegistration) {
        this.name = name;
        this.dateOfReg = new Date(dateOfRegistration);
}

User.prototype.getInfo = function () {
    const {name, dateOfReg} = this;

    return {
        name,
        dateOfReg
    };
}

function Admin(name, dateOfRegistration, superAdminValue) {
    User.call(this, name, dateOfRegistration);
    this._superAdmin = superAdminValue;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.getInfo = function() {
    const info = User.prototype.getInfo.call(this);
    info.superAdmin = this._superAdmin;
    return info;
}

function Guest(name, dateOfRegistration, validDateValue) {
    User.call(this, name, dateOfRegistration);
    this.validDate = this.getValidDate(validDateValue);
}

Guest.prototype = Object.create(User.prototype);
Guest.prototype.constructor = Guest;

Guest.prototype.getValidDate = function(value) {    // Метод который возращает дату через какое-то количество дней
    let validDateValue = new Date(this.dateOfReg);

    for (let index = 0; index < value; index++) {
        validDateValue.setDate(validDateValue.getDate() + 1);
    }
    
    return validDateValue;
}

Guest.prototype.getInfo = function() {
    const info = User.prototype.getInfo.call(this);
    info.validDate = this.validDate;
    return info;
}

const admin = new Admin('Maks', '06.13.2019 11:45', true);
const guest = new Guest('Valera', '06.13.2019 11:45', 7);   // (name, date, day)

console.log('4. admin(Class Admin) =>', admin);
console.log('4. guest(Class Guest) =>', guest);