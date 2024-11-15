import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setIsAuth(false);
    navigate('/login');
  }, [setIsAuth, navigate]);

  return null;
}

export default Logout;
