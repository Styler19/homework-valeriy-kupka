// 1. Создать функцию multiply, которая будет принимать любое количество чисел и возвращать их произведение: multiply(1,2,3) = 6 (1*2*3) Если нет ни одного аргумента, вернуть ноль: multiply() // 0

var multiply = function(a = 0) {
   let result = 1;

   if (a) {
      for (let i = 0; i < arguments.length; i++) {
         result *= arguments[i];
      }
   } else {
      result = 0;
   };

   return result;
}

// 2. Создать функцию, которая принимает строку и возвращает строку-перевертыш: reverseString(‘test’) // “tset”.

var reverseString = function(string) {
   let result = '';

   for (let i = string.length - 1; i >= 0; i--) {
      result += string[i];
   }

   return result;
}

// 3. Создать функцию, которая в качестве аргумента принимает строку из букв и возвращает строку, где каждый символ разделен пробелом и заменен на юникод-значение символа: getCodeStringFromText(‘hello’) // “104 101 108 108 111” подсказка: для получения кода используйте специальный метод

var getCodeStringFromText = function(text) {
   let preResult = text.split('');
   let result;

   for (let i = 0; i < text.length; i++) {
      preResult[i] = text.charCodeAt(i);
   }
   result = preResult.join(' ');

   return result;
}

// 4. Создать функцию угадай число. Она принимает число от 1-10 (обязательно проверить что число не больше 10 и не меньше 0). Генерирует рандомное число от 1-10 и сравнивает с переданным числом если они совпали то возвращает “Вы выиграли” если нет то “Вы не угадали ваше число 8 а выпало число 5”. Числа в строке указаны как пример вы подставляете реальные числа.

var guessTheNumberGame = function(number) {
   let result,
       gameNumber;
   let max = 10;
   let min = 1;
   number = Number(number); 

   if (number) {
      if (number > min - 1 && number < max + 1) {
         gameNumber = Math.floor(Math.random() * (max - min) + min);
         result = number === gameNumber
         ? 'Вы выиграли'
         : `Вы не угадали ваше число ${number} а выпало число ${gameNumber}`;
      } else {
         result = `Напишите число от ${min} до ${max}`;
      }
   } else {
      result = `Напишите число от ${min} до ${max}`;
   }

   return result;
}

// 5. Создать функцию, которая принимает число n и возвращает массив, заполненный числами от 1 до n: getArray(10); // [1,2,3,4,5,6,7,8,9,10]

var getArray = function(n) {
   let result = [];

   for (let i = 0; i < n; i++) {
      result[i] = i + 1;
   }

   return result;
}

// 6. Создать функцию, которая принимает массив, а возвращает новый массив с дублированными элементами входного массива: doubleArray([1,2,3]) // [1,2,3,1,2,3]

var doubleArray = function(array) {
   let result;
   let arrayString = array.join(' ');

   result = `${arrayString} ${arrayString}`;
   result = result.split(' ');

   return result;
}

// 7. Создать функцию, которая принимает произвольное (любое) число массивов и удаляет из каждого массива первый элемент, а возвращает массив из оставшихся значений: changeCollection([1,2,3], [‘a’, ’b’, ‘c’]) → [ [2,3], [‘b’, ‘c’] ], changeCollection([1,2,3]) → [ [2,3] ] и т.д.

var changeCollection = function() {

   for (let i = 0; i < arguments.length; i++) {
      arguments[i].shift();
   }

   return arguments;
}

// 8. Создать функцию которая принимает массив пользователей, поле на которое хочу проверить и значение на которое хочу проверять. Проверять что все аргументы переданы. Возвращать новый массив с пользователями соответсвующие указанным параметрам. funcGetUsers(users, “gender”, “male”); // [ {name: “Denis”, age: “29”, gender: “male”} , {name: “Ivan”, age: “20”, gender: “male”} ]

let users = [ {name: 'Denis', age: '29', gender: 'male'},
              {name: 'Ivan', age: '20', gender: 'male'},
              {name: 'Vlad', age: '18', gender: 'male'},
              {name: 'Valera', age: '23', gender: 'male'},
              {name: 'Nastya', age: '16', gender: 'female'}
            ];

var funcGetUsers = function(users, property, value) {
  let result = [];
  value = String(value);

  if (users && property && value) {
      for (let i = 0; i < users.length; i++) {
         if (users[i][property] === value) {
            result.push(users[i]);
         }
      }
   }

  return result;
}