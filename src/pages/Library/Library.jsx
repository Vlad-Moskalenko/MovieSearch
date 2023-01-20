import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Library = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  return isAuth ? <h2>Hello</h2> : <Navigate to="/login" />;
};

export default Library;
