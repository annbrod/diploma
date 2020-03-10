export default class GithubApi {
  constructor({ url }) {
    this.url = url;

  }

  getCommits() {

    return fetch(`${this.url}`)
      .then(res => {
        console.log(res)
        if (!res.ok) {

          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        console.log(res)
        return res;
      })
  }
}
