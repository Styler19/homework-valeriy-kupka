// класс для реализации функционала по добавланию нотификаций на страницу
// класс в своем название имеет "UI" подстроку
// которая дает нам понять, что тут будет отрисовка в ДОМЕ нашей нотификашки
// имея примеры LoaderUI и NewsUI
// нужно реализовать set.... и remove.... для управления этим эл-том

import { notificationContainer } from './uiElements.config';

export class NotificationUI {
    constructor() {
        this.container = notificationContainer
    }

    showNotification(text) {
        this.container.innerHTML = NotificationUI.getTemplate(text)
    }

    removeNotification() {
        this.container.innerHTML = ''
    }

    static getTemplate(text) {
        return `
        <div class="row">
            <div class="col s12 m5">
                <div class="card-panel teal">
                    <span class="white-text">${text}</span>
                </div>
            </div>
        </div>
        `
    }
}