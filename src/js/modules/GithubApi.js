export default class GithubApi {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  getCommits() {

    return fetch(`${this.url}`, {
      headers: this.headers
    })
      .then(res => {
        if (!res.ok) {

          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
  }
}
