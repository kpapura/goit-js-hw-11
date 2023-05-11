import axios from 'axios';
export class fetchImg {
  #BASE_URL;
  #PARAMS;
  searchParam;
  totalPages;
  page;
  constructor() {
    this.page = 1;
    this.totalPages = 0;
    this.searchParam = '';
    this.#BASE_URL = 'https://pixabay.com/api/';
    this.#PARAMS = new URLSearchParams({
      key: '36251930-42816f081666303cc975e8abf',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    });
  }
  async getImages(inputRequest) {
    if (inputRequest) this.searchParam = inputRequest;

    try {
      const responce = await axios.get(
        `${this.#BASE_URL}?q=${this.searchParam}&page=${this.page}&${
          this.#PARAMS
        }`
      );
      return responce.data;
    } catch {
      return { hits: [] };
    }
  }
}