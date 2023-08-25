import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../Gallery/ImageGalleryItem';
import { ImageGalleryWrapper } from './Gallery.styled';

const ImageGallery = ({ images, onItemClick }) => (
  <ImageGalleryWrapper>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        imageUrl={image.webformatURL}
        onClick={() => onItemClick(image.largeImageURL)}
      />
    ))}
  </ImageGalleryWrapper>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;
