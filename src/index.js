import "./pages/index.css";
import { ERROR_MESSAGES } from "./js/constants/constants";
import { NEWS_API_CONFIG } from "./js/constants/constants";
import { WEEK_IN_MILLISECONDS } from "./js/constants/constants";
import NewsApi from "./js/modules/NewsApi"
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";
import SearchInput from "./js/components/SearchInput";

const searchForm = document.forms.form;
const results = document.querySelector(".results");
const fail = results.querySelector(".fail")
const resultsNews = results.querySelector(".card-box_type_news")
const loading = results.querySelector(".load")
const moreButton = results.querySelector(".button_type_more");
const titleSection = results.querySelector(".title-section_type_cards");

const dateCurrent = new Date()
// Получаем дату, котора была неделю назад
const weekAgo = new Date(dateCurrent - WEEK_IN_MILLISECONDS)
//Приводим дату в нужный формат
const dateTo = `${dateCurrent.getFullYear()}-${dateCurrent.getMonth() + 1}-${dateCurrent.getDate()}`
const dateFrom = `${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}`


const newsApi = new NewsApi(NEWS_API_CONFIG);
const card = new NewsCard(newsApi);
const cardList = new NewsCardList(document.querySelector(".card-box_type_news"), card);
const input = new SearchInput(ERROR_MESSAGES, card, cardList, results, loading, newsApi, fail, titleSection);





//Слушатели

//слушатель кнопки Показать еще
moreButton.addEventListener('click', function () {
  cardList.render()
});

//Слушатель формы
searchForm.addEventListener('submit', event => {
  input.submit(event, dateTo, dateFrom)
});

// //Слушатель валидации формы
searchForm.addEventListener("input", event => {
  input.validate(event)
});
searchForm.addEventListener("click", event => {
  input.validate(event)
});
