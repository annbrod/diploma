export default class NewsCardList {
  //передаём  шаблон карточки
  constructor(container, cardElement) {
    this.container = container;
    this.cardElement = cardElement;
    this.count = 0;
    this.cardsNumber = 0;
  }

  //Создаёт карточку
  addCard(url, urlToImage, publishedAt, title, description, source, word) {
    //из шаблона делаем DOM-элемент
    const card = this.cardElement.create(url, urlToImage, publishedAt, title, description, source);
    //добавляем карточку в cardList
    this.container.insertAdjacentHTML("beforeend", card);
    this.word = word;
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
    const moreButton = document.querySelector('.button_type_more');
    moreButton.classList.remove("button_is-hidden")
    //загружаем по три карточки
    for (let i = this.total; i < this.total + 3; i++) {
      if (i >= this.cardsSum) {
        moreButton.classList.add("button_is-hidden")
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
