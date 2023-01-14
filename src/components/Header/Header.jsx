import { NavLink } from 'react-router-dom';

import css from './Header.module.css';

export const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};
