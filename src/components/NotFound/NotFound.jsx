import css from './NotFound.module.css';

export const NotFound = ({ className, title }) => (
  <>
    {title ? (
      <p className={css.errorText}>{title}</p>
    ) : (
      <div className={`${css.errorWrapper} ${className || css.error}`}>
        <div className={css.eyes}>
          <div className={css.eyesPosition}></div>
          <div className={css.eyesPosition}></div>
        </div>
        <div className={css.textError}></div>
      </div>
    )}
  </>
);
