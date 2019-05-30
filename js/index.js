//  1. Реализовать конструктор в ES6 синтаксисе (также используйте аргументы по умолчанию):
//  
//  function Component(tagName) {
//    this.tagName = tagName || 'div';
//    this.node = document.createElement(tagName);
//  }
//  
//  Пример вызова:
//  
//  const comp = new Component('span');

class Component {
    constructor(tagName = 'div') {
        this.tagName = tagName;
        this.node = document.createElement(tagName);
    }
}

const comp = new Component('span');
console.log('1.', comp);

//  2. Реализовать конструктор и методы в ES6 синтаксисе:
//  
//  function Component(tagName) {
//    this.tagName = tagName || 'div';
//    this.node = document.createElement(tagName);
//  }
//  
//  Component.prototype.setText = function (text) { 
//    this.node.textContent = text;
//  };

class Component2 {
    constructor(tagName = 'div') {
        this.tagName = tagName;
        this.node = document.createElement(tagName);
    }
    setText(text) {
        this.node.textContent = text;
    }
}

const comp2 = new Component2('span');
console.log('2.', comp2);

//  3. Создать класс калькулятора который будет принимать стартовое значение и у
//  него будут методы сложить, вычесть, умножить , разделить. Также у него должны
//  быть геттер и сеттер для получения и установки текущего числа с которым
//  производятся вычисления.

class Calc {
    constructor(number) { this.number = number; }
    get mainNumber() { return `Result is ${this.number}`; }
    set mainNumber(value) { this.number = value; return this; }
    plus(value) { this.number += value; return this; }
    minus(value) { this.number -= value; return this; }
    multiply(value) { this.number *= value; return this; }
    devide(value) { this.number /= value; return this; }
    raise(value) { this.number = Math.pow(this.number, value); return this; }
}

let testCalc = new Calc(100);
testCalc.plus(500).minus(100).devide(5).multiply(10).minus(990); // 10
console.log('3.', testCalc);

//  1. Получить пользователей (users) от сервера https://jsonplaceholder.typicode.com
//  используя класс созданный на занятии. Получив ответ от сервера вывести имена
//  пользователей на страницу. При клике на имя пользователя в произвольном месте
//  должна появиться подробная информация о нем. Для визуальной части можно использовать
//  bootstrap или другие фреймворки.

const addUsersBtn = document.getElementById("add-users");
const usersList = new UsersModule('#users-list');

addUsersBtn.addEventListener("click", () => {
    usersList
        .setClassName('one')
        .getUsers()
});