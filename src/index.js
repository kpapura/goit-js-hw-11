import './css/main.css';
import { fetchImg } from './fetchImages'; 
import { clearMarkup, generateMarkup, gallery } from './createMarkup';

const form = document.querySelector('.search-form');
export const markupBox = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchedImages = new fetchImg();

form.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSubmitForm(e) {
  e.preventDefault();
  clearMarkup();
  const inputString = e.target.elements.searchQuery.value.trim('');
  if (!inputString) return;

  fetchedImages.page = 1;
  fetchDataMarkup(inputString);
}

function onLoadMoreBtnClick() {
  fetchedImages.page += 1;
  fetchDataMarkup();
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      if (fetchedImages.totalPages === fetchedImages.page) {
        imgLoaded();
        observer.unobserve(entries[0].target);
        return;
      }
      fetchedImages.page += 1;
      fetchDataMarkup();
      observer.unobserve(entries[0].target);
    }
  },
  { threshold: 0.5 }
);

async function fetchDataMarkup(inputValue) {
  const responseObject = await fetchedImages.getImages(inputValue);

  if (responseObject.hits.length === 0) {
    caseNotFoundImg();
    return;
  }
  markupBox.insertAdjacentHTML(
    'beforeend',
    generateMarkup(responseObject.hits)
  );

   const theLastOne = document.querySelector('.photo-card:last-child');
  observer.observe(theLastOne);
  gallery.refresh();
  fetchedImages.totalPages = Math.ceil(responseObject.totalHits / 40);
  if (fetchedImages.page === 1) totalHitsNotice(responseObject.totalHits);
}

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function caseNotFoundImg() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 1000,
      showOnlyTheLastOne: true,
    }
  );
}

 function imgLoaded() {
  Notify.info(`We're sorry, but you've reached the end of search results.`, {
    timeout: 1000,
    showOnlyTheLastOne: true,
  });
}

 function totalHitsNotice(numberOfImg) {
  Notify.success(`Hooray! We found ${numberOfImg} images.`, {
    timeout: 1000,
    showOnlyTheLastOne: true,
  });
}