import img from '../../images/error.gif';

import css from './NotFound.module.css';

export const NotFound = ({ className }) => (
  <img className={className || css.error} src={img} alt="Error" />
);
