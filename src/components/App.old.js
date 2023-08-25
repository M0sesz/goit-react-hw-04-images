import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './Gallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import axios from 'axios';

class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    selectedImage: null,
    totalPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = prevState;
    const { query: currentQuery } = this.state;

    if (prevQuery !== currentQuery) {
      this.setState({ images: [], currentPage: 1, totalPages: 0 }, () => {
        this.fetchImages();
      });
    } else if (prevState.currentPage !== this.state.currentPage) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ currentPage: prevState.currentPage + 1 }),
      this.fetchImages
    );
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  fetchImages = () => {
    const { query, currentPage } = this.state;
    const apiKey = '38182366-be3024add4069e03dd1880ded';
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    axios
      .get(apiUrl)
      .then(response => {
        const { hits, totalHits } = response.data;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalPages: Math.ceil(totalHits / 12),
        }));
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { images, isLoading, selectedImage, currentPage, totalPages } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onItemClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && currentPage < totalPages && (
          <Button onClick={this.handleLoadMore} />
        )}

        <Modal
          isOpen={selectedImage !== null}
          onRequestClose={this.handleCloseModal}
          contentLabel="Image Modal"
          selectedImage={selectedImage}
        />
      </div>
    );
  }
}
