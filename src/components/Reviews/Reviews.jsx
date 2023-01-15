import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMovieReviews } from 'redux/operations';
import { selectMovieReviews } from 'redux/selectors';

import css from './Reviews.module.css';

import { Spinner } from 'components';

const Reviews = () => {
  const { movieId } = useParams();
  const { reviews, isLoading, error } = useSelector(selectMovieReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieReviews(movieId));
    }
  }, [movieId, dispatch]);

  return (
    <div className={css.reviewsWrapper}>
      {!error && reviews.length > 0 && (
        <ul className={css.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={css.author}>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <div className={css.empty}>No reviews...</div>}
      {isLoading && <Spinner size="80" />}
    </div>
  );
};

export default Reviews;
