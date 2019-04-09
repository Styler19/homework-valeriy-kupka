//  1. На основе строки “i am in the easycode” сделать новую строку где первые буквы каждого слова будут в верхнем регистре. Использовать for или while.

let string = 'i am in the easycode';
let stringFinal = '';

for (let i = 0; i < string.length; i++) {
   string[i - 1] === ' '
   ? stringFinal += string[i].toUpperCase()
   : i === 0
      ?  stringFinal += string[i].toUpperCase()
      :  stringFinal += string[i]
}

console.log(stringFinal);

//  2. Дана строка “tseb eht ma i”. Используя циклы, сделать строку-перевертыш (то есть последняя буква становится первой, предпоследняя - второй итд).

let string2 = 'tseb eht ma i';
let stringFinal2 = '';

for (let i = string2.length - 1; i >= 0; i--) {
   stringFinal2 += string2[i];
}

console.log(stringFinal2);

//  3. Факториал числа - произведение всех натуральных чисел от 1 до n включительно: 3! = 3*2*1, 5! = 5*4*3*2*1. С помощью циклов вычислить факториал числа 10. Использовать for.
//10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 = 

let number3 = 10; // Factorial
let numberFinal3 = 1;
        
for (let i = 1; i <= number3; i++) {
   numberFinal3 *= i;
}

console.log(numberFinal3);

//  4. На основе строки “JavaScript is a pretty good language” сделать новую строку, где каждое слово начинается с большой буквы, а пробелы удалены. Использовать for.

let string4 = 'JavaScript is a pretty good language';
let stringFinal4 = string4.split(' ');

for (let i = 0; i < stringFinal4.length; i++) {
   stringFinal4[i] = stringFinal4[i][0].toUpperCase() + stringFinal4[i].slice(1);
}

stringFinal4 = stringFinal4.join('');
console.log(stringFinal4);

//  5. Найти все нечетные числа в массиве от 1 до 15 включительно и вывести их в консоль. Массив [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] Использовать for of.

let number5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let numberFinal5 = [];

for (let list of number5) {
   let list2 = list / 2;

   if (parseInt(list2) === list2) {
      numberFinal5.push(list);
   }
}

console.log(numberFinal5);

//  6. Дан объект:
//  let list = {
//       name: ‘denis’,
//       work: ‘easycode’,
//       age: 29
//  }
//  Перебрать объект и если значение в свойстве это строка то переписать ее всю в верхнем регистре. Использовать for in.

let list = {
   name: 'denis',
   work: 'easycode',
   age: 29
}

for (userlist in list) {
   if (typeof(list[userlist]) === 'string') {
      list[userlist] = list[userlist].toUpperCase();
   }
}

console.log(list);