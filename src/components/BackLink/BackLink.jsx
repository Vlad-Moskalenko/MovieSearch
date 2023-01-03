import { NavLink } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import css from './BackLink.module.css';

export const BackLink = ({ location }) => (
  <NavLink className={css.backLink} to={location}>
    <MdOutlineArrowBackIosNew /> Go Back
  </NavLink>
);
