import css from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <p>
        <small className={css.copyright}>
          © 2020 | All Rights Reserved | Developed with by{' '}
          <span>GoIT Students</span>
        </small>
      </p>
    </footer>
  );
};
