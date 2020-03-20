export default class NewsCard {
  constructor() {

  }
  //Создает шаблон карточки
  create(url, urlToImage, publishedAt, title, description, source) {
    //Приводит дату к нужному формату
    this._date = publishedAt
    this._date = new Date(this._date).toLocaleString("ru", { day: "numeric", year: 'numeric', month: 'long' });

    //Создает разметку карточки
    return `<a class="card" href="${url}" target="_blank">
    <div class="card__image" style="background-image: url(${urlToImage});"></div>
    <div class="card__description">
      <p class="card__date">${this._date}<p>
          <h3 class="card__title">${title}</h3>
          <p class="card__text">
            ${description}
          </p>
          <p class="card__source">${source.name}</p>
    </div>
  </a>`
  }
}
