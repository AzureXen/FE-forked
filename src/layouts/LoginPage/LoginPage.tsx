// LoginPage.tsx
import React, { useEffect, useState } from "react";
import AuthService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import "../../css/loginStyle.css";
import image from "../../images/loginIMG.jpg";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
  } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/")
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const loginRequest = { username, password };

    try {
      const response = await AuthService.login(loginRequest);
      if ("user_id" in response) {
        localStorage.setItem("user", JSON.stringify(response));
        setMessage("Login successful!");
        showToast("Login successful!", 'success');
        navigate("/");
      } else {
        setMessage(response.message);
        showToast(response.message, 'error');
      }
    } catch (error) {
      setMessage("Incorrect Password or UserName");
      showToast("Incorrect Password or UserName", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-lg-flex half" id="LoginPage">
      <div className="position-absolute top-0 end-0">
        <div id="gradient" className="z-3"></div>
        <img className="z-2" id="login-img" src={image} alt="" />
      </div>
      <div id="login-form" className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7 col-xs-7">
              <h3>Login to <strong>InternBridge</strong></h3>
              <p id="login-p" className="mb-4">Please login your account to system!!!</p>
              <form onSubmit={handleLogin}>
                <div className="form-group first">
                  <label htmlFor="username"><h2>Username</h2></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="your-email@gmail.com"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group last mb-3 mt-4">
                  <label htmlFor="password"><h2>Password</h2></label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex mb-5 align-items-center d-flex justify-content-between">
                  <label className="control control--checkbox mb-0">
                    <span className="caption">Remember me</span>
                    <input type="checkbox" />
                    <div className="control__indicator"></div>
                  </label>
                 <Link to="/forgotPassword" className="forgot-pass">Forgot Password</Link>
                </div>
                {message && <p className="message" id="message">{message}</p>}
                <button type="submit" className="btn btn-block btn-primary">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
