//  Зная структуру html, с помощью изученных
//  методов получить (в консоль):
//  1. head

console.log('1.', document.head);

//  2. body

console.log('2.', document.body);

//  3. все дочерние элементы body и вывести их в
//  консоль.

console.log('3.', document.body.children);

//  4. первый div и все его дочерние узлы
//      а) вывести все дочерние узлы в консоль

console.log('4.', document.body.firstElementChild.children);

//      б) вывести в консоль все дочерние узлы,
//      кроме первого и последнего

const elementChild = document.body.firstElementChild.children;

for (let i = 1; i < elementChild.length - 1; i++) {
    console.log(elementChild[i]);
}

//  1. Создать функцию, которая принимает два элемента. Функция проверяет, является ли первый элемент родителем для второго:
//  isParent(parent, child);
//  isParent(document.body.children[0], document.querySelector('mark'));
//  // true так как первый див является родительским элементом для mark
//  isParent(document.querySelector('ul'), document.querySelector('mark'));
//  // false так ul НЕ является родительским элементом для mark

const isParent = (parent, child) => {

    for (let index = child; index != document.body; index = index.parentElement) {
        if (index === parent) {
            return true;
        }
    }
    
    return false;
}

//  2. Получить список всех ссылок, которые не находятся внутри списка ul

const  arrayOfLinks = Array.from(document.querySelectorAll('a'));
let filteredLinks = arrayOfLinks.filter(link => !link.closest('ul'));

console.log('2.', filteredLinks);

//  3. Найти элемент, который находится перед и после списка ul

console.log(document.querySelector('ul').previousElementSibling, document.querySelector('ul').nextElementSibling);

//  4. Посчитать количество элементов li в списке
 
console.log(document.querySelectorAll('ul li').length);

//  5. В коде с занятия написать функцию по редактированию задачи. 



//  6. Подумать и улучшить функцию generateId();


