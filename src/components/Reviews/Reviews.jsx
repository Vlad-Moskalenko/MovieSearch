import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';

import css from './Reviews.module.css';

import { movieApi } from 'services/api';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('success');

  useEffect(() => {
    setStatus('pending');

    movieApi
      .getMovieReviews(movieId)
      .then(({ results }) => {
        setReviews(results);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [movieId]);

  return (
    <div className={css.reviewsWrapper}>
      {status === 'success' && reviews.length > 0 && (
        <ul className={css.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={css.author}>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {status === 'error' && <div className={css.empty}>No reviews...</div>}
      {status === 'pending' && (
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{ display: 'block', margin: 'auto' }}
          wrapperClass=""
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      )}
    </div>
  );
};
