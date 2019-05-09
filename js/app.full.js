// Task manager
// 1. создать задачу
//      а. обработка формы
//          - проверить данные перед добавлением (валидация)
//      б. добавить задачу в массив
//      в. добавить данные в таблицу
//      г. офистить форму
// 2. удалить задачу
//      а. подтверждение
//      б. удаление данных из таблицы
//      в. удаление данных из массива 
// 3. редактировать задачу 
//      а. взять данные из массива
//      б. поместить в форму 
//      в. обработать форму на редактирование
//          - валидация
//      г. обновить данные в массиве
//      д. обновить данные в таблице
//      е. офистить форму

// task = {
//     id: {
//         type: 'String',
//         required: true
//     },
//     title: {
//         type: 'String',
//         required: true
//     },
//     text: {
//         type: 'String',
//         required: true
//     }
// }

// ;(function () {

let storage = {
    todos: []
};

// UI Elements
const formCol = document.querySelector('.form-col');
const table = document.querySelector('.table tbody');
const form = document.forms['addTodoForm'];
const title = form.elements['title'];
const text = form.elements['text'];
const submitBtn = form.elements.submitBtn;


// click, keyUp, keyDown, submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!title.value || !text.value) return alertMessage('alert-danger', 'Введите title и text');

    // если есть аттр data-task-id
    // вызываем функцию editTaskStorage
    // очистка формы и удалить аттр data-task-id
    const dataTaskId = form.dataset.taskId

    if (dataTaskId) {
        editTaskStorage(dataTaskId, title.value, text.value)
        submitBtn.innerText = 'Add task'
        form.removeAttribute('data-task-id')
        alertMessage('alert-info', 'Задача edited успешно');
    } else {
        addNewTodoToStorage(title.value, text.value);
        alertMessage('alert-info', 'Задача добавлена успешно');
    }
    form.reset();
});

table.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-todo')) {
        const id = e.target.closest('[data-id]').dataset.id;
        deleteTodoFromStorage(id);
        alertMessage('alert-info', 'Задача удалена успешно');
        return;
    }

    if (e.target.classList.contains('edit-todo')) {
        const id = e.target.closest('[data-id]').dataset.id;
        setFormtoEdit(id);
    }
});

function alertMessage(className, message) {
    removeAlert();

    const template = alertTemplate(className, message);
    formCol.insertAdjacentHTML('afterbegin', template);

    setTimeout(removeAlert, 2000);
}

function removeAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) formCol.removeChild(currentAlert);
}

function alertTemplate(className, message) {
    return `
        <div class="alert ${className}">${message}</div>
        `;
}

/**
 * 
 */
function generateId() {
    const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let id = '';

    for (let char of words) {
        let index = Math.floor(Math.random() * words.length);
        id += words[index];
    }

    return id;
}

function addNewTodoToStorage(title, text) {
    if (!title) return console.log('Введите заголовок задачи');
    if (!text) return console.log('Введите текст задачи');

    const newTask = {
        title,
        text,
        id: generateId()
    };

    storage.todos.push(newTask);

    // Добавим в разметку
    addNewTodoToView(newTask);

    return storage.todos;
}

addNewTodoToStorage('My title 1', 'My text 1');

function deleteTodoFromStorage(id) {
    const checkIdRes = checkId(id);
    if (checkIdRes.error) return console.log(checkIdRes.msg);

    let removedTask;

    for (let i = 0; i < storage.todos.length; i++) {
        if (storage.todos[i].id === id) {
            removedTask = storage.todos.splice(i, 1);
            break;
        }
    }

    deleteTodoFromView(id);

    return removedTask;
}

function checkId(id) {
    if (!id) return {
        error: true,
        msg: 'Передайте id задачи'
    };

    const checkId = storage.todos.some(function (task, i) {
        return task.id === id
    });
    if (!checkId) return {
        error: true,
        msg: 'id несуществуе'
    };

    return {
        error: false,
        msg: ''
    };
}

function editTaskStorage(id, title, text) {
    const taskIndex = findTaskIndexByTaskId(id)

    if (taskIndex === -1) return;

    const todo = storage.todos[taskIndex]
    todo.title = title
    todo.text = text
    editTaskView(todo)
}

function editTaskView({
    id,
    title,
    text
}) {
    const target = document.querySelector(`[data-id="${id}"]`);
    const [titleEl, textEl] = target.children
    titleEl.innerText = title
    textEl.innerText = text
}

function setFormtoEdit(id) {
    // найти нужную задачу
    // в форме задать value для инпутов
    // добавить форме атр data-task-id=id;
    const task = storage.todos.find(todo => todo.id === id)
    if (task) {
        title.value = task.title
        text.value = task.text
        submitBtn.innerText = 'Edit task'
        form.setAttribute('data-task-id', id)
    }
}

function deleteTodoFromView(id) {
    const target = document.querySelector(`[data-id="${id}"]`);
    target.parentElement.removeChild(target);
}

function addNewTodoToView(task) {
    const template = todoTemplate(task);
    table.insertAdjacentHTML('afterbegin', template);
}

function todoTemplate(task) {
    return `
            <tr data-id="${task.id}"> 
                <td>${task.title}</td>
                <td>${task.text}</td>
                <td>
                    <i class="fas fa-trash remove-todo"></i>
                    <i class="fas fa-edit edit-todo"></i>
                </td>
            </tr>
        `;
}

function findTaskIndexByTaskId(id) {
    if (!id) {
        console.log('Передайте id задачи');
        return -1
    }

    const taskIndex = storage.todos.findIndex((task) => task.id === id)

    if (taskIndex === -1) console.log('id несуществует');

    return taskIndex;
}

// })();