import "./pages/analytics/analytics.css";
import { DAY_IN_MILLISECONDS } from "./js/constants/constants";
import { ERROR_MESSAGES } from "./js/constants/constants";
import DataStorage from "./js/modules/DataStorage";
import Statistics from "./js/components/Statistics";


const dataStorage = new DataStorage(localStorage, ERROR_MESSAGES);
const dateCurrent = new Date();

const returnCardsObj = dataStorage.getObject("cards");
const returnWord = dataStorage.getString("word");
//Массив спанов с датами из графика
const graphicDates = document.querySelectorAll(".graphic__day");
const barsTexts = document.querySelectorAll(".graphic__text");
const bars = document.querySelectorAll(".graphic__bar");

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
    if (returnCardsObj[i].title.toLowerCase().includes(returnWord.toLowerCase())) {
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
    if (returnCardsObj[i].description.toLowerCase().includes(returnWord.toLowerCase())) {
      totalInText = totalInText + 1;
    }
    return totalInText;
  }
});

//Формирование графика
const statistics = new Statistics(returnCardsObj);
const datesShort = statistics.getDates(dateCurrent, DAY_IN_MILLISECONDS);
statistics.getGraphicDates(datesShort, graphicDates);
const cardsObjDates = statistics.formateDate();
statistics.constructGraphic(cardsObjDates, datesShort, barsTexts, bars);

