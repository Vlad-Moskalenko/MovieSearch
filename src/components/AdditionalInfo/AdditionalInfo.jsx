// import css from './AdditionalInfo.module.css'
import { NavLink, Outlet } from 'react-router-dom';

export const AdditionalInfo = ({ location }) => {
  return (
    <div>
      <h3>Additional information</h3>
      <ul>
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
      <Outlet />
    </div>
  );
};
