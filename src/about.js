import "./pages/about/about.css";


import Swiper from 'swiper';

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  slidesPerColumn: 0,
  loop: true,
  uniqueNavElements: true,
  loopedSlides: 6,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper__button-next',
    prevEl: '.swiper__button-prev',
  },
});




