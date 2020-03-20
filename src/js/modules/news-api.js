export default class NewsApi {
  constructor({ url, key, pageSize }) {
    this._url = url;
    this._apiKey = key;
    this._pageSize = pageSize;
  }

  getNews(word, dateFrom, dateTo) {

    return fetch(`${this._url}q=${word}&from=${dateFrom}&to=${dateTo}&sortBy=publishedAt&pageSize=${this._pageSize}&apiKey=${this._apiKey}`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch(err =>
        console.log(err)
      )
  }
}
