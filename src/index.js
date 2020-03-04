import "./pages/index.css";
import { ERROR_MESSAGES } from "./js/constants/constants";
import { NEWS_API_CONFIG } from "./js/constants/constants";
import { WEEK_IN_MILLISECONDS } from "./js/constants/constants";
import NewsCard from "./js/components/newsCard";
import NewsCardList from "./js/components/newsCardList";
import SearchInput from "./js/components/searchInput";

console.log(NEWS_API_CONFIG);



const searchForm = document.forms.form;

const searchInput = searchForm.elements.search;
const searchButton = searchForm.elements.submit;
const results = document.querySelector(".results");
const fail = results.querySelector(".fail")
const resultsNews = results.querySelector(".card-box_type_news")
const loading = results.querySelector(".load")
const moreButton = results.querySelector(".button_type_more");

const dateCurrent = new Date()



// Получаем дату, котора была неделю назад
const weekAgo = new Date(dateCurrent - WEEK_IN_MILLISECONDS)

//Приводим дату в нужный формат
const dateTo = `${dateCurrent.getFullYear()}-${dateCurrent.getMonth() + 1}-${dateCurrent.getDate()}`
const dateFrom = `${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}`




class NewsApi {
  constructor({ url, key, pageSize }) {
    this.url = url;
    this.apiKey = key;
    this.pageSize = pageSize;
  }

  getNews(word, dateFrom, dateTo) {

    return fetch(`${this.url}q=${word}&from=${dateFrom}&to=${dateTo}&sortBy=publishedAt&pageSize=${this.pageSize}&apiKey=${this.apiKey}`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
  }
}




function submit(event) {
  event.preventDefault();
  //Очищает список от предыдущих результатов, если есть
  const moreButton = document.querySelector('.button_type_more');
  console.log(moreButton)
  moreButton.classList.add("button_is-hidden")
  cardList.clear()
  fail.classList.remove("fail_is-opened");
  //Показывает блок результатов
  results.classList.add("results_is-opened");
  //Показывает блок прелоудера
  loading.classList.add("load_is-opened");
  //Добавляет карточки
  newsApi.getNews(searchInput.value, dateFrom, dateTo)
    .then(res => {
      //Если карточки есть
      if (res.articles.length) {
        console.log(res);
        newsApi.getNews(searchInput.value, dateFrom, dateTo)

          .then(res => {
            console.log(res.articles);
            fail.classList.remove("fail_is-opened");
            cardList.renderInitial(res.articles, searchInput.value);
            loading.classList.remove("load_is-opened");
            results.classList.add("results_is-opened");
          })
          .catch(err => {
            cardList.renderInitial(res.articles, searchInput.value);
            fail.classList.remove("fail_is-opened");
            loading.classList.remove("load_is-opened");
            results.classList.add("results_is-opened");
            results.textContent = ERROR_MESSAGES.serverError
            console.log(err)
          })

        //Если карточек нет
      } else {
        cardList.clear()
        loading.classList.remove("load_is-opened");
        fail.classList.add("fail_is-opened");

      }
    })
    //Ошибка запроса
    .catch(err => {
      cardList.clear()
      loading.classList.remove("load_is-opened");
      results.classList.add("results_is-opened");
      results.textContent = ERROR_MESSAGES.serverError
      console.log(err);
    })
}






const input = new SearchInput(cardList, results, loading, fail, moreButton);
const newsApi = new NewsApi(NEWS_API_CONFIG);
const card = new NewsCard(newsApi);
const cardList = new NewsCardList(document.querySelector(".card-box_type_news"), card);


//слушатель кнопки Показать еще

moreButton.addEventListener('click', function () {
  cardList.render()
});


//Слушатель формы

searchForm.addEventListener('submit', event => {
  submit(event)
});

// //Слушатель валидации формы
searchForm.addEventListener("input", event => {
  input.validate(event)
});
searchForm.addEventListener("click", event => {
  input.validate(event)
});
