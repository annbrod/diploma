import "./pages/index.css";

const NEWS_API_CONFIG = {
  url: 'http://newsapi.org/v2/everything?',
  key: "63b5f098fd034406940a01211c81af94",
  pageSize: 100,
}

const searchForm = document.forms.form;

const searchInput = searchForm.elements.search;
const searchButton = searchForm.elements.submit;
const results = document.querySelector(".results");
const fail = results.querySelector(".fail")
const resultsNews = results.querySelector(".card-box_type_news")
const loading = results.querySelector(".load")
const moreButton = results.querySelector(".button_type_more");

const dateNow = new Date()

//столько миллисекунд в неделе
const week = 604800000

// Получаем дату, котора была неделю назад
const weekAgo = new Date(dateNow - week)

//Приводим дату в нужный формат
const dateTo = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
const dateFrom = `${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}`


searchInput.addEventListener('input', function () {
  if (!event.target.checkValidity()) {
    searchButton.setAttribute('disabled', true);
  }
});

searchForm.addEventListener('submit', function () {
  event.preventDefault();
  //Очищает список от предыдущих результатов, если есть
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
            console.log(err)
          })

        //Если ничего нет
      } else {
        cardList.clear()
        loading.classList.remove("load_is-opened");
        fail.classList.add("fail_is-opened");

      }
    })
    //Ошибка
    .catch(err => {
      cardList.clear()
      loading.classList.remove("load_is-opened");
      fail.classList.add("fail_is-opened");
      console.log(err);
    })
});



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


class NewsCard {
  constructor() {

  }
  //Создает шаблон карточки
  create(urlToImage, publishedAt, title, description, source) {
    this.date = publishedAt
    this.date = new Date(this.date).toLocaleString("ru", { day: "numeric", year: 'numeric', month: 'long' });
    return `<article class="card">
    <div class="card__image" style="background-image: url(${urlToImage});"></div>
    <div class="card__description">
      <p class="card__date">${this.date}<p>
          <h3 class="card__title">${title}</h3>
          <p class="card__text">
            ${description}
          </p>
          <p class="card__source">${source.name}</p>
    </div>
  </article>`
  }
}


class NewsCardList {
  constructor(container, cardElement) { //передаём  шаблон карточки
    this.container = container;
    this.cardElement = cardElement;
    this.count = 0;
    this.cardsNumber = 0;
  }

  //создаёт карточку
  addCard(urlToImage, publishedAt, title, description, source, word) {
    const card = this.cardElement.create(urlToImage, publishedAt, title, description, source); //из шаблона делаем DOM-элемент
    this.container.insertAdjacentHTML("beforeend", card); //добавляем карточку в cardList
    this.word = word;
  }

  //Добавляет первые три (или меньше) карточек
  renderInitial(cards, word) {
    this.word = word;
    while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
    this.num = 0;
    this.cardsSum = cards.length;
    this.cards = cards;
    this.render();
  }

  //Добавляет карточки по нажатию "Показать ещё"
  render() {
    document.querySelector(".button_type_more").classList.remove("button_is-hidden")
    //загружаем по три карточки
    for (let i = this.num; i < this.num + 3; i++) {
      if (i >= this.cardsSum) {
        document.querySelector(".button_type_more").classList.add("button_is-hidden")
        if (i = this.cardsSum) {
          return;
        }
      }
      const card = this.cards[i];
      this.addCard(card.urlToImage, card.publishedAt, card.title, card.description, card.source, this.word);
    }
    this.num = this.num + 3;
  }

  //Очищает список карточек
  clear() {
    while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
    this.num = 0;
    this.articlesNumber = 0;
  }

}






const newsApi = new NewsApi(NEWS_API_CONFIG);
const card = new NewsCard(newsApi);
const cardList = new NewsCardList(document.querySelector(".card-box_type_news"), card);


//слушатель кнопки Показать еще

moreButton.addEventListener('click', function () {
  newsApi.getNews(searchInput.value, dateFrom, dateTo)
    .then(res => {
      cardList.render(res.articles, searchInput.value)
    })
    .catch(
      res => {
        cardList.render(res.articles, searchInput.value)
      }
    )
});

