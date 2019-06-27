import { WinnersService } from './../services'
import { LoaderComponent } from './'

export class WinnersComponent {
    constructor() {
        this._winnersService = new WinnersService();
        this._loaderComponent = new LoaderComponent();

        this._winnersList = '';
        this.isLoading = false
        this._params = {
            part: 1,
            limit: 15
        }
    
        this.beforeRender = this.beforeRender.bind(this)
        this.render = this.render.bind(this)
        this.afterRender = this.afterRender.bind(this)
        this.style = this.style.bind(this)
        this.checkInfiniteLoading = this.checkInfiniteLoading.bind(this)
    }

    async getWinners() {
        this.isLoading = true;

        try {
            const { winners } = await this._winnersService.getWinners(1, 15)
            this._winners = winners.map(this._winnerTemplate);
            this._winnersList = this._winners.join('')
        }
        catch(error) {
            console.log(error);
        }
        
        this.isLoading = false;
    }

    async beforeRender() {
        this._loaderComponent.setContainer(document.querySelector('app-container'), {style: '.lds-ellipsis {top: 30px;left: 50%;}'});
        this._loaderComponent.setLoader()

        await this.getWinners();
        this._loaderComponent.removeLoader();
    }

    render() {
        return `
            <div class="container">
                <div class="d-flex justify-content-center">
                    <style>
                        ${this.style()}
                    </style>
                    <div class="winners">
                        ${this._winnersList}
                    </div>
                </div>
                <div id="loader-container"></div>
            </div>
        `;
    }

    _winnerTemplate({
        member_id: {
            images,
            user_id: {
                full_name
            }
        }
    }) {
        if (!images.length) return '';

        const imagesList = images.map(({
            image_basic: {
                url,
                likes,
                views
            },
            votes
        }) => {
            return `
                <div class="card" style="">
                    <p class="card-author">${full_name}</p>
                    <img class="card-img-top" src="${url}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">
                            likes: ${likes.length}
                            votes: ${votes}
                            views: ${views.length}
                        </p>
                    </div>
                </div>
            `
        });

        return imagesList.join('');
    }

    style() {
        return `
            .card {
                width: 18rem;
                margin: 0 0 10px 10px;
            }
            .card-author {
                margin: 4px 0 4px 8px;
                font-weight: 600;
            }
        `
    }

    async checkInfiniteLoading() {
        this._loaderComponent.setContainer(document.querySelector('div#loader-container'), {style: '.lds-ellipsis {top: 15px; left: 50%; margin-bottom: 15px;}'});
        const container = document.querySelector('.winners')
        const shouldLoad = window.pageYOffset >= container.clientHeight / 2
    
        if (!this.isLoading && shouldLoad) {
            this._params.part = this._params.part + 1;
            this._loaderComponent.setLoader();
            await this.getWinners()
            this._loaderComponent.removeLoader();
            container.innerHTML += this._winnersList;
        }
    }
    
    afterRender() {
        window.addEventListener('scroll', this.checkInfiniteLoading)
    }
}