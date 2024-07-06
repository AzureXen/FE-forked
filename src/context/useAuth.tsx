import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

interface User {
  role: string;
}

const useAuth = (allowedRoles: string[]) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!allowedRoles.includes(parsedUser.role)) {
        showToast("You aren't permitted to access", 'warn');
        navigate('/');
      } else {
        setUser(parsedUser);
      }
    } else {
      navigate('/login');
    }
  }, []); // Removed dependencies

  return user;
};

export default useAuth;
