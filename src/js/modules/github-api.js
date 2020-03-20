export default class GithubApi {
  constructor({ url }) {
    this._url = url;
  }

  getCommits() {

    return fetch(`${this._url}`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch(err =>
        console.log(err),
      )
  }
}
