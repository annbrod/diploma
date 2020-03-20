

export default class SearchInput {
  constructor(ERROR_MESSAGES, card, cardList, results, loading, newsApi, fail, titleSection, moreButton, dataStorage, searchForm, searchInput, searchButton) {
    this._errors = ERROR_MESSAGES;
    this._card = card;
    this._cardList = cardList;
    this._results = results;
    this._loading = loading;
    this._newsApi = newsApi;
    this._fail = fail;
    this._titleSection = titleSection;
    this._moreButton = moreButton;
    this._dataStorage = dataStorage;
    this._searchForm = searchForm;
    this._searchInput = searchInput;
    this._searchButton = searchButton;
    this._error = document.querySelector(`#error-search`);
  }

  submit(event, dateTo, dateFrom) {
    event.preventDefault();
    this._disableButton();
    this._disableInput();
    //Очищает список от предыдущих результатов, если есть
    this._cardList.clear()
    this._fail.classList.remove("fail_is-opened");
    this._titleSection.classList.remove("title-section_is-opened");
    //Показывает блок результатов
    this._results.classList.add("results_is-opened");
    //Показывает блок прелоудера
    this._loading.classList.add("load_is-opened");

    //Прячет кнопку 'Показать еще'
    this._moreButton.classList.add("button_is-hidden")
    //Добавляет карточки
    this._newsApi.getNews(this._searchInput.value, dateFrom, dateTo)
      .then(res => {
        //Если карточки есть
        if (res.articles.length) {
          this._enableButton();
          this._enableInput();
          //Очищаем хранилище от предыдущих карточек и keyword
          this._dataStorage.clear();
          //Сохраняем в локальное хранилище
          this._dataStorage.set('word', this._searchInput.value);
          const cardsObj = JSON.stringify(res.articles);
          this._dataStorage.set('cards', cardsObj);
          this._fail.classList.remove("fail_is-opened");
          this._cardList.renderInitial(res.articles, this._searchInput.value);
          this._loading.classList.remove("load_is-opened");
          this._titleSection.classList.add("title-section_is-opened");
          this._results.classList.add("results_is-opened");

          //Если карточек нет
        } else {
          this._enableButton();
          this._enableInput();
          this._cardList.clear()
          this._loading.classList.remove("load_is-opened");
          this._titleSection.classList.remove("title-section_is-opened");
          this._fail.classList.add("fail_is-opened");

        }
      })
      //Ошибка запроса
      .catch(err => {
        this._enableButton();
        this._enableInput();
        this._cardList.clear()
        this._loading.classList.remove("load_is-opened");
        this._titleSection.classList.remove("title-section_is-opened");
        this._results.classList.add("results_is-opened");
        this._results.textContent = this._errors.serverError
      })
  }


  validate(event) {

    const searchInput = event.currentTarget.element;
    if (!event.target.validity.valid) {
      //Если поле не валидно, отключить кнопку
      this._disableButton(event);
      this._checkEmptyField(event, searchInput)

    } else {
      this._checkIfCorrect(event, searchInput);
      this._enableButton(event);
    }
  }

  _checkEmptyField(event) {
    if (event.target.value.length === 0) {
      this._error.textContent = this._errors.emptyField;
    }
  }

  _checkIfCorrect(event) {
    if (event.target.validity.valid) {
      this._error.textContent = "";
    }
  }


  //Отключение кнопки формы
  _disableButton() {
    this._searchButton.setAttribute("disabled", true);
  }

  //Велючение кнопки формы
  _enableButton() {
    this._searchButton.removeAttribute("disabled");
  }

  _disableInput() {
    this._searchInput.setAttribute("disabled", true);
  }

  _enableInput() {
    this._searchInput.removeAttribute("disabled");
  }

}
