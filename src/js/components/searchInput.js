

export default class SearchInput {
  constructor(ERROR_MESSAGES, card, cardList, results, loading, newsApi, fail, titleSection, moreButton, dataStorage) {
    this.errors = ERROR_MESSAGES;
    this.card = card;
    this.cardList = cardList;
    this.results = results;
    this.loading = loading;
    this.newsApi = newsApi;
    this.fail = fail;
    this.titleSection = titleSection;
    this.moreButton = moreButton;
    this.dataStorage = dataStorage;
  }

  submit(event, dateTo, dateFrom) {
    event.preventDefault();

    const searchForm = document.forms.form;
    const searchInput = searchForm.elements.search;
    //Очищает список от предыдущих результатов, если есть
    this.cardList.clear()
    this.moreButton.classList.add("button_is-hidden")
    this.fail.classList.remove("fail_is-opened");
    this.titleSection.classList.remove("title-section_is-opened");
    //Показывает блок результатов
    this.results.classList.add("results_is-opened");
    //Показывает блок прелоудера
    this.loading.classList.add("load_is-opened");
    //Добавляет карточки
    this.newsApi.getNews(searchInput.value, dateFrom, dateTo)
      .then(res => {
        //Если карточки есть
        console.log(res)
        if (res.articles.length) {
          //Очищаем хранилище от предыдущих карточек и keyword
          this.dataStorage.clear();
          console.log(res);
          //Сохраняем в локальное хранилище
          console.log(searchInput.value.toString());
          this.dataStorage.set('word', searchInput.value);
          let cardsObj = JSON.stringify(res.articles);
          this.dataStorage.set('cards', cardsObj);
          this.newsApi.getNews(searchInput.value, dateFrom, dateTo)

            .then(res => {
              console.log(res.articles);
              this.fail.classList.remove("fail_is-opened");
              this.cardList.renderInitial(res.articles, searchInput.value);
              this.loading.classList.remove("load_is-opened");
              this.titleSection.classList.add("title-section_is-opened");
              this.results.classList.add("results_is-opened");
            })
            .catch(err => {
              this.cardList.renderInitial(res.articles, searchInput.value);
              this.fail.classList.remove("fail_is-opened");
              this.loading.classList.remove("load_is-opened");
              this.titleSection.classList.remove("title-section_is-opened");
              this.results.classList.add("results_is-opened");
              this.results.textContent = this.errors.serverError
              console.log(err)
            })

          //Если карточек нет
        } else {
          this.cardList.clear()
          this.loading.classList.remove("load_is-opened");
          this.titleSection.classList.remove("title-section_is-opened");
          this.fail.classList.add("fail_is-opened");

        }
      })
      //Ошибка запроса
      .catch(err => {
        this.cardList.clear()
        this.loading.classList.remove("load_is-opened");
        this.titleSection.classList.remove("title-section_is-opened");
        this.results.classList.add("results_is-opened");
        this.results.textContent = this.errors.serverError
        console.log(err);
      })
  }


  validate(event) {

    const searchInput = event.currentTarget.element;
    if (!event.target.validity.valid) {
      //Если поле не валидно, отключить кнопку
      this.disableButton(event);
      this.checkEmptyField(event, searchInput)

    } else {
      this.checkIfCorrect(event, searchInput);
      this.enableButton(event);
    }
  }

  checkEmptyField(event) {
    if (event.target.value.length === 0) {
      document.querySelector(`#error-search`).textContent = this.errors.emptyField;
    }
  }

  checkIfCorrect(event) {
    if (event.target.validity.valid) {
      document.querySelector(`#error-search`).textContent = "";
    }
  }


  //Отключение кнопки формы
  disableButton() {
    const searchButton = document.querySelector('.button_type_search');
    searchButton.setAttribute("disabled", true);
  }

  //Велючение кнопки формы
  enableButton() {
    const searchButton = document.querySelector('.button_type_search');
    searchButton.removeAttribute("disabled");
  }

}
