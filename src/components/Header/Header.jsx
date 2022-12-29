import { NavLink } from 'react-router-dom';

import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={`${css.header} ${css.headerHome}`}>
      <nav className={css.navigation}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </header>
  );
};
