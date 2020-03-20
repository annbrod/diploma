

export const NEWS_API_CONFIG = {
  url: 'https://newsapi.org/v2/everything?',
  key: "63b5f098fd034406940a01211c81af94",
  pageSize: 100,
}

export const GITHUB_API_CONFIG = {
  url: 'https://api.github.com/repos/annbrod/diploma/commits',
  headers: { 'Content-Type': 'application/json' },
}

export const ERROR_MESSAGES = {
  serverError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  emptyField: 'Нужно ввести ключевое слово',
  storageError: 'Хранилище браузера недоступно. Мы не сможем показать корректную статистику запросов :(',
};

//столько миллисекунд в неделе
export const WEEK_IN_MILLISECONDS = 604800000;

export const DAY_IN_MILLISECONDS = 86400000;
export const COMMITS_NUMBER = 20;
export const INITIAL_CARDS_NUMBER = 3;
export const DAYS_IN_WEEK = 7;
