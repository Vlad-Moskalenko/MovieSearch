import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Spinner } from 'components';

import { getMovieCast } from 'redux/movieDetails/operations';

import css from './Cast.module.css';
import img404 from '../../images/404.jpg';

const Cast = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const { castList, status } = useSelector(state => state.movieDetails.cast);

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieCast(movieId));
    }
  }, [dispatch, movieId]);

  return (
    <>
      {status === 'success' &&
        (castList.length > 0 ? (
          <ul className={css.castList}>
            {castList.map(({ id, name, profile_path, character }) => (
              <li className={css.castItem} key={id}>
                <img
                  className={css.castAvatar}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : img404
                  }
                  alt={name || 'unknown'}
                  width="100px"
                />
                <div className={css.castMeta}>
                  <p>
                    <span>Actor:</span>
                    {name || 'unknown'}
                  </p>
                  <p>
                    <span>Character:</span>
                    {character || 'unknown'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={css.empty}>Can't find information about cast...</div>
        ))}

      {status === 'error' && (
        <div className={css.empty}>Haven't any information about cast...</div>
      )}

      {status === 'loading' && <Spinner size="80" />}
    </>
  );
};

export default Cast;
