import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './Gallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import axios from 'axios';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = () => {
    const apiKey = '38182366-be3024add4069e03dd1880ded';
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    setIsLoading(true);

    axios
      .get(apiUrl)
      .then(response => {
        const { hits, totalHits } = response.data;
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalPages(Math.ceil(totalHits / 12));
      })
      .catch(error => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    fetchImages();
  }, [query, currentPage]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setCurrentPage(1);
    setImages([]);
    setTotalPages(0);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && currentPage < totalPages && (
        <Button onClick={handleLoadMore} />
      )}

      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={handleCloseModal}
        contentLabel="Image Modal"
        selectedImage={selectedImage}
      />
    </div>
  );
};
