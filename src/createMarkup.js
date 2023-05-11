
import { markupBox } from "./index"; 
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function generateMarkup(inputOfPic) {
  return inputOfPic.map(picture => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = picture;
    return `<div class="photo-card">
    <a href="${largeImageURL}"><img class="photo-card-image" src="${webformatURL}" width="300px" height="200px" alt="${tags}" loading="lazy" /></a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
  }).join('');
}

export function clearMarkup() {
  markupBox.innerHTML = '';
}

export let gallery = new SimpleLightbox('.photo-card a');
gallery.on('show.simplelightbox', function () {});