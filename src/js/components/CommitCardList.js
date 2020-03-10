export default class CommitCardList {
  //передаём  шаблон слайдера
  constructor(container, cardElement, api) {
    this.container = container;
    this.cardElement = cardElement;
    this.api = api;
  }

  //Создаёт слайдер
  addCard(commit, author) {
    //из шаблона делаем DOM-элемент
    const card = this.cardElement.create(commit, author);
    //добавляем слайдер в CommitCardList
    this.container.insertAdjacentHTML("beforeend", card);
    this.word = word;
  }


  render() {

    const res = this.api
      .getCommits();
    console.log(this.api
      .getCommits())

    res.forEach(res => {
      this.addCard(res.commit, res.author);
    })



  }

}
