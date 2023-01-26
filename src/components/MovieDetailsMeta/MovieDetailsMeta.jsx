import css from './MovieDetailsMeta.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { BsPlayCircle } from 'react-icons/bs';

import { NotFound } from 'components';
import { addMovie, deleteMovie } from 'redux/library/operations';
import { toggleModal } from 'redux/auth/authSlice';
import { getMovieTrailer } from 'redux/movieDetails/operations';

export const MovieDetailsMeta = ({ children }) => {
  const dispatch = useDispatch();
  const { libraryMovies, status } = useSelector(state => state.library);
  const isAuth = useSelector(state => state.auth.isAuth);
  const userId = useSelector(state => state.auth.user.id);
  const movieDetails = useSelector(state => state.movieDetails.movieDetails);
  const [isLibraryMovie, setIsLibraryMovie] = useState('');

  const {
    id,
    title,
    original_title,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    overview,
    genres,
  } = movieDetails;

  useEffect(() => {
    if (libraryMovies.find(movie => movie.id === id)) {
      setIsLibraryMovie(true);
    }
  }, [id, libraryMovies]);

  const handleClickBtn = movieDetails => {
    if (!isAuth) {
      dispatch(toggleModal(true));
      return;
    }
    if (!isLibraryMovie) {
      dispatch(addMovie({ userId: userId, movieData: movieDetails }));
      setIsLibraryMovie(true);
    } else if (isLibraryMovie) {
      dispatch(deleteMovie({ userId: userId, movieId: movieDetails.id }));
      setIsLibraryMovie(false);
    }
  };

  const handleClickPlayBtn = () => {
    dispatch(getMovieTrailer(id));
  };

  return (
    <article className={css.movieMetaWrapper}>
      <div className={css.moviePosterWrapper}>
        <button
          onClick={handleClickPlayBtn}
          className={css.playTrailerBtn}
          type="button"
        >
          <BsPlayCircle size="100" />
        </button>
        {poster_path ? (
          <img
            className={css.moviePoster}
            src={`https://image.tmdb.org/t/p/w500/${
              poster_path || backdrop_path
            }`}
            alt={title || original_title}
            height="65vh"
          />
        ) : (
          <NotFound className={css.moviePoster} />
        )}
        <button
          onClick={e => handleClickBtn(movieDetails)}
          className={css.addLibraryBtn}
          disabled={status === 'loading' ? true : false}
        >
          {isLibraryMovie ? 'REMOVE FROM LIBRARY' : 'ADD TO LIBRARY'}
        </button>
      </div>
      <div>
        <ul className={css.movieMeta}>
          <li className={css.movieMetaItem}>
            <h2 className={css.movieTitle}>
              {title || 'unknown'} |{' '}
              {Number.parseInt(release_date) || 'unknown'}
              <span className={css.movieRating}>
                {vote_average?.toFixed(1)}
              </span>
            </h2>
          </li>
          <li className={css.movieMetaItem}>
            <h3>Overview</h3>
            <p>{overview || 'Can`t find overview...'}</p>
          </li>
          <li className={css.movieMetaItem}>
            <h3>Genres</h3>
            <p>
              {genres?.length > 0
                ? genres.map(genre => genre.name).join(', ')
                : 'Unknown genre'}
            </p>
          </li>
        </ul>
        {children}
      </div>
    </article>
  );
};
