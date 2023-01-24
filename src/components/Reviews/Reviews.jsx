import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMovieReviews } from 'redux/operations';
import { selectMovieReviews } from 'redux/selectors';

import css from './Reviews.module.css';

import { Spinner } from 'components';

const Reviews = () => {
  const { movieId } = useParams();
  const { reviews, status } = useSelector(selectMovieReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieReviews(movieId));
    }
  }, [movieId, dispatch]);

  return (
    <div className={css.reviewsWrapper}>
      {status === 'success' &&
        (reviews.length > 0 ? (
          <ul className={css.reviewsList}>
            {reviews.map(({ id, author, content, created_at }) => (
              <li key={id}>
                <p className={css.reviewsMeta}>
                  {author}{' '}
                  <span>{new Date(created_at).toLocaleDateString()}</span>
                </p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={css.empty}>No reviews...</div>
        ))}
      {status === 'error' && (
        <div className={css.empty}>
          Haven't any information about reviews...
        </div>
      )}
      {status === 'loading' && <Spinner size="80" />}
    </div>
  );
};

export default Reviews;
