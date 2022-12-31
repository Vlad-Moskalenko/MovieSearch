import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import css from './Reviews.module.css';

import { movieApi } from 'services/api';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    movieApi
      .getMovieReviews(movieId)
      .then(({ results }) => setReviews(results));
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 && (
        <ul className={css.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={css.author}>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
