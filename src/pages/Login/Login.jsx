import { AuthForm } from 'components';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from 'redux/features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    const auth = getAuth();

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

        navigate('/library');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <main>
      <AuthForm title="Login" handleSubmit={handleLogin}>
        <p>
          Don`t have an account?
          <span>
            <Link to="/register"> Register </Link>
          </span>
        </p>
      </AuthForm>
    </main>
  );
};

export default Login;
