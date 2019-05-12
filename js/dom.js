//  1.По нажатию на кнопку "btn-msg" должен появиться алерт с тем текстом который находится в атрибуте data-text у кнопки.

let btnMsg = document.getElementById('btn-msg');

btnMsg.addEventListener('click', (event) => { alert(event.target.dataset.text) });

//  2. При наведении указателя мыши на "btn-msg", кнопка становится красной; когда указатель мыши покидает кнопку, она становится прежнего цвета. Цвет менять можно через добавление класса.

btnMsg.addEventListener('mouseover', (event) => { event.target.classList.add('red') });
btnMsg.addEventListener('mouseout', (event) => { event.target.classList.remove('red') });

//  3. При нажатии на любой узел документа показать в элементе с id=tag имя тега нажатого элемента.

let strongTag = document.getElementById('tag');

document.addEventListener('click', (event) => { strongTag.innerHTML = `Tag: ${event.target.tagName}` });

//  4. При нажатии на кнопку btn-generate добавлять в список ul элемент списка Li с текстом Item + порядковый номер Li по списку, т.е Item 3, Item 4 и т.д 

let btnGenerate = document.getElementById('btn-generate');

const addElementLi = () => {
    let elementUl = document.querySelector('ul'),
        elementLi = document.createElement('li'),
        numberOfLi = elementUl.children.length;

    elementLi.innerHTML = `item ${numberOfLi + 1}`;
    elementUl.insertAdjacentElement('beforeend', elementLi);
};

btnGenerate.addEventListener('click', addElementLi);

//  5.  реализовать alert.

// app.js

//  6. Реализовать примитивный дропдаун. Изначально все dropdown-menu скрыты через класс .d-none. При клике на dropdown-item должен
//  отображаться блок dropdown-menu который вложен именно в тот  dropdown-item на котором произошел клик. При повторном клике
//  на этот же dropdown-item блок dropdown-menu должен закрыться. При клике на любой другой dropdown-item уже открытый dropdown-menu
//  должен закрываться а на тот который кликнули открываться.

let dropDownItem = document.querySelectorAll('.dropdown-item'); 
let dropDownMenu = document.querySelectorAll('.dropdown-menu');

dropDownItem.forEach( (element) => {        // Пробежка по всем dropDownItem
    element.addEventListener('click',  () => {      // Добавление события к dropDownItem
        dropDownMenu.forEach( (menuElement) => {            // на который dropDownItem не кликнули, добавить класс 'd-none' к dropDownMenu 
            if (menuElement !== element.querySelector('.dropdown-menu')) {
                menuElement.classList.add('d-none'); 
            }; 
        });

        element.querySelector('.dropdown-menu').classList.toggle('d-none');     // При клике на dropDownItem отображается dropDownMenu, при повторном клике скрывается  
    }) 
});