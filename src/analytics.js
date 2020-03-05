import "./pages/analytics/analytics.css";
import { WEEK_IN_MILLISECONDS } from "./js/constants/constants";
import { DAY_IN_MILLISECONDS } from "./js/constants/constants";

let returnCardsObj = JSON.parse(localStorage.getItem("cards"))


let returnWord = localStorage.getItem("word");


//Вы спросили
const requestWord = document.querySelector(".request__word");
requestWord.textContent = returnWord;

//Новостей за неделю
const newsPerWeek = document.querySelector(".request__value_type_per-week");
newsPerWeek.textContent = returnCardsObj.length


// Сколько раз встречается ключевое слово в заголовках за неделю
let totalInTitle = 0;
returnCardsObj.forEach(function (item, i) {
  if (returnCardsObj[i].title.includes(returnWord)) {
    totalInTitle = totalInTitle + 1;
  }
  return totalInTitle;
});


//Упоминаний в заголовках
const keywordInTitle = document.querySelector(".request__value_type_mentioned");
keywordInTitle.textContent = totalInTitle;

// Сколько раз встречается ключевое слово в тексте
let totalInText = 0;
returnCardsObj.forEach(function (item, i) {
  if (returnCardsObj[i].description.includes(returnWord)) {
    totalInText = totalInText + 1;
  }
  return totalInText;
});

//и в тексте, и в заголовках
let total = totalInText + totalInTitle;

//По дням

const dateCurrent = new Date()




//Cобирает массив из всех нужных дат
let dates = [dateCurrent];
function add(dates) {
  for (let i = 1; i < 7; i++) {
    dates.unshift(new Date(dateCurrent - DAY_IN_MILLISECONDS * i));
  }
};
add(dates)

console.log(dates)

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


returnCardsObj.forEach(function (item, i) {
  item.publishedAt = new Date(item.publishedAt)
});


returnCardsObj = returnCardsObj.map(function (item) {
  item.publishedAt = `${item.publishedAt.toLocaleString("ru", { day: "numeric" })}, ${item.publishedAt.toLocaleString("ru", { weekday: 'short' })}`
  return item.publishedAt
})

console.log(returnCardsObj)

const barsTexts = document.querySelectorAll(".graphic__text");
const bars = document.querySelectorAll(".graphic__bar");

let a = returnCardsObj.filter(function (item) {
  return item === datesShort[0]
})
console.log(a);
barsTexts[0].textContent = a.length;
bars[0].style.width = `${a.length}%`
