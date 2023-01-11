import { NavLink } from 'react-router-dom';

import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={`${css.header} ${css.headerHome}`}>
      <nav className={css.navigation}>
        <NavLink
          className={({ isActive }) => (isActive ? css.active : undefined)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? css.active : undefined)}
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
