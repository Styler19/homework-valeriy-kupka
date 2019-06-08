// Styles
import './../css/style.css';

// Libs
import 'jquery';
import 'lodash';

import { NewsService } from './services/news.service';
import { NewsUI } from './view/newsUi.service';
import { countrySelect, categorySelect, searchInput } from './view/uiElements.config';
import { LoaderUI } from './view/loaderUI';
import { NotificationUI } from './view/notificationUI';

const newsService = new NewsService();
const newsUI = new NewsUI();
const loaderUI = new LoaderUI();
const notificationUI = new NotificationUI();
const onSearchChangeWithDebounce = _.debounce(onSearchChange, 500)

// Handlers for events -- пишем функции-обработчики, которые нужны для addEventListener
countrySelect.addEventListener('change', onSelectChange)
categorySelect.addEventListener('change', onSelectChange)
searchInput.addEventListener('input', onSearchChangeWithDebounce)

// Handlers for events -- пишем функции-обработчики, которые нужны для addEventListener
function onSelectChange() {
    const country = countrySelect.value;
    const category = categorySelect.value;

    if (!country || !category) return notificationUI.showNotification('Choose the category and country')

    loaderUI.setLoader()
    newsService.getNewsByCountryAndCatigory(({
        articles
    }) => {
        loaderUI.removeLoader()
        newsUI.addNewsToView(articles)
    }, country, category)
}

function onSearchChange() {
    const search = searchInput.value;

    if (!searchInput.value.length) { onSelectChange() }
    if (search.length <= 3) return notificationUI.showNotification('Write in the search for more than 3 letters')

    loaderUI.setLoader()
    newsService.getNewsBySearchQuery(({
        articles
    }) => {
        loaderUI.removeLoader()
        newsUI.addNewsToView(articles)
    }, search)
}