export default class NewsCardList {
  //передаём  шаблон карточки
  constructor(container, cardElement) {
    this.container = container;
    this.cardElement = cardElement;
  }

  //Создаёт карточку
  addCard(url, urlToImage, publishedAt, title, description, source, word) {
    //из шаблона делаем DOM-элемент
    const card = this.cardElement.create(url, urlToImage, publishedAt, title, description, source);
    //добавляем карточку в cardList
    this.container.insertAdjacentHTML("beforeend", card);
    this.word = word;
  }


}
