import { NavLink } from 'react-router-dom';

export const BackLink = ({ location }) => (
  <NavLink to={location}>Go Back</NavLink>
);
