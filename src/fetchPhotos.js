import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios');
const fetchParameters = {
	key: '28549045-19dd42d100d5a5d31ac498ed5',
	image_type: 'photo',
	orientation: "horizontal",
	safesearch: 'true',
	per_page: 40
}

const fetchPhotos = async (q, page) => {
	const photos = await axios.get(`${BASE_URL}?key=${fetchParameters.key}&q=${q}&image_type=${fetchParameters.image_type}&orientation=${fetchParameters.orientation}&safesearch=${fetchParameters.safesearch}&per_page=${fetchParameters.per_page}&page=${page}`);
	// const photosCards = await photos.json();
	return photos;
};

export default fetchPhotos;