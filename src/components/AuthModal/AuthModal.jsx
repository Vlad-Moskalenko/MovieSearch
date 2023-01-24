import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useState } from 'react';

import { setUser } from 'redux/features/authSlice';
import { auth } from 'firebase.js';

import { AuthForm } from 'components';

const modalRoot = document.querySelector('#modal-root');

export const AuthModal = () => {
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);

  const handleSubmit = ({ email, password }) => {
    if (register) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(
            setUser({
              isAuth: true,
              email: user.email,
              id: user.uid,
              token: user.accessToken,
            })
          );
          return user;
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (!register) {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(
            setUser({
              isAuth: true,
              email: user.email,
              id: user.uid,
              token: user.accessToken,
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          setUser({
            isAuth: true,
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return createPortal(
    <>
      {register ? (
        <AuthForm title="Register" handleSubmit={handleSubmit}>
          <p>
            Already have an account?
            <button onClick={() => setRegister(false)} type="button">
              Login
            </button>
          </p>
        </AuthForm>
      ) : (
        <AuthForm title="Login" handleSubmit={handleSubmit}>
          <button onClick={handleGoogleAuth} type="button">
            Continue with Google
          </button>
          <p>
            Don`t have an account?
            <button onClick={() => setRegister(true)} type="button">
              Register
            </button>
          </p>
        </AuthForm>
      )}
    </>,
    modalRoot
  );
};
