import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import css from './Reviews.module.css';

import { movieApi } from 'services/api';

import { Spinner } from 'components';

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
      {status === 'pending' && <Spinner size="80" />}
    </div>
  );
};
