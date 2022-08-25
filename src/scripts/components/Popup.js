
export default class Popup {
	constructor(element, openClassName,mainApi,root) {
		this.element = element;
		this.openClassName = openClassName;
    this.mainApi = mainApi;
    this.root = root;
		 this.root.querySelector('.content').addEventListener("click", () => this.close());
    
     this.btn = document.querySelector('.popup__button');
	}

	open() {
		this.element.classList.add(this.openClassName);
    this.root.classList.add('root_dark');
	}

	close() {
		this.element.classList.remove(this.openClassName);
    this.root.classList.remove('root_dark');
	}


  registration(event) {
    
    this.mainApi.signup()
      .then((res) => {
        if (res.ok) {
         
          return true;
        }
        return res.text().then((json) => Promise.reject(json));
      })
    
  }

authorization(event){
  
  this.btn = event.submitter;
 
  this.mainApi.signin()
    .then((res) => {
      if (res.ok) {
        return this.mainApi.getUserData()
          .then((resUser) => {
            if (resUser.ok) {
              return resUser.json().then((json) => {
                console.log(json);
                localStorage.setItem('nameUser', `${json.name}`);
                window.location.href = './articles';
              });
            }
            return Promise.reject(resUser.status);
          })
      
      }
      this.btn.textContent = 'Войти';
      return res.text().then((json) => Promise.reject(json));
    })

}

}

