import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleModal } from 'redux/auth/authSlice';

import css from './AuthForm.module.css';

export const AuthForm = ({ title, handleSubmit, children }) => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === 'error' && errorMessage) {
      Notify.failure(errorMessage);
    }
  }, [status, errorMessage]);

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
              placeholder="example@email.com"
              required
            />
          </label>
          <label className={css.authField}>
            Password
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={userData.password}
              placeholder="at least 6 characters"
              required
            />
          </label>
          <button
            className={css.submitBtn}
            type="submit"
            disabled={status === 'loading' ? true : false}
          >
            {title}
          </button>
        </form>
        {children}
      </div>
    </div>
  );
};
