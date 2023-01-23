import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toggleModal } from 'redux/features/authSlice';

import css from './AuthForm.module.css';

export const AuthForm = ({ title, handleSubmit, children }) => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  const handleChange = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    handleSubmit(userData);
  };

  const closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      dispatch(toggleModal());
    }
  };

  return (
    <div className={css.backdrop} onClick={closeModal}>
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
          <button className={css.submitBtn} type="submit">
            {title}
          </button>
        </form>
        {children}
      </div>
    </div>
  );
};
