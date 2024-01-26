import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { JwtContext } from '../../context/JwtContext';

const Header = () => {
  const navigate = useNavigate();
  const { jwtToken, setJwtToken, invokeRefreshToken } = useContext(JwtContext);

  const handleLogin = (e: any) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleLogOut = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/logout');
      setJwtToken('');
      invokeRefreshToken(false);
      alert('logged-out successfully');
      navigate('/');
    } catch (err) {
      alert(`Failed to logout: ${err}`);
    }
  };

  return (
    <header className="flex justify-between">
      <h1 className="text-primary-300 font-bold">React_Golang App!</h1>
      {jwtToken === '' ? (
        <Link to="/" className="flex items-center gap-1">
          <button onClick={handleLogin} className="btn btn-link">
            Login
          </button>
        </Link>
      ) : (
        <Link to="/" className="flex items-center gap-1">
          <button onClick={handleLogOut} className="btn btn-link-out">
            Logout
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
