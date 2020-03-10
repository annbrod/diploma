import "./pages/analytics/analytics.css";
import { DAY_IN_MILLISECONDS } from "./js/constants/constants";
import DataStorage from "./js/modules/DataStorage";
import Statistics from "./js/components/Statistics";


const dataStorage = new DataStorage(localStorage);
const dateCurrent = new Date();

let returnCardsObj = dataStorage.getObject("cards");
let returnWord = dataStorage.getString("word");


//Вы спросили
const requestWord = document.querySelector(".request__word");
requestWord.textContent = returnWord;

//Новостей за неделю
const newsPerWeek = document.querySelector(".request__value_type_per-week");
newsPerWeek.textContent = returnCardsObj.length


// Сколько раз встречается ключевое слово в заголовках за неделю
let totalInTitle = 0;
returnCardsObj.forEach(function (item, i) {
  if (returnCardsObj[i].title) {
    if (returnCardsObj[i].title.includes(returnWord)) {
      totalInTitle = totalInTitle + 1;
    }
    return totalInTitle;
  }
});


//Упоминаний в заголовках
const keywordInTitle = document.querySelector(".request__value_type_mentioned");
keywordInTitle.textContent = totalInTitle;

// Сколько раз встречается ключевое слово в тексте
let totalInText = 0;
returnCardsObj.forEach(function (item, i) {
  if (returnCardsObj[i].description) {
    if (returnCardsObj[i].description.includes(returnWord)) {
      totalInText = totalInText + 1;
    }
    return totalInText;
  }
});

//Формирование графика
const statistics = new Statistics(returnCardsObj);
let datesShort = statistics.getDates(dateCurrent, DAY_IN_MILLISECONDS);
statistics.getGraphicDates(datesShort);
let cardsObjDates = statistics.formateDate();
statistics.constructGraphic(cardsObjDates, datesShort);

