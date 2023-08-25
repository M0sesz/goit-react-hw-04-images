import axios from 'axios';

export const fetchImages = (query, currentPage) => {
  const apiKey = '38182366-be3024add4069e03dd1880ded';
  const apiUrl = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios
    .get(apiUrl)
    .then(response => {
      const { hits, totalHits } = response.data;
      return {
        images: hits,
        totalPages: Math.ceil(totalHits / 12),
      };
    })
    .catch(error => {
      throw error;
    });
};
