// это корневой файл, который просто управляет тем куда пойти и что сделать
// при срабатывании того или иного события

// NewsService, NewsUI, LoaderUI классы оьявлены глобально в файлай, которые подключены выше этого
// и они нам тут теперь доступны для того, что бы собственно "посылать" и "делать"

// инициализация всех необходимый конструкторов
const newsService = new NewsService()
const newsUI = new NewsUI()
const loaderUI = new LoaderUI('.news-wrap .row')
const notificationUI = new NotificationUI()

// UI Elements
const form = document.forms['newsControlForm'];
const countrySelect = form['country'];
const categorySelect = form['category'];
const searchInput = form['search'];

// Event listeners -- собираем все addEventListener в обну стопку, чтобы потом не искать их по коду
countrySelect.addEventListener('change', onSelectChange)
categorySelect.addEventListener('change', onSelectChange)
searchInput.addEventListener('change', onSearchChange)

// Handlers for events -- пишем функции-обработчики, которые нужны для addEventListener
function onSelectChange() {
    const country = countrySelect.value;
    const category = categorySelect.value;

    if (!country || !category) return notificationUI.setNotification('Choose the category and country')

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

    if (search.length <= 3) return notificationUI.setNotification('Write in the search for more than 3 letters')

    loaderUI.setLoader()
    newsService.getNewsBySearch(({
        articles
    }) => {
        loaderUI.removeLoader()
        newsUI.addNewsToView(articles)
    }, search)
}