import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  const [isModalOpe, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = image => {
    setIsModalOpen(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <li key={image.id} className={css.galleryItem}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => openModal(image)}
        />
      </li>
      {selectedImage && (
        <Modal
          largeImageURL={selectedImage.largeImageURL}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
