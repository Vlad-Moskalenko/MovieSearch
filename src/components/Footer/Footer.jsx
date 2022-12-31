import css from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <p>
        <small className={css.copyrights}>© 2020 | All Rights Reserved</small>
      </p>
    </footer>
  );
};
