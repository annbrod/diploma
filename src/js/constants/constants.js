

export const NEWS_API_CONFIG = {
  url: 'http://newsapi.org/v2/everything?',
  key: "63b5f098fd034406940a01211c81af94",
  pageSize: 100,
}

export const GITHUB_API_CONFIG = {
  url: 'https://api.github.com/repos/annbrod/diploma/commits',
  headers: { 'Content-Type': 'application/json' },
}

export const ERROR_MESSAGES = {
  serverError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  emptyField: 'Нужно ввести ключевое слово'
};

//столько миллисекунд в неделе
export const WEEK_IN_MILLISECONDS = 604800000;

export const DAY_IN_MILLISECONDS = 86400000;

