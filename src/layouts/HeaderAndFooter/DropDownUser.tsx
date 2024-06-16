import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import AuthService from '../../service/AuthService';
import { Link } from 'react-router-dom';

export const DropDownUser : React.FC<{ user: { fullName: string } | null, setUser: React.Dispatch<React.SetStateAction<{ fullName: string } | null>> }> = ({ user, setUser })=>{
    const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
    navigate("/home");
    showToast("Logout successful!", 'success');
  };
    return (
        <div>
        {user ? (
          <div>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdown04"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Hello, {user.fullName}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown">
              <Link
                onClick={handleLogout}
                className="nav-item cta-btn dropdown-item btn btn-mod btn-border btn-circle btn-large"
                id="button-sign-out"
                to="/"
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <li className="nav-item cta-btn">
            <Link
              type="button"
              className="btn btn-mod btn-border btn-circle btn-large"
              id="button-sign-in"
              to="/login"
            >
              Sign In
            </Link>
          </li>
        )}
      </div>
  )
}
