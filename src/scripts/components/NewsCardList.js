

export default class NewsCardList {
  constructor(
    list,
    search,
    preloader,
    newsApi,
    createCardFunction,
  ) {
    this.list = list;
    this.listcontainerCards = list.querySelector('.list__container');
    
    this.preloaderSearch = preloader.querySelector('.preloader__search');
    this.preloaderResult = preloader.querySelector('.preloader__no-result');
    this.preloaderError = preloader.querySelector('.preloader__error');
    this.searchForm = search.querySelector('.search__form');
    this.newsApi = newsApi;
    this.createCardFunction = createCardFunction;
  }

  addCard(cardElement) {
    this.listcontainerCards.appendChild(cardElement);
  }

preloader(){
  this.preloaderSearch.classList.remove('preloader_display');
  this.preloaderResult.classList.add('preloader_display');
}

renderCard(json,i){
   
  // eslint-disable-next-line max-len
  this.addCard((this.createCardFunction().createCard(json.articles[i])));

}



  

  searchNews(){
    
    if (this.searchForm.querySelector('input')) {
      this.list.classList.remove('list_display');
     
      localStorage.setItem('keyword', `${this.searchForm.search.value.toLowerCase()}`);
      this.preloaderSearch.classList.add('preloader_display');
      this.preloaderResult.classList.remove('preloader_display');
      this.preloaderError.classList.remove('preloader_display');
      this.newsApi.getNews()
        .then((res) => {
          if (res.ok) {
            return res.json().then((json) => {
              for (let i = 0; i < 3; i += 1) {
                // eslint-disable-next-line max-len
                this.renderCard(json,i);
              }
              this.preloaderSearch.classList.remove('preloader_display');
              this.list.classList.add('list_display');
            }).catch(() => {
              this.preloader();
            });
          }
          this.preloader();
          return true;
        }).catch(() => {
          this.preloader();
        });
    } else {
      this.searchForm.querySelector('.error').textContent = 'нужно ввести ключевое слово';
      const search = () => {
        this.searchForm.querySelector('.error').textContent = '';
      };
      setTimeout(search, 2000);
    }
    this.searchForm.reset();
  }
  

  addListNews() {
    const container = this.listcontainerCards.children.length;
   
    if (container < 100) {
      this.newsApi.getNews().then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            
            for (let i = container; i < container + 3; i += 1) {
              // eslint-disable-next-line max-len
              this.renderCard(json,i);
            
            }
          }).catch((e) => {
            this.listButton.textContent = 'Ошибка';
            console.log(e);
          });
        }
        return Promise.reject();
      }).catch((e) => {
        this.listButton.textContent = 'Ошибка';
        console.log(e);
      });
    } else {
      this.listButton.classList.add('list_display-none');
    }
  }

  

 
}