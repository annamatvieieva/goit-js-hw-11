import SimpleLightbox from "simplelightbox";
import  "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const gallery = document.querySelector(".gallery");
const markup = createMarkup(galleryItems)

gallery.innerHTML = markup;

function createMarkup(items) {
  return items
    .map((item) => {
    let itemMarkup = `<a class="gallery__item" href=${item.original}>
			  <img class="gallery__image" src=${item.preview} alt=${item.description} />
			</a>`;
    return itemMarkup;
    })
    .join("");
}

new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 250,
});

