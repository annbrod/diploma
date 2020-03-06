import "./pages/analytics/analytics.css";
import { DAY_IN_MILLISECONDS } from "./js/constants/constants";

let returnCardsObj = JSON.parse(localStorage.getItem("cards"))
let returnWord = localStorage.getItem("word");


//Вы спросили
const requestWord = document.querySelector(".request__word");
requestWord.textContent = returnWord;

//Новостей за неделю
const newsPerWeek = document.querySelector(".request__value_type_per-week");
newsPerWeek.textContent = returnCardsObj.length


const dateCurrent = new Date();


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


//Cобирает массив из всех нужных дат
let dates = [dateCurrent];
function add(dates) {
  for (let i = 1; i < 7; i++) {
    dates.unshift(new Date(dateCurrent - DAY_IN_MILLISECONDS * i));
  }
};
add(dates)


//Приводит даты к нужному формату

let datesShort = dates.map(function (item) {
  item = `${item.toLocaleString("ru", { day: "numeric" })}, ${item.toLocaleString("ru", { weekday: 'short' })}`
  return item
})


//Массив спанов с датами из графика
const graphicDates = document.querySelectorAll(".graphic__day");


//Проставляет даты в график

graphicDates.forEach(function (i, item) {
  i.textContent = datesShort[item];
});

//У всех полученных карточек форматирует дату для сравнения

returnCardsObj.forEach(function (item, i) {
  item.publishedAt = new Date(item.publishedAt)
});


let cardsObjDates = returnCardsObj.map(function (item) {
  item.publishedAt = `${item.publishedAt.toLocaleString("ru", { day: "numeric" })}, ${item.publishedAt.toLocaleString("ru", { weekday: 'short' })}`
  return item.publishedAt
})



const barsTexts = document.querySelectorAll(".graphic__text");
const bars = document.querySelectorAll(".graphic__bar");

//Разбивает статьи на 7 баров

function addCardsToBars() {
  for (let i = 0; i < 7; i++) {

    let a = cardsObjDates.filter(function (item) {
      return item === datesShort[i]
    })

    barsTexts[i].textContent = a.length;
    bars[i].style.width = `${a.length}%`;
  }
}
addCardsToBars();
