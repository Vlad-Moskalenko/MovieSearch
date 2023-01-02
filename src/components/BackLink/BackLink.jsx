import { NavLink } from 'react-router-dom';

import css from './BackLink.module.css';

export const BackLink = ({ location }) => (
  <NavLink className={css.backLink} to={location}>
    Go Back
  </NavLink>
);
