import { NewsService } from './../services/news.service';
import { AuthService } from './../services/auth.service';
import { NotificationComponent } from './notification.component'
import { Routing } from './../core/routing.service';

export class NewsComponent {
    constructor() {
        this._newsService = new NewsService();
        this._authService = new AuthService();
        this._routingService = new Routing();
        this._notificationComponent = new NotificationComponent();

        this.beforeRender = this.beforeRender.bind(this);
        this.render = this.render.bind(this);
        this.style = this.style.bind(this);

        this._authUserToken = this._authService.token;
        this._news = {};
    }

    async beforeRender() {
        if (!this._authUserToken) return this._routingService.navigate('/login');
        this._notificationComponent.setContainer(document.querySelector('div.notification-container'));

        try {
            const { news } = await this._newsService.getNews(this._authUserToken);
            this._newsList = news.map(this.getTemplate);
        }
        catch (error) {
            // this._notificationComponent.setNotification({headline: 'Get news error!', text: error.message}, 'danger', 16000)
            console.log(error);
        }
    }

    render() {
        if (!this._newsList) return;

        return `
        <style>
            ${this.style()}
        </style>
        <div class="news-container">
            <div class="container">
                <div class="row">
                    ${this._newsList.join('')}
                </div>
            </div>
        </div>
        `
    }


    getTemplate( { pictures: [picture] } ) {
        return `
        <div class="col-sm-2">
            <img class="news-img" src="${picture.url}">
        </div>
        `
    }

    style() {
        return `
        .news-img {
        max-width: 100%
        }
        .news-container {
        margin-top: 15px
        }
`
}
}