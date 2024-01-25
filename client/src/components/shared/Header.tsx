import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    e.preventDefault();
    navigate('/login');
  };
  return (
    <header className="flex justify-between">
      <h1 className="text-primary-300 font-bold">React_Golang App!</h1>
      <Link to="/" className="flex items-center gap-1">
        <button onClick={handleClick} className="btn btn-link">
          Login
        </button>
      </Link>
    </header>
  );
};

export default Header;
