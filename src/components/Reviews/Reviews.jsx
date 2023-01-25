import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMovieReviews } from 'redux/movieDetails/operations';

import css from './Reviews.module.css';

import { Spinner } from 'components';

const Reviews = () => {
  const { movieId } = useParams();
  const { reviewsList, status } = useSelector(
    state => state.movieDetails.reviews
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieReviews(movieId));
    }
  }, [movieId, dispatch]);

  return (
    <div className={css.reviewsWrapper}>
      {status === 'success' &&
        (reviewsList.length > 0 ? (
          <ul className={css.reviewsList}>
            {reviewsList.map(({ id, author, content, created_at }) => (
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
