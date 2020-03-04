import { ERROR_MESSAGES } from "../constants/constants";

export default class SearchInput {
  constructor() {

  }

  validate(event) {

    const searchInput = event.currentTarget.element;
    if (!event.target.validity.valid) {
      //Если поле не валидно, отключить кнопку
      this.disableButton(event);
      this.checkEmptyField(event, searchInput)

    } else {
      this.checkIfCorrect(event, searchInput);
      this.enableButton(event);
    }
  }

  checkEmptyField(event) {
    if (event.target.value.length === 0) {
      document.querySelector(`#error-search`).textContent = ERROR_MESSAGES.emptyField;
    }
  }

  checkIfCorrect(event) {
    if (event.target.validity.valid) {
      document.querySelector(`#error-search`).textContent = "";
    }
  }


  //Отключение кнопки формы
  disableButton() {
    const searchButton = document.querySelector('.button_type_search');
    searchButton.setAttribute("disabled", true);
  }

  //Велючение кнопки формы
  enableButton() {
    const searchButton = document.querySelector('.button_type_search');
    searchButton.removeAttribute("disabled");
  }

}
