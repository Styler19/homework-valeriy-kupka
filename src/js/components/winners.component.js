import { WinnersService } from './../services'
import { LoaderComponent } from './loader.component'

export class WinnersComponent {
    constructor() {
        this._winnersService = new WinnersService();
        this._loaderComponent = new LoaderComponent();

        this.beforeRender = this.beforeRender.bind(this);
        this.render = this.render.bind(this);
    }

    async beforeRender() {
        this._loaderComponent.setContainer(document.querySelector('app-container'), '.lds-ellipsis {top: 20px; left: 60px;}');
        this._loaderComponent.setLoader()
        try {
            const { winners } = await this._winnersService.getWinners(1, 15)
            this._loaderComponent.removeLoader()
            this._winnersList = winners.map(this._winnerTemplate);
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
        <div>
            ${this._winnersList.join('')}
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
}