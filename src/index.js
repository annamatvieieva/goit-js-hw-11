import fetchPhotos from './fetchPhotos.js';
import { Notify } from 'notiflix';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let page = 1;
let lastSearch = '';
btnLoadMore.style.display = 'none';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	gallery.innerHTML = '';
	page = 1;
	const search = e.currentTarget.elements.searchQuery.value;
	lastSearch = search;
	btnLoadMore.style.display = 'none';
	if (search == '') {
		Notify.failure("Please  fill in the field and try again.");
	} else {
		fetchPhotos(search,page)
			.then(response => {
				console.log(response);
				if (response.hits.length == 0) {
					Notify.failure("Sorry, there are no images matching your search query. Please try again.");
				} else {
					createCardList(response.hits);
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
			console.log(response);
			appendCardList(response.hits);
			btnLoadMore.style.display = 'block';
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
	return`<div class="photo-card">
  <img src=${item.webformatURL} alt="${item.tags}" loading="lazy" />
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




  
