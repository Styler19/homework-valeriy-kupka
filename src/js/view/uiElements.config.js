const form = document.forms['newsControlForm'];
const countrySelect = document.forms['newsControlForm']['country'];
const categorySelect = document.forms['newsControlForm']['category'];
const newsContainer = document.querySelector('.news-wrap .row');
const notificationContainer = newsContainer;
const searchInput = form['search'];

export { form, countrySelect, categorySelect, newsContainer, notificationContainer, searchInput } 