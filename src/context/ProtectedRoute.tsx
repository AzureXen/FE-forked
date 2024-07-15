import Cookies from 'js-cookie';
import { setuid } from 'process';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
  
    useEffect(() => {
      const storedUser = Cookies.get("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setRole(parsedUser.role);
        setUserId(parsedUser.user_id);
        console.log("user ne: " + parsedUser.role);
      }
    }, []);
  
    const hasAccess = allowedRoles.includes(role);
    console.log("ProtectedRoute - Role:", role, "AllowedRoles:", allowedRoles, "HasAccess:", hasAccess, "User id: " + userId);
  
    if (user === null) {
      // Render a loading state while waiting for useEffect to complete
      return <div>Loading...</div>;
    }
  
    return hasAccess ? <Outlet /> : <Navigate to="/home" />;
  };

export default ProtectedRoute;
