//  If else. Задачи.

//  1. Если переменная равна “hidden”, присвоить ей значение “visible”, иначе - “hidden”.

let someLet1 = 'hidden';

if(someLet1 = 'hidden'){
    someLet1 = 'visible';
} else {
    someLet1 = 'hidden';
}

//  2. Используя if, записать условие:
//      a. если переменная равна нулю, присвоить ей 1;

let someLet2A = 0;

if(someLet2A === 0){
    someLet2A = 1;
}

//      b. если меньше нуля - строку “less then zero”;

let someLet2B = -1;

if(someLet2B < 0){
    someLet2B = 'less then zero';
}

//      c. если больше нуля - используя оператор “присвоение”, переменную умножить на 10 (использовать краткую запись).

someLet2C = 1;

if(someLet2C > 0){
    someLet2C = someLet2C * 10;
}

//  3. Дан объект let car = { name: 'Lexus', age: 10, create: 2008, needRepair: false }. Написать условие если возраст машины больше 5 лет то нужно вывести в консоль сообщение 'Need Repair' и свойство needRepair в объекте car изменить на true; иначе изменить на false.

let car = { name: 'Lexus', age: 10, create: 2008, needRepair: false };

if(car.age > 5){
    car.needRepair = true;
    console.log('Need Repair');
} else {
    car.needRepair = false;
}


//  4. Дан объект let item = { name: 'Intel core i7', price: '100$', discount: '15%' }. Написать условие если у item есть поле discount и там есть значение то в объекте item создать поле priceWithDiscount и записать туда цену с учетом скидки и вывести ее в консоль, обратите внимание что поля discount и price это строки и вам из них нужно получить числа чтобы выполнить расчет. иначе если поля discount нет то вывести просто поле price в консоль.

let item = { name: 'Intel core i7', price: '100$', discount: '15%' };

if(item.hasOwnProperty('discount') === true && item.discount !== ""){
    item.priceWithDiscount = parseInt(item.price) / 100 * (100 - parseInt(item.discount)); 
    console.log(item.priceWithDiscount + '$');
} else {
    console.log(item.price);
}

//  5. Дан следующий код:
//      let product = {
//      name: “Яблоко”,
//      price: “10$”
//      };
//      let min = 10; // минимальная цена
//      let max = 20; // максимальная цена
//Написать условие если цена товара больше или равна минимальной цене и меньше или равна максимальной цене то вывести в консоль название этого товара, иначе вывести в консоль что товаров не найдено.

let product = { name: 'Яблоко', price: '10$' };

let min = 10;
let max = 20;

if(parseInt(product.price) >= min && parseInt(product.price) <= max){
    alert(product.name);
} else {
    alert('Товаров не найдено');
}
