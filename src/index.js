import fetchPhotos from './fetchPhotos.js';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import  "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let page = 1;
let lastSearch = '';
btnLoadMore.style.display = 'none';
const lightbox = new SimpleLightbox('.photo-card a');


form.addEventListener('submit', (e) => {
	e.preventDefault();
	gallery.innerHTML = '';
	page = 1;
	const search = e.currentTarget.elements.searchQuery.value.trim();
	lastSearch = search;
	btnLoadMore.style.display = 'none';
	if (search == '') {
		Notify.failure("Please  fill in the field and try again.");
	} else {
		fetchPhotos(search,page)
			.then(response => {
				console.log(response);
				if (response.data.hits.length == 0) {
					Notify.failure("Sorry, there are no images matching your search query. Please try again.");
				} else {
					Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
					createCardList(response.data.hits);
					lightbox.refresh();
					btnLoadMore.style.display = 'block';
				}
			})
			.catch(error => {
				console.log('error', error.message);
			})
		
	}
})
btnLoadMore.addEventListener('click', () => {
	page += 1;
	btnLoadMore.style.display = 'none';
	fetchPhotos(lastSearch,page)
		.then(response => {
			let totalPage = response.data.totalHits / response.data.hits.length;
			if (totalPage <= page) {
				btnLoadMore.style.display = 'none';
				Notify.failure("We're sorry, but you've reached the end of search results.");
			} else {
				console.log(response);
				appendCardList(response.data.hits);
				lightbox.refresh();
				btnLoadMore.style.display = 'block';
			}
		})
		.catch(error => {
			console.log('error', error.message);
		})
})

function createCardList(list) {
    gallery.innerHTML = createMarkupList(list);
}
function appendCardList(list) {
    gallery.insertAdjacentHTML('beforeend',createMarkupList(list)); 
}
function createMarkupListItem(item) {
	return`<div class="photo-card"><div class="photo-card-img"><a  href=${item.largeImageURL}>
  <img src=${item.webformatURL} alt="${item.tags}" loading="lazy" /></a></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${item.downloads}
    </p>
  </div>
</div>`;
}
function createMarkupList(list) {
	const markup = list.map(item => createMarkupListItem(item)).join('');
	return markup;
}
















  
