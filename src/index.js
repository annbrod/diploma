import "./pages/index.css";
import { ERROR_MESSAGES } from "./js/constants/constants";
import { NEWS_API_CONFIG } from "./js/constants/constants";
import { WEEK_IN_MILLISECONDS } from "./js/constants/constants";
import { INITIAL_CARDS_NUMBER } from "./js/constants/constants"
import NewsApi from "./js/modules/news-api"
import DataStorage from "./js/modules/data-storage";
import NewsCard from "./js/components/card";
import NewsCardList from "./js/components/card-box_type_news";
import SearchInput from "./js/components/search";



const searchForm = document.forms.form;
const searchInput = searchForm.elements.search;
const searchButton = document.querySelector('.button_type_search');
const results = document.querySelector(".results");
const fail = results.querySelector(".fail")
const loading = results.querySelector(".load")
const moreButton = results.querySelector(".button_type_more");
const titleSection = results.querySelector(".title-section_type_cards");
const cardBox = document.querySelector(".card-box_type_news");


const dateCurrent = new Date()
// Получаем дату, котора была неделю назад
const weekAgo = new Date(dateCurrent - WEEK_IN_MILLISECONDS)
//Приводим дату в нужный для ссылки запроса формат
const dateTo = `${dateCurrent.getFullYear()}-${dateCurrent.getMonth() + 1}-${dateCurrent.getDate()}`
const dateFrom = `${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}`


const newsApi = new NewsApi(NEWS_API_CONFIG);
const card = new NewsCard(newsApi);
const cardList = new NewsCardList(cardBox, card, titleSection, results, moreButton, INITIAL_CARDS_NUMBER);
const dataStorage = new DataStorage(localStorage, ERROR_MESSAGES);
const input = new SearchInput(ERROR_MESSAGES, card, cardList, results, loading, newsApi, fail, titleSection, moreButton, dataStorage, searchForm, searchInput, searchButton);
cardList.renderCurrent(dataStorage, searchInput);

//Функции
function onClickRenderCards() {
  cardList.render()
}

function submitHandler(event) {
  input.submit(event, dateTo, dateFrom)
}

function inputHandler(event) {
  input.validate(event)
}

function onClickInputValidate(event) {
  input.validate(event)
}

//слушатель кнопки Показать еще
moreButton.addEventListener('click', onClickRenderCards);

//Слушатель формы
searchForm.addEventListener('submit', submitHandler);

//Слушатели валидации формы
searchForm.addEventListener("input", inputHandler);

searchForm.addEventListener("click", onClickInputValidate);



