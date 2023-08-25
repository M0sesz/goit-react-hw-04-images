import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './Gallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './api'; // Імпорт функції з api.js

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);

    fetchImages(query, currentPage)
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.images]);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

export default App;
