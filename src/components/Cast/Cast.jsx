import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import img404 from '../../images/404.jpg';

import css from './Cast.module.css';

import { movieApi } from 'services/api';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(0);

  useEffect(() => {
    movieApi.getMovieCredits(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
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
      ) : (
        <div className={css.empty}>Can't find information about cast...</div>
      )}
    </>
  );
};
