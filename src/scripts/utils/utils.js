
import {
    root,
    header,headerNav,headerNavItems,headerNavItem, headerNavMain, headerNavButton,headerMenu,
  } from '../constants/constants';
  
 
 


  

  
  
  const formatDate = (data) => {
    const months = ['января','февраля',
      'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const date = new Date(data).toLocaleString('ru', options).split('.');
    const dateNew = `${date[0]} ${months[date[1] / 1]}, ${date[2]}`;
    return dateNew;
  };
  
  
  
  const openCloseNav = () => {
    
    root.classList.toggle('root_dark');
    header.classList.toggle('header_dark');
    headerMenu.classList.toggle('header__menu_close');
    headerNav.classList.toggle('header__nav_drop-down-nav');
    headerNavItems.classList.toggle('header__nav_drop-down-nav-items');
    headerNavItem[2].classList.toggle('header__nav_drop-down-nav-item');
    headerNavMain[0].classList.toggle('header__nav_drop-down-nav-main');
    headerNavButton.classList.toggle('.header__nav_drop-down-nav-button');
  };


  const sortingKeywords = (articles) => {
    const arrKeyword = articles.map((i) => i.keyword).sort();
    const obj = {};
    let v = 0;
    for (let i = 0; i < arrKeyword.length; i += 1) {
      if (arrKeyword[i] !== arrKeyword[i + 1]) {
        obj[arrKeyword[i]] = v + 1;
        v = 0;
      } else {
        v += 1;
      }
    }
    const arrKey = Object.entries(obj).sort((a, b) => b[1] - a[1]).map((n) => n[0]);
    return arrKey;
  };

  
  
  export {
   
    openCloseNav,
    sortingKeywords,
    formatDate,
  };