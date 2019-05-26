//  1. Создайте функцию которая бы умела делать:
//      minus(10)(6); // 4
//      minus(5)(6); // -1
//      minus(10)(); // 10
//      minus()(6); // -6
//      minus()(); // 0
//      Подсказка, функция minus должна возвращать другую функцию.

function minus (number1 = 0) {
    return function(number2 = 0) {
        return number1 - number2;
    };
};

//  2. Реализовать функцию, которая умножает и умеет запоминать возвращаемый результат между вызовами:
//      function multiplyMaker ...
//      const multiply = multiplyMaker(2);
//      multiply(2); // 4 (2 * 2)
//      multiply(1); // 4 (4 * 1)
//      multiply(3); // 12 (4 * 3)
//      multiply(10); // 120 (12 * 10)

function multiplyMaker (mainNumber) {
    return function(number = 1) {
        return mainNumber *= number;
    };
};

const multiply = multiplyMaker(2);

//  3. Реализовать модуль, который работает со строкой и имеет методы:
//      a. установить строку
//          i. если передано пустое значение, то установить пустую строку
//          ii. если передано число, число привести к строке
//      b. получить строку
//      c. получить длину строки
//      d. получить строку-перевертыш
//      Пример:
//          модуль.установитьСтроку(‘abcde’);
//          модуль.получитьСтроку(); // ‘abcde’
//          модуль.получитьДлину(); // 5

const stringMethods = (function () {
    let mainString;

    function setString(string = '') {
        if (typeof(string) === 'number') {
            string = String(string);
        }
        mainString = string;

        return mainString;
    };

    function getString() {
        return mainString;
    };

    function getLengthOfString() {
        return mainString.length;
    };

    function getReverseOfstring() {
        let reversedString = mainString
            .split('')
            .reverse()
            .join('')

        return reversedString;
    };

    return {
        setString,
        getString,
        getLengthOfString,
        getReverseOfstring
    }
})();

//  4. Создайте модуль “калькулятор”, который умеет складывать, умножать, вычитать, делить и возводить в степень. Конечное значение округлить до двух знаков после точки (значение должно храниться в обычной переменной, не в this).
//
//      модуль.установитьЗначение(10); // значение = 10
//      модуль.прибавить(5); // значение += 5
//      модуль.умножить(2); // значение *= 2
//      модуль.узнатьЗначение(); // вывести в консоль 30 (здесь надо округлить)
//
//    Также можно вызывать методы цепочкой:
//        модуль.установитьЗначение(10).вСтепень(2).узнатьЗначение(); // 100

const calc = (function () {
    let mainNumber;

    function setNumber(number = 0) {
        mainNumber = number;
        return this;
    };

    function getNumber() {
        return mainNumber.toFixed(2);
    };

    function plus(number = 0) {
        mainNumber += number;
        return this;
    };

    function minus(number = 0) {
        mainNumber -= number;
        return this;
    };

    function multiply(number = 1) {
        mainNumber *= number;
        return this;
    };

    function devide(number = 1) {
        mainNumber /= number;
        return this;
    };

    function raise(number = 1) {
        mainNumber = Math.pow(mainNumber, number);
        return this;
    };

    return {
        setNumber,
        getNumber,
        plus,
        minus,
        multiply,
        devide,
        raise
    };
})();

console.log('4.', calc.setNumber(10).raise(2).getNumber());

//  1. Создать конструктор для производства автомобилей. Конструктор должен принимать марку автомобиля и возраст машины. Конструктор должен иметь метод, который возвращает марку, и
//  второй метод, который возвращает год производства машины (год текущий минус возраст машины, использовать Date для получения текущего года)
//      var lexus = new Car(‘lexus’, 2);
//      lexus.получитьМарку(); // “Lexus”
//      lexus.получитьГодВыпуска(); // 2017 (2019-2);
//      Марка машины всегда должна возвращаться с большой буквы!

function Car(model, age) {
    const date = new Date();

    this.model = model[0].toUpperCase() + model.slice(1);
    this.yearOfCarManufacture = date.getFullYear() - age;
}

const lexus = new Car('lexus', 2);

//  2. Написать конструктор, который умеет элементарно шифровать строки (например, сделать из строки строку-перевертыш, или заменить все символы их цифровым представлением, или любой другой метод). Конструктор при инициализации получает строку и имеет следующие методы:
//      a. показать оригинальную строку
//      b. показать зашифрованную строку
//  Строки не должны быть доступны через this, только с помощью методов.

const EncoderOfString = function(string) {
    this.getString = function () {
        return string;
    };

    this.crypteString = function () {
        return string
            .split('')
            .reverse()
            .join('');
    };
};

const string = new EncoderOfString('Hello, Easycode');