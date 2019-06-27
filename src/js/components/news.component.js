import { NewsService, AuthService } from './../services'
import { LoaderComponent } from './'

export class NewsComponent {
  constructor() {
    this._newsService = new NewsService()
    this._authService = new AuthService()
    this._loaderComponent = new LoaderComponent();

    this.beforeRender = this.beforeRender.bind(this)
    this.render = this.render.bind(this)
    this.style = this.style.bind(this)
  }

  async beforeRender() {
    this._loaderComponent.setContainer(document.querySelector('app-container'), {style: '.lds-ellipsis {top: 30px;left: 50%;}'});
    this._loaderComponent.setLoader();

    try {
      const { token } = this._authService
      const { news } = await this._newsService.getNews(token)
      this._newsList = news.map(this._newTemplate)
    }
    catch(error) {
      this._loaderComponent.removeLoader()
      console.log(error);
    }
  }

  render() {
    return `
      <style>
        ${this.style()}
      </style>
      <div class="news-container">
        <div class="d-flex justify-content-center">
          ${this._newsList.join('')}
        </div>
      </div>
    `
  }

  _newTemplate({
    pictures: [picture],
    owner: {
      full_name
    }
  }) {
    return `
      <div class="card">
        <img src="${picture.url}" class="card-img-top" alt="news-image">
        <div class="card-body">
          <p class="card-text">${full_name}</p>
        </div>
      </div>
    `
  }

  style() {
    return `
      .card {
        width: 18rem;
        margin: 0 10px 0 10px;
      }
      .card-img-top {
        max-width: 100%;
      }
    `
  }
}