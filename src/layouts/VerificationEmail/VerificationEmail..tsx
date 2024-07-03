import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Loading } from "../Loading/Loading";
import { ApiVerifyCodeForgotPassword } from "../../apis/ApiVerifyCodeForgotPassword";
import "../../css/loadingInForgotPage.css";
import { SuccessPage } from "../SuccessPage/SuccessPage";
import { ApiVerifyEmail } from "../../apis/Verification/ApiVerifyEmail";

export const VerificationEmail: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchParams] = useSearchParams();
    const verifyEmail = searchParams.get('code');

    useEffect(() => {
        const verifyCode = async () => {
            setLoading(true);
            try {
                if (verifyEmail != null) {
                    const response = await ApiVerifyEmail(verifyEmail);
                } else {
                    navigate("*");
                }
            } catch (error) {
                showToast("There's something to verify email", 'error');
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        verifyCode();
    }, [verifyEmail, navigate, showToast]);

    return (
        <div>
            {loading ? (
                <div className="position-absolute top-50 start-0 translate-middle-y" id="loading">
                    <Loading/>
                </div>
            ) : (
                
               <>
                <SuccessPage/>
               </>
            )}
        </div>
    );
};
