//  1. Найти параграф и получить его текстовое содержимое (только текст!)

let pElementText = document.querySelector('p').textContent;

console.log('1.', pElementText);

//  2. Создать функцию, которая принимает в качестве аргумента узел DOM и возвращает информацию (в виде объекта) о типе узла, об имени узла и о количестве дочерних узлов (если детей нет - 0).

const nodeInfo = (node) => {
    let {type, name, childrens} = {};
    
    type = node.nodeType;
    name = node.nodeName;
    childrens = node.childNodes.length;

    return {type, name, childrens};
};

//  3. Получить массив, который состоит из текстового содержимого ссылок внутри списка: getTextFromUl(ul) ---> ["Link1", "Link2", "Link3"]

const getTextFromUl = (element) => {
    let linkArray = [];

    element.querySelectorAll('a').forEach( link => {
        linkArray.push(link.innerHTML);
    });

    return linkArray;
};

//  4. В параграфе заменить все дочерние текстовые узлы на “-text-” (вложенные теги должны остаться). Конечный результат:
//  -text-<a href="#">reprehendunt</a>-text-<mark>nemore</mark>-text-

const paragraphNodeChild = document.querySelector('p').childNodes;

for (let index = 0; index < paragraphNodeChild.length; index++) {
    if (paragraphNodeChild[index].nodeType === 3) {
        document.querySelector('p').childNodes[index].data = '-text-';
    }
}



//  1. Найти в коде список ul и добавить класс “list”

document.querySelector('ul').classList.add('list');

//  2. Найти в коде ссылку, находящуюся после списка ul, и добавить id=link

document.querySelectorAll('a').forEach( element => {
    if (element.previousElementSibling != null && element.previousElementSibling.tagName === 'UL') {
        element.id = 'link';
    }
}); //              В template.html нету ссылки которая сразу находиться после списка

//  3. На li через один (начиная с самого первого) установить класс “item”

document.querySelectorAll('li').forEach( (element, index) => {
    if (index % 2 === 0) {
        element.classList.add('item');
    }
});

//  4. На все ссылки в примере установить класс “custom-link”

document.querySelectorAll('a').forEach( element => {
    element.classList.add('custom-link');
})

//  1. Не используя innerHTML, добавить в список // 4 несколько li с классом ‘new-item’ и текстом ‘item’ + номер li:
//  <ul>
//  <li><a href="#">Link1</a></li>
//  ...
//  <li class=”new-item”>item 5</li>
//  <li class=”new-item”>item 6</li>
//  </ul>
//  Вручную номер li не ставить оно должно подставляться в зависимости от кол-ва лишек в списке.

let liFragment = document.createDocumentFragment();

for (let index = 5; index <= 8; index++) {
    const element = document.createElement('li');
    element.classList.add('new-item');
    element.textContent = `item ${index}`;

    liFragment.appendChild(element);
}

document.querySelector('ul').appendChild(liFragment);

//  2. В каждую ссылку, которая находятся внутри списка ul  добавить по тегу strong (в каждую ссылку один - strong). 

const listOfLinks = Array.from(document.querySelectorAll('a')),
      filteredListOfLinks = listOfLinks.filter(link => link.closest('ul'));

filteredListOfLinks.forEach(link => link.appendChild(document.createElement('strong')));

//  3. В начало документа (в начало body) добавить картинку img с атрибутами src и alt (текст придумайте сами). В src добавьте реальный url к картинке. Для создания элемента используйте метод createElement. 

const imageElement = document.createElement('img');

imageElement.setAttribute('src', 'https://zelenskiy.site/wp-content/uploads/2019/03/2019-03-01_071134-300x193.png');
imageElement.setAttribute('alt', 'Ze! team');

document.body.insertAdjacentElement('afterbegin', imageElement);

//  4. Найти на странице элемент mark, добавить в конец содержимого текст “green” и на элемент установить класс green

const markElement = document.querySelector('mark');

markElement.insertAdjacentText('beforeend', 'green');
markElement.classList.add('green');

//  5. Отсортировать li внутри списка в обратном порядке (по тексту внутри)

let fragment = document.createDocumentFragment();

for (let index = 0; 0 != document.querySelector('ul').children.length; index++) {
    fragment.appendChild(document.querySelector('ul').children[0])
};

for (let index = fragment.children.length; index > 0; index--) {
    let childrenFragment = fragment.children[index - 1];

    document.querySelector('ul').insertAdjacentElement('beforeend', childrenFragment) 
};