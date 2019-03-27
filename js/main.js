//  Строки. Задачи.
let str = 'some test string';

//  1. Получить первую и последнюю буквы строки

let strOne = str[0] + str[str.length - 1];
console.log(strOne);

//  2. Сделать первую и последнюю буквы в верхнем регистре

let strTwo = str[0] + str[str.length - 1];
console.log(strTwo.toLocaleUpperCase());

//  3. Найти положение слова ‘string’ в строке

let strThree = str.indexOf('string');
console.log(strThree);

//  4. Найти положение второго пробела (“вручную” ничего не считать)

let strFour1 = str.indexOf(' ') + 1;
let strFour2 = str.slice(strFour1);
let strFour3 = strFour2.indexOf(' ') + strFour1 - 1;
console.log(strFour3);

//  5. Получить строку с 5-го символа длиной 4 буквы

let strFive = 5;
let strFive2 = str.slice(strFive, strFive + 4);
console.log(strFive2);

//  6. Получить строку с 5-го по 9-й символы

let strSix = str.slice(5, 9);
console.log(strSix);

//  7. Получить новую строку из исходной путем удаления последних 6-и символов (то есть исходная строка без последних 6и символов)

let strSeven = str.slice(0, str.length - 6);
console.log(strSeven);

//  8. Из двух переменных a=20 и b=16 получить переменную string, в которой будет содержаться текст “2016”

let a = 20;
let b = 16;
let strEight = Number(String(a) + b);
console.log(strEight);

// Числа. Задачи.

//  1. Получить число pi из Math и округлить его до 2-х знаков после точки

let pi = Math.PI;
let numOne = Number(pi.toFixed(2));
console.log(numOne);

//  2. Используя Math, найти максимальное и минимальное числа из представленного ряда 15, 11, 16, 12, 51, 12, 13, 51

let numTwo = Math.min(15, 11, 16, 12, 51, 12, 13, 51);
let numTwo2 = Math.max(15, 11, 16, 12, 51, 12, 13, 51);
console.log(`${numTwo} and ${numTwo2}`);


//  3. Работа с Math.random:
//      a. Получить случайное число и округлить его до двух цифр после запятой

let numThree_a = Math.random();
let numThree_a2 = Number(numThree_a.toFixed(2));
console.log(numThree_a2);

//      b. Получить случайное целое число от 0 до X. X - любое произвольное число.

min = 0;
max = 100;
let numThree_b = Math.floor(Math.random() * (max - min)) + min;
console.log(numThree_b);

//  4. Проверить результат вычисления 0.6 + 0.7 - как привести к нормальному виду (1.3)?

let numFour = Number((0.6 + 0.7).toFixed(1));
console.log(numFour);

//  5. Получить число из строки ‘100$’

let numFive = parseInt('100$');
console.log(numFive);