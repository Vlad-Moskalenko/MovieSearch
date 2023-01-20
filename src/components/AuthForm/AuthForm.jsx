import { useState } from 'react';

import css from './AuthForm.module.css';

export const AuthForm = ({ title, handleSubmit, children }) => {
  const [userData, setUserData] = useState({});

  const handleChange = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    handleSubmit(userData);
  };

  return (
    <div className={css.modalWindow}>
      <form className={css.authForm} onSubmit={onSubmit}>
        <label className={css.authField}>
          Email
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={userData.email}
          />
        </label>
        <label className={css.authField}>
          Password
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userData.password}
          />
        </label>
        <button type="submit">{title}</button>
      </form>
      {children}
    </div>
  );
};
