import css from './MovieDetailsMeta.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NotFound } from 'components';
import { addMovie, deleteMovie } from 'redux/operations';
import { useEffect, useState } from 'react';

export const MovieDetailsMeta = ({ movieDetails, children }) => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.library.movies);
  const isAuth = useSelector(state => state.auth.isAuth);
  const [isLibraryMovie, setIsLibraryMovie] = useState('');
  const navigate = useNavigate();

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
    if (movies.find(movie => movie.id === id)) {
      setIsLibraryMovie(true);
    }
  }, [id, movies]);

  const handleClickBtn = movieDetails => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!isLibraryMovie) {
      dispatch(addMovie(movieDetails));
      setIsLibraryMovie(true);
    } else if (isLibraryMovie) {
      dispatch(deleteMovie(movieDetails.id));
      setIsLibraryMovie(false);
    }
  };

  return (
    <article className={css.movieMetaWrapper}>
      <div className={css.moviePosterWrapper}>
        {poster_path ? (
          <img
            className={css.moviePoster}
            src={`https://image.tmdb.org/t/p/w500/${
              poster_path || backdrop_path
            }`}
            alt={title || original_title}
          />
        ) : (
          <NotFound className={css.moviePoster} />
        )}
        <button
          onClick={e => handleClickBtn(movieDetails)}
          className={css.addLibraryBtn}
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
