import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ModalOverlay,
  ModalContent,
  ModalImage,
  CloseButton,
} from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleBackdropClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleBackdropClick);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onRequestClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onRequestClose();
    }
  };

  render() {
    const { isOpen, onRequestClose, selectedImage } = this.props;

    return (
      <ModalOverlay isOpen={isOpen} onClick={this.handleBackdropClick}>
        <ModalContent>
          <CloseButton onClick={onRequestClose}>Close</CloseButton>
          {selectedImage && <ModalImage src={selectedImage} alt="" />}
        </ModalContent>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  selectedImage: PropTypes.string,
};

export default Modal;
