export default class MainApi {
  constructor(serverUrl, formAuhorization, formRegistration) {
    this.serverUrl = serverUrl;
    this.formAuhorization = formAuhorization;
    this.formRegistration = formRegistration;
  }

  signup=()=>fetch(`${this.serverUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.formRegistration.email.value,
      password: this.formRegistration.password.value,
      name: this.formRegistration.name.value,
    }),
  })

  signin = () => fetch(`${this.serverUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.formAuhorization.email.value,
      password: this.formAuhorization.password.value,
    }),
  })

  getUserData = () => fetch(`${this.serverUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
  })

  getArticles = () => fetch(`${this.serverUrl}/articles`, {
    method: 'GET',
    credentials: 'include',
  })

  createArticle = (obj) => fetch(`${this.serverUrl}/articles`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      keyword: obj.keyword,
      title: obj.title,
      text: obj.text,
      date: obj.date,
      source: obj.source,
      link: obj.link,
      image: obj.image,
    }),
  })

  removeArticle = (id) => fetch(`${this.serverUrl}/articles/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
