import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import css from './Header.module.css';
import { removeUser, toggleModal } from 'redux/auth/authSlice';
import { clearLibraryMovies } from 'redux/library/librarySlice';
import { useLocation } from 'react-router-dom';

import { SearchField } from 'components';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const location = useLocation();

  const handleClickLogBtn = () => {
    if (isAuth) {
      dispatch(removeUser());
      dispatch(clearLibraryMovies());
      return;
    }

    dispatch(toggleModal(true));
  };

  return (
    <header className={css.header}>
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
              to="/library"
            >
              Library
            </NavLink>
          </li>
        </ul>
      </nav>
      {location.pathname === '/' && <SearchField />}
      <button className={css.logBtn} type="button" onClick={handleClickLogBtn}>
        {isAuth ? 'Logout' : 'Login'}
      </button>
    </header>
  );
};
