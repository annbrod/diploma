import "./pages/index.css";
import "./pages/about.css";


import Swiper from 'swiper';

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {// настройки для разных разрешений
        1024: {
            slidesPerView: 3,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 8
        },
        510: {
            slidesPerView: 1,
            spaceBetween: 3
        }
    }
});