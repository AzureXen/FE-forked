import { Link } from "react-router-dom";
import "../../css/success.css";
export const SuccessPage: React.FC = () => {
    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className="text-center p-lg-4">
                        <div className="success-animation">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                <circle className="path circle" fill="none" stroke="#198754" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                                <polyline className="path check" fill="none" stroke="#198754" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                            </svg>
                        </div>
                        <h4 className="text-success mt-3">Oh Yeah!</h4>
                        <p className="mt-3">You have successfully registered and logged in.</p>
                        <Link to="/" className="btn btn-sm mt-3 btn-success">Ok</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
