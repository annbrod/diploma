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
  }


  render() {

    this.api
      .getCommits()
      .then(res => {

        res.length > 20 ? res.length = 20 : res.length
        res.forEach(commit => {
          this.addCard(commit.commit, commit.author);
        })
      })
      .catch(err =>
        console.log(err)
      )

  }

}


// if (res.length > 20) {
//   res = res.slice(0, 20)
//   console.log(res)
//   res.forEach(commit => {
//     this.addCard(commit.commit, commit.author);
//   })
// } else {
//   res.forEach(commit => {
//     this.addCard(commit.commit, commit.author);
//   })
// }
// })
