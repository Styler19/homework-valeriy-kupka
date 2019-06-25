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
            this._news = await this._newsService.getNews(this._authUserToken);
            this._images = this._news.news.map((element) => {
                return element.pictures[0].url
            });
        }
        catch(error) {
            this._notificationComponent.setNotification({headline: 'Get news error!', text: error.message}, 'danger', 16000)
        }
    }

    render() {
        if (!this._images) return;
        
        return `
        <style>
            ${this.style()}
        </style>
        <div class="news-container">
            <div class="container">
                <div class="row">
                    <div class="col-sm-2">
                        <img class="news-img" src="${this._images[0]}">
                    </div>
                    <div class="col-sm-2">
                        <img class="news-img" src="${this._images[1]}">
                    </div>
                    <div class="col-sm-2">
                        <img class="news-img" src="${this._images[2]}">
                    </div>
                    <div class="col-sm-2">
                        <img class="news-img" src="${this._images[3]}">
                    </div>
                    <div class="col-sm-2">
                        <img class="news-img" src="${this._images[4]}">
                    </div>
                </div>
            </div>
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