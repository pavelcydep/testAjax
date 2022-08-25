export default class NewsApi {
  constructor(serverUrlNews) {
    this.serverUrlNews = serverUrlNews;
  }

  getNews = () => fetch(`${this.serverUrlNews}${new URLSearchParams({
    q: localStorage.getItem('keyword'),
    from: `${new Date().getFullYear()}-${new Date().getFullYear()}-${new Date().getDate() - 7}`,
    to: `${new Date().getFullYear()}-${new Date().getFullYear()}-${new Date().getDate()}`,
    sortBy: 'popularity',
    pageSize: 100,
    apiKey: 'ac7cacde540c4021b2b7798afadfb16d',
  })}`)


 
}
