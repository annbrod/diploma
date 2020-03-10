export default class CommitCard {
  constructor() {

  }
  //Создает шаблон cлайда
  create(commit, author) {
    //Приводит дату к нужному формату
    this.date = commit.committer.date
    this.date = new Date(this.date).toLocaleString("ru", { day: "numeric", year: 'numeric', month: 'long' });

    //Создает разметку слайда
    return `  <div class="swiper-slide">
    <span class="swiper-slide__date">${this.date}</span>
    <div class="swiper-slide__info">
      <div class="swiper-slide__image" style="background-image: url(${author.avatar_url});"><div>
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
