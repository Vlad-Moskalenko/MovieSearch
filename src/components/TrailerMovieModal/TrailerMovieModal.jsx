import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import css from './TrailerMovieModal.module.css';
import { closeModal } from 'redux/movieDetails/movieDetailsSlice';

import { NotFound, Spinner } from 'components';

export const TrailerMovieModal = () => {
  const { trailerData, status, isModal } = useSelector(
    state => state.movieDetails.movieTrailer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener('keydown', closeTrailerModal);

    return () => {
      document.removeEventListener('keydown', closeTrailerModal);
    };
    //eslint-disable-next-line
  }, []);

  const closeTrailerModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  const modalRoot = document.querySelector('#modal-root');

  return createPortal(
    <>
      {status === 'success' && isModal && (
        <div onClick={closeTrailerModal} className={css.backdrop}>
          <div className={css.modalWindow}>
            <h3 className={css.visuallyHidden}>{trailerData.name}</h3>
            <iframe
              className={css.modalTrailer}
              src={`https://www.youtube.com/embed/${trailerData.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={trailerData.name}
            ></iframe>
          </div>
        </div>
      )}

      {status === 'error' && <NotFound />}

      {status === 'loading' && <Spinner />}
    </>,
    modalRoot
  );
};
