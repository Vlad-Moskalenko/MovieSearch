import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import img404 from '../../images/404.jpg';

import { Spinner } from 'components';
import { selectMovieCast } from 'redux/selectors';
import { getMovieCast } from 'redux/operations';

import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const { cast, status } = useSelector(selectMovieCast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieCast(movieId));
    }
  }, [dispatch, movieId]);

  return (
    <>
      {status === 'success' && cast.length > 0 && (
        <ul className={css.castList}>
          {cast.map(({ id, name, profile_path, character }) => (
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
      )}
      {(status === 'error' || cast.length === 0) && (
        <div className={css.empty}>Can't find information about cast...</div>
      )}
      {status === 'loading' && <Spinner size="80" />}
    </>
  );
};

export default Cast;
