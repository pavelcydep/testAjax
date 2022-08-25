export default class NewsCard {
  constructor(list, conteinerText, mainApi, createCardFunction, date, sortingKeywords, site) {
    this.listContainerConservedCards = list.querySelector('.list__container');
    this.containerTextTitle = conteinerText.querySelector('.conteiner-text__title');
    this.containerTextBold= conteinerText.querySelector('.conteiner-text__subtitle-bold');
    this.mainApi = mainApi;
    this.createCardFunction = createCardFunction;
    this.date = date;
    this.sortingKeywords = sortingKeywords;
  this.list = list;
  this.site = site;

  }

 //Создаю макет карточки для главной страницы.
 createCard (data) {
  const listCard = document.createElement('div');
  listCard.classList.add('list__card');
 
  
  const listCardButtonCollection = document.createElement('button');
  listCardButtonCollection.classList.add('list__rectangle_normal');
  listCard.appendChild(listCardButtonCollection);

  const listCardLinkContainer = document.createElement('a')
  listCardLinkContainer.classList.add('list__link-container');
  listCard.appendChild( listCardLinkContainer);

  const listCardImageContainer = document.createElement('div');
  listCardImageContainer.classList.add('list__image-container');
  listCardLinkContainer.appendChild(listCardImageContainer);

  const listCardImage = document.createElement('img');
  listCardImage.classList.add('list__image');
  listCardImageContainer.appendChild( listCardImage);
  
  const listCardDate = document.createElement('h4');
  listCardDate.classList.add('list__data');
  listCardLinkContainer.appendChild(listCardDate);

  const listCardSubtitle = document.createElement('h3');
  listCardSubtitle.classList.add('list__subtitle');
  listCardLinkContainer.appendChild(listCardSubtitle);
  
  const listCardContainerText = document.createElement('div');
  listCardContainerText.classList.add('list__container-text');
  listCardLinkContainer.appendChild(listCardContainerText);
  
  const listCardText = document.createElement('p');
  listCardText.classList.add('list__text');
  listCardContainerText.appendChild(listCardText);
  
  const listCardLinkText = document.createElement('p');
  listCardLinkText.classList.add('list__link');
  listCardLinkContainer.appendChild(listCardLinkText);

  


  listCardDate.textContent = this.date(data.publishedAt);
  listCardSubtitle.textContent = data.title;
  listCardText.textContent = data.description;
  listCardLinkText.textContent = data.source.name;
  listCardLinkContainer.href = data.url;
  listCardImage.src = `${data.urlToImage}`;
  listCardLinkContainer.setAttribute('target', '_blank');
  //listCardButtonCollection.setAttribute('disabled','true');


  if (this.site === 'main') {
    const listCardTextHint = document.createElement('p');
    listCardTextHint.classList.add('list__hint');
  listCard.appendChild(listCardTextHint);
  listCardTextHint.textContent = 'Войдите, чтоб сохранять статьи';
  this.listCardTextHint = listCardTextHint;
  
  listCardButtonCollection.addEventListener('mousemove', this.setTimeoutText.bind(this));
  
  }
  if (this.site === 'article') {
    listCardButtonCollection.addEventListener('click', this.rectangleActive.bind(this));
  }
  this.data = data;

  return listCard;
}


savedCard(data) {
  const listCard = document.createElement('div');
  listCard.classList.add('list__card');
  
  const listCardButtonDelete = document.createElement('button');
  listCardButtonDelete.classList.add('list__rectangle_delete');
  listCard.appendChild(listCardButtonDelete);

  const listCardLinkContainer = document.createElement('a')
  listCardLinkContainer.classList.add('list__link-container');
  listCard.appendChild(listCardLinkContainer);
  
  const listCardImageContainer = document.createElement('div');
  listCardImageContainer.classList.add('list__image-container');
  listCardLinkContainer.appendChild(listCardImageContainer);

  const listCardImage = document.createElement('img');
  listCardImage.classList.add('list__image');
  listCardImageContainer.appendChild( listCardImage);
  
const listCardDate = document.createElement('h4');
  listCardDate.classList.add('list__data');
  listCardLinkContainer.appendChild(listCardDate);

  const listCardSubtitle = document.createElement('h3');
  listCardSubtitle.classList.add('list__subtitle');
  listCardLinkContainer.appendChild(listCardSubtitle);

  const listCardContainerText = document.createElement('div');
  listCardContainerText.classList.add('list__container-text');
  listCardLinkContainer.appendChild(listCardContainerText);

  const listCardText = document.createElement('p');
  listCardText.classList.add('list__text');
  listCardContainerText.appendChild(listCardText);

  const listCardLinkText = document.createElement('p');
  listCardLinkText.classList.add('list__link');
  listCardLinkContainer.appendChild(listCardLinkText);
  



  listCardSubtitle.textContent = data.keyword;
  listCardDate.textContent = this.date(data.date);
  listCardSubtitle.textContent = data.title;
  listCardText.textContent = data.text;
  listCardLinkText.textContent = data.source;
  listCardLinkContainer.href = data.link;
  listCardImage.src = `${data.image}`;

  this.listCard = listCard;
  this.data = data;
  this.listCardButtonDelete = listCardButtonDelete;

  listCardLinkContainer.setAttribute('target', '_blank');
  listCardButtonDelete.addEventListener('click', this.rectangleDelete);

  return listCard;
}
setTimeoutText (event){
  if (event.target.className === 'list__rectangle_normal') {
    this.listCardTextHint.classList.add('list__hint_display');
    const textHint = () => this.listCardTextHint.classList.remove('list__hint_display');
    setTimeout(textHint, 1000);
  }
}
rectangleActive(event){
  event.stopPropagation();
  const obj = {
    keyword: localStorage.getItem('keyword'),
    title: this.data.title,
    text: this.data.description,
    date: this.data.publishedAt,
    source: this.data.source.name,
    link: this.data.url,
    image: this.data.urlToImage,
  };
  if (event.target.className === 'list__rectangle_normal') {
    this.mainApi.createArticle(obj).then((res) => {
      if (res.ok) {
        return res.json().then((json) => {
          this.jsonId = json.id;
          event.target.classList.add('list__rectangle_active');
          event.target.classList.remove('list__rectangle_normal');
        }).catch((e) => console.log(e));
      }
      return res.text().then((json) => Promise.reject(json));
    }).catch((e) => console.log(e));
  } else if (event.target.className === 'list__rectangle_active') {
    this.mainApi.removeArticle(this.jsonId).then((res) => {
      if (res.ok) {
        event.target.classList.remove('list__rectangle_active');
        event.target.classList.add('list__rectangle_normal');
        return true;
      }
      return res.text().then((json) => Promise.reject(json));
    }).catch((e) => console.log(e));
  }
}

arrKeySort(json){
  const arrKey = this.sortingKeywords(json);
  if (arrKey.length <= 3) {
    let conteinerKeyword = '';
    arrKey.forEach((i) => {
      conteinerKeyword  += `${i}, `;
    });
    this.containerTextBold.textContent = conteinerKeyword.slice(0, -2);
  } else {
    this.containerTextBold.textContent = `${arrKey[0]}, ${arrKey[1]} и ${arrKey.length - 2} другим`;
  }
  json.forEach((i) => {
    this.listContainerAdd.appendChild(this.createCardFunction().savedCard(i));
  });}




rectangleDelete=(event)=>{
  if (event.target.className === 'list__rectangle_delete') {
    this.mainApi.removeArticle(this.data._id)
      .then((res) => {
        if (res.ok) {
          this.listCardButtonDelete.removeEventListener('click', this.rectangleDelete);
          this.listCard.remove();
          this.mainApi.getArticles().then((res) => {
            if (res.ok) {
              return res.json().then((json) => {
                this.containerTextTitle.textContent = `${localStorage.getItem('nameUser')}, у вас ${json.length} сохраненных статей`;
               this.arrKeySort(json);
            
              }).catch((e) => console.log(e));
            }
            return Promise.reject(res.status);
          }).catch((e) => console.log(e));
        }
        return res.text().then((json) => Promise.reject(json));
      }).catch((e) => console.log(e));
  }
}


  



 
}
