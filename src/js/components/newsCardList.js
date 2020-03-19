export default class NewsCardList {
  //передаём  шаблон карточки
  constructor(container, cardElement, titleSection, results, moreButton) {
    this.container = container;
    this.cardElement = cardElement;
    this.titleSection = titleSection;
    this.results = results;
    this.count = 0;
    this.moreButton = moreButton;
  }

  //Создаёт карточку
  addCard(url, urlToImage, publishedAt, title, description, source, word) {
    //из шаблона делаем DOM-элемент
    const card = this.cardElement.create(url, urlToImage, publishedAt, title, description, source);
    //добавляем карточку в cardList
    this.container.insertAdjacentHTML("beforeend", card);
    this.word = word;
  }


  //Добавляет карточки на страницу, если они есть в хранилище (сохраняет карточки по возвращению на главную)
  renderCurrent(dataStorage, searchInput) {
    this.dataStorage = dataStorage;
    const cards = this.dataStorage.getObject('cards');
    const word = this.dataStorage.getString('word');
    this.searchInput = searchInput;
    if (cards) {
      this.searchInput.value = word;
      this.renderInitial(cards, word);
      this.titleSection.classList.add("title-section_is-opened");
      this.results.classList.add("results_is-opened");
    }
  }

  //Добавляет первые три (или меньше) карточек
  renderInitial(cards, word) {
    this.word = word;
    this.total = 0;
    this.cardsSum = cards.length;
    this.cards = cards;
    this.render();
  }

  //Добавляет карточки по нажатию "Показать ещё"
  render() {
    this.moreButton.classList.remove("button_is-hidden")
    //загружаем по три карточки
    for (let i = this.total; i < this.total + 3; i++) {
      if (i >= this.cardsSum) {
        this.moreButton.classList.add("button_is-hidden")
        if (i = this.cardsSum) {
          return;
        }
      }
      //Для каждой карточки:
      const card = this.cards[i];
      this.addCard(card.url, card.urlToImage, card.publishedAt, card.title, card.description, card.source, this.word);
    }
    //Прибавляем к итоговой сумме по три каждую итерацию
    this.total += 3;
  }

  //Очищает список карточек
  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild)
    }
    this.total = 0;
  }

}
