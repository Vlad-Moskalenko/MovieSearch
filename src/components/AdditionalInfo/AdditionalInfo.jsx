// import css from './AdditionalInfo.module.css'
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Spinner } from 'components';

import css from './AdditionalInfo.module.css';

export const AdditionalInfo = ({ location }) => {
  return (
    <details className={css.movieMetaDetails}>
      <summary className={css.title}>Additional information</summary>
      <ul className={css.metaDetails}>
        <li>
          <NavLink to="cast" state={{ from: location }}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" state={{ from: location }}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Spinner size="80" />}>
        <Outlet />
      </Suspense>
    </details>
  );
};
