import img from '../../images/error.gif';

import css from './NotFound.module.css';

export const NotFound = ({ className, title }) => (
  <>
    {title ? (
      <p className={css.errorText}>{title}</p>
    ) : (
      <img className={className || css.error} src={img} alt="Error" />
    )}
  </>
);
