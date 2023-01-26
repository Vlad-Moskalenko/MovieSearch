import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';

import { AuthForm } from 'components';
import { googleAuth, logIn, register } from 'redux/auth/operations';

import css from './AuthModal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const AuthModal = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = ({ email, password }) => {
    if (isRegister) {
      dispatch(register({ email, password }));
    }

    if (!isRegister) {
      dispatch(logIn({ email, password }));
    }
  };

  const handleGoogleAuth = () => {
    dispatch(googleAuth());
  };

  return createPortal(
    <>
      {isRegister ? (
        <AuthForm title="Register" handleSubmit={handleSubmit}>
          <p>
            Already have an account?
            <button onClick={() => setIsRegister(false)} type="button">
              Login
            </button>
          </p>
        </AuthForm>
      ) : (
        <AuthForm title="Login" handleSubmit={handleSubmit}>
          <button
            className={css.googleAuthBtn}
            onClick={handleGoogleAuth}
            type="button"
            disabled={status === 'loading' ? true : false}
          >
            <FcGoogle /> Continue with Google
          </button>
          <p>
            Don`t have an account?
            <button onClick={() => setIsRegister(true)} type="button">
              Register
            </button>
          </p>
        </AuthForm>
      )}
    </>,
    modalRoot
  );
};
