import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'redux/features/authSlice';

const Library = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const { email, password } = useSelector(state => state.auth.user);
  const dispatch = useDispatch(setUser());

  useEffect(() => {
    if (email && password) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        dispatch(
          setUser({
            isAuth: true,
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
      });
    }
  }, [dispatch, email, password]);

  return isAuth ? <h2>Hello</h2> : <Navigate to="/login" />;
};

export default Library;
