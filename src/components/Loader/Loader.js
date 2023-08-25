import React from 'react';
import PropTypes from 'prop-types';
import { TailSpin as LoaderSpinner } from 'react-loader-spinner';

import { LoaderContainer } from './Loader.styled';

const Loader = ({ isLoading }) => (
  <LoaderContainer>
    <LoaderSpinner
      type="TailSpin"
      color="#00BFFF"
      height={80}
      width={80}
      visible={isLoading}
    />
  </LoaderContainer>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
