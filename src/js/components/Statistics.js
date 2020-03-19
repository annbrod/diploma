export default class Statistics {
  constructor(returnCardsObj) {
    this.returnCardsObj = returnCardsObj;
  }

  getDates(dateCurrent, DAY_IN_MILLISECONDS) {
    const dates = [dateCurrent];
    function add(dates) {
      for (let i = 1; i < 7; i++) {
        dates.unshift(new Date(dateCurrent - DAY_IN_MILLISECONDS * i));
      }
    };
    add(dates)

    //Приводит даты к нужному формату
    const datesShort = dates.map(function (item) {
      item = `${item.toLocaleString("ru", { day: "numeric" })}, ${item.toLocaleString("ru", { weekday: 'short' })}`
      return item
    });

    return datesShort;
  }

  getGraphicDates(datesShort, graphicDates) {
    this.graphicDates = graphicDates;
    //Проставляет даты в график
    this.graphicDates.forEach(function (i, item) {
      i.textContent = datesShort[item];
    });
  }

  formateDate() {
    this.returnCardsObj.forEach(function (item, i) {
      item.publishedAt = new Date(item.publishedAt)
    });


    const cardsObjDates = this.returnCardsObj.map(function (item) {
      item.publishedAt = `${item.publishedAt.toLocaleString("ru", { day: "numeric" })}, ${item.publishedAt.toLocaleString("ru", { weekday: 'short' })}`
      return item.publishedAt
    })
    return cardsObjDates;
  }

  constructGraphic(cardsObjDates, datesShort, barsTexts, bars) {
    this.barsTexts = barsTexts;
    this.bars = bars;
    //Разбивает статьи на 7 баров
    function addCardsToBars() {
      for (let i = 0; i < 7; i++) {

        const a = cardsObjDates.filter(function (item) {
          return item === datesShort[i]
        })

        barsTexts[i].textContent = a.length;
        bars[i].style.width = `${a.length}%`;
      }
    }
    addCardsToBars();
  }
}
