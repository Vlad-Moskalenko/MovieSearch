import { NavLink } from 'react-router-dom';

import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={`${css.header} ${css.headerHome}`}>
      <nav className={css.navigation}>
        <NavLink to="filmoteka-React/">Home</NavLink>
        <NavLink to="filmoteka-React/movies">Movies</NavLink>
      </nav>
    </header>
  );
};
