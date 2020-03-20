export default class CommitCardList {
  //передаём  шаблон слайдера
  constructor(container, cardElement, api) {
    this._container = container;
    this._cardElement = cardElement;
    this._api = api;
  }

  //Создаёт слайдер
  _addCard(commit, author) {
    //из шаблона делаем DOM-элемент
    const card = this._cardElement.create(commit, author);
    //добавляем слайдер в CommitCardList
    this._container.insertAdjacentHTML("beforeend", card);
  }


  render(COMMITS_NUMBER, gitResults, ERROR_MESSAGES) {
    this._COMMITS_NUMBER = COMMITS_NUMBER;
    this._ERROR_MESSAGES = ERROR_MESSAGES;
    this._gitResults = gitResults;
    this._api
      .getCommits()
      .then(res => {

        res.length > this._COMMITS_NUMBER ? res.length = this._COMMITS_NUMBER : res.length
        res.forEach(commit => {
          this._addCard(commit.commit, commit.author);
        })
      })
      .catch(err => {
        console.log(err),
          this._gitResults.style = "text-align:center",
          this._gitResults.textContent = this._ERROR_MESSAGES.serverError
      }
      )

  }

}

