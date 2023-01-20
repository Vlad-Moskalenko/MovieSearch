import { AuthForm } from 'components';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from 'redux/features/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = ({ email, password }) => {
    const auth = getAuth();
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
        navigate('/library');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <main>
      <AuthForm title="Register" handleSubmit={handleRegister}>
        <p>
          Already have an account?
          <span>
            <Link to="/login"> Login </Link>
          </span>
        </p>
      </AuthForm>
    </main>
  );
};

export default Register;
