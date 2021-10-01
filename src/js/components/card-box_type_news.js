export default class NewsCardList {
  //передаём  шаблон карточки
  constructor(container, cardElement, titleSection, results, moreButton, INITIAL_CARDS_NUMBER) {
    this._container = container;
    this._cardElement = cardElement;
    this._titleSection = titleSection;
    this._results = results;
    this._count = 0;
    this._moreButton = moreButton;
    this._INITIAL_CARDS_NUMBER = INITIAL_CARDS_NUMBER;
  }

  //Создаёт карточку
  _addCard(url, urlToImage, publishedAt, title, description, source, word) {
    //из шаблона делаем DOM-элемент
    const card = this._cardElement.create(url, urlToImage, publishedAt, title, description, source);
    //добавляем карточку в cardList
    this._container.insertAdjacentHTML("beforeend", card);
    this.word = word;
  }


  //Добавляет карточки на страницу, если они есть в хранилище (сохраняет карточки по возвращению на главную)
  renderCurrent(dataStorage, searchInput) {
    this._dataStorage = dataStorage;
    const cards = this._dataStorage.getObject('cards');
    const word = this._dataStorage.getString('word');
    this._searchInput = searchInput;
    if (cards) {
      this._searchInput.value = word;
      this.renderInitial(cards, word);
      this._titleSection.classList.add("title-section_is-opened");
      this._results.classList.add("results_is-opened");
    }
  }

  //Добавляет первые три (или меньше) карточек
  renderInitial(cards, word) {
    this._word = word;
    this._total = 0;
    this._cardsSum = cards.length;
    this._cards = cards;
    this.render();
  }

  //Добавляет карточки по нажатию "Показать ещё"
  render() {
    this._moreButton.classList.remove("button_is-hidden")
    //загружаем по три карточки
    for (let i = this._total; i < this._total + this._INITIAL_CARDS_NUMBER; i++) {
      if (i >= this._cardsSum) {
        this._moreButton.classList.add("button_is-hidden")
        if (i = this._cardsSum) {
          return;
        }
      }
      //Для каждой карточки:
      const card = this._cards[i];
      this._addCard(card.url, card.urlToImage, card.publishedAt, card.title, card.description, card.source, this.word);
    }
    //Прибавляем к итоговой сумме по три каждую итерацию
    this._total = this._total + this._INITIAL_CARDS_NUMBER;
  }

  //Очищает список карточек
  clear() {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild)
    }
    this._total = 0;
  }

}
