import { useState, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

const App = () => {
  const [searchName] = useState('');
  const [images, setImages] = useState([]);
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const searchNameRef = useRef('');

  const formSubmitHandler = searchName => {
    setIsLoading(true);
    setIsVisible(true);
    setPage(1);
    searchNameRef.current = searchName;

    fetch(
      `https://pixabay.com/api/?q=${searchName}&page=1&key=34736724-43de875ebed23001707db1297&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then(res => res.json())
      .then(data => {
        setImages(
          data.hits.map(image => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          }))
        );
        setIsLoading(false);
      });
  };

  const onAddImages = () => {
    const nextPage = page + 1;
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${searchNameRef.current}&page=${nextPage}&key=34736724-43de875ebed23001707db1297&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then(res => res.json())
      .then(data => {
        setImages(prevImages => [
          ...prevImages,
          ...data.hits.map(image => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          })),
        ]);
        setPage(nextPage);
        setIsLoading(false);
      });
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery searchName={searchName} perPage={perPage} images={images} />
      <ToastContainer autoClose={3000} theme="colored" />
      {isLoading && <Loader />}
      {isVisible && images.length % perPage === 0 && images.length > 0 && (
        <Button onClick={onAddImages} isVisible={isVisible} />
      )}
    </div>
  );
};

export default App;
