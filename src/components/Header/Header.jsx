import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import css from './Header.module.css';
import { removeUser, toggleModal } from 'redux/auth/authSlice';
import { clearLibraryMovies } from 'redux/library/librarySlice';
import { RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';

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
      {(location.pathname === '/' || location.pathname === '/library') && (
        <SearchField />
      )}
      <button
        className={isAuth ? css.logoutBtn : css.loginBtn}
        type="button"
        onClick={handleClickLogBtn}
      >
        {isAuth ? (
          <RiLogoutBoxFill title="Logout" size="35px" />
        ) : (
          <RiLoginBoxFill title="Login" size="35px" />
        )}
      </button>
    </header>
  );
};
