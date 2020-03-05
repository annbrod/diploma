export default class NewsApi {
  constructor({ url, key, pageSize }) {
    this.url = url;
    this.apiKey = key;
    this.pageSize = pageSize;
  }

  getNews(word, dateFrom, dateTo) {

    return fetch(`${this.url}q=${word}&from=${dateFrom}&to=${dateTo}&sortBy=publishedAt&pageSize=${this.pageSize}&apiKey=${this.apiKey}`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
  }
}
