import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemLi, Image } from './Gallery.styled';

const ImageGalleryItem = ({ imageUrl, onClick }) => (
  <ImageGalleryItemLi>
    <Image src={imageUrl} alt="" onClick={onClick} />
  </ImageGalleryItemLi>
);

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
