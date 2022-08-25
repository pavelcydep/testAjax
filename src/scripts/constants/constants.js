
 const serverUrl = 'https://api.pavlov-news.students.nomoreparties.xyz';
 const serverUrlNews = 'https://nomoreparties.co/news/v2/everything?';
const footer = document.querySelector(".footer")
const root = document.querySelector('.root');
const header = root.querySelector('.header');
const search = root.querySelector('.search');
const preloader = root.querySelector('.preloader');
const conteinerText = root.querySelector('.conteiner-text');
const list = root.querySelector('.list');
const popupRegistration = root.querySelector('.popup__registration');
const popupAuthorization = root.querySelector('.popup__authorization');
const formAuhorization = document.querySelector('.popup__form-authorization');
const formRegistration = document.querySelector('.popup__form-registration');
const headerNavButton = document.querySelector('.header__nav-button');
const popupButton = document.querySelector('.popup__button');
const popupSuccessful = root.querySelector('.popup__successful-registration');
const listButton = list.querySelector('.list__button');

const headerMenu = document.querySelector('.header__menu');
const searchForm = document.querySelector('.search__form');
const popupText = document.querySelector('.popup__text_dark');
const popupButtonRegistration = document.querySelector('.popup__button-registration')
const headerNav = header.querySelector('.header__nav');
const headerNavItems = headerNav.querySelector('.header__nav-items');
const headerNavItem = headerNavItems.querySelectorAll('.header__nav-item');
const headerNavMain = headerNavItems.querySelectorAll('.header__nav-main');


export {
  root,
  header,
  search,
  preloader,
  conteinerText,
  list,
 popupRegistration,
  popupAuthorization,
  formAuhorization,
  formRegistration,

  footer,
  

  popupButton,
  popupSuccessful,
  listButton,
  headerMenu,
  searchForm, 
  serverUrl,serverUrlNews,
  popupText, 
  popupButtonRegistration,
  headerNav,headerNavItems,headerNavItem, headerNavMain, headerNavButton,

};
