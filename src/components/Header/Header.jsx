import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import css from './Header.module.css';
import { removeUser } from 'redux/features/authSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);

  const handleLogOut = () => {
    dispatch(removeUser());
  };

  return (
    <header>
      <nav>
        <ul className={css.navigationList}>
          <li className={css.navigationItem}>
            <NavLink
              className={({ isActive }) => (isActive ? css.active : undefined)}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className={css.navigationItem}>
            <NavLink
              className={({ isActive }) => (isActive ? css.active : undefined)}
              to="/movies"
            >
              Movies
            </NavLink>
          </li>
          <li className={css.navigationItem}>
            <NavLink
              className={({ isActive }) => (isActive ? css.active : undefined)}
              to="/library"
            >
              Library
            </NavLink>
          </li>
          {!isAuth && (
            <li className={css.navigationItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css.active : undefined
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {isAuth && (
        <button type="button" onClick={handleLogOut}>
          Log out
        </button>
      )}
    </header>
  );
};
