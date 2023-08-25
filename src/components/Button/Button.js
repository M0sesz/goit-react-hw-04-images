import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

const Button = ({ onClick, hasMoreImages }) => (
  <LoadMoreBtn type="button" onClick={onClick}>
    Load more
  </LoadMoreBtn>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasMoreImages: PropTypes.bool.isRequired,
};

export default Button;
