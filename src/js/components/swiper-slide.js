export default class CommitCard {
  constructor() {

  }
  //Создает шаблон cлайда
  create(commit, author) {
    //Приводит дату к нужному формату
    this._date = commit.committer.date
    this._date = new Date(this._date)
    this._date = `${this._date.toLocaleString("ru", { day: "numeric", month: 'long' })}, ${this._date.toLocaleString("ru", { year: 'numeric' })}`

    //Создает разметку слайда
    if (!author) {
      return `  <div class="swiper-slide">
      <span class="swiper-slide__date">${this._date}</span>
      <div class="swiper-slide__info">
        <div class="swiper-slide__image"></div>
        <div class="swiper-slide__contacts">
          <p class="swiper-slide__name">${commit.committer.name}</p>
          <p class="swiper-slide__email">${commit.committer.email}</p>
        </div>
      </div>
      <p class="swiper-slide__text">
      ${commit.message}
      </p>
    </div>`
    }
    else {
      return `  <div class="swiper-slide">
      <span class="swiper-slide__date">${this._date}</span>
      <div class="swiper-slide__info">
        <div class="swiper-slide__image" style="background-image: url(${author.avatar_url});"></div>
        <div class="swiper-slide__contacts">
          <p class="swiper-slide__name">${commit.committer.name}</p>
          <p class="swiper-slide__email">${commit.committer.email}</p>
        </div>
      </div>
      <p class="swiper-slide__text">
      ${commit.message}
      </p>
    </div>`
    }
  }
}
