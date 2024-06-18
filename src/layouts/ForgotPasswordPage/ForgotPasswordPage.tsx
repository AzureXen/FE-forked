import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import image from "../../images/loginIMG.jpg";
import { activate } from "../../apis/ApiActivateAccount";

export const ForgotPasswordPage: React.FC = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const userName = searchParams.get('username');

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!code || !userName || !password) {
            setMessage("Invalid activation link");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        const activateRequest = { code, userName, password };

        try {
            const response = await activate(activateRequest.code, activateRequest.userName, activateRequest.password);
            showToast(response, "success");
            navigate("/home");
        } catch (error) {
            setMessage("Error changing password");
            showToast("Error changing password", 'error');
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
                            <h3>Change Your Password</h3>
                            <p id="login-p" className="mb-4">Please change your password right now</p>
                            <form onSubmit={handlePasswordChange}>
                                <div className="form-group first">
                                    <label htmlFor="password"><h2>New Password</h2></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="New Password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group last mb-3 mt-4">
                                    <label htmlFor="confirmPassword"><h2>Confirm Password</h2></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {message && <p className="message" id="message">{message}</p>}
                                <button type="submit" className="btn btn-block btn-primary">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
