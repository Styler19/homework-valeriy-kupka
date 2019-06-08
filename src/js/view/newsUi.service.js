import { newsContainer } from './uiElements.config';
import { NotificationUI } from './notificationUI';

const notificationUI = new NotificationUI();

export class NewsUI {
    constructor() {
        this.container = newsContainer;
    }

    addNewsToView(list) {
      if (!list.length) return notificationUI.showNotification('Nothing found')  // Проверка на отсутствие результата

      const template = list.reduce( (init, item) => {
        if (!item.urlToImage || !item.description) return init  // Проверка на null
  
        return init += NewsUI.getTemplate(item)
      }, '')

      this.container.insertAdjacentHTML("afterbegin", template);
    }

    static getTemplate(article) {
        return `
        <div class="row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image">
              <img src="${article.urlToImage}">
              <span class="card-title">${article.title}</span>
            </div>
            <div class="card-content">
              <p>${article.description}</p>
            </div>
          </div>
        </div>
      </div>
        `;
    }
}