import "./pages/about/about.css";
import { GITHUB_API_CONFIG } from "./js/constants/constants";


import Swiper from 'swiper';
import GithubApi from "./js/modules/GithubApi";
import CommitCard from "./js/components/CommitCard";
import CommitCardList from "./js/components/CommitCardList";

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

const githubApi = new GithubApi(GITHUB_API_CONFIG);
const commit = new CommitCard(githubApi);
const commitCardList = new CommitCardList(document.querySelector(".swiper-wrapper"), commit, githubApi);
commitCardList.render();




