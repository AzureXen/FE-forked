import React, { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { Loading } from "../Loading/Loading";
import { ApiSendReq } from "../../apis/ApiSendReq";
import { HelpRequest } from "../../model/HelpRequest";
import { HeaderSmaller } from "../HeaderAndFooter/HeaderSmaller";
import { Footer } from "../HeaderAndFooter/Footer";

export const HelpPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { showToast } = useToast();
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [companyDescription, setCompanyDescription] = useState<string>("");
    const [courseId, setCourseId] = useState<string>("");
    const [userId, setUserId] = useState<number>();
    const [user, setUser] = useState<{
        user_id: number;
        company_id: number;
    } | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setUserId(parsedUser.user_id);
        }
    }, [userId]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log(userId);
            setLoading(true);
            const data = await ApiSendReq(
                new HelpRequest(
                    userId,
                    selectedOption,
                    description,
                    email,
                    companyName,
                    companyDescription
                )
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error occurred:", error.message);
                showToast(error.message, "error");
            } else {
                console.error("Unexpected error:", error);
                showToast("An unexpected error occurred", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-detail">
            {loading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <>
                    <HeaderSmaller />
                    <div className="container rounded mb-5" id="job-block">
                        <div className="row input-container">
                            <h1 id="h1-apply-now">Helps</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="col-xs-12">
                                    <div className="styled-input wide">
                                        <select
                                            id="input"
                                            required
                                            value={selectedOption}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select Course
                                            </option>
                                            <option value="Create Company">Create Company</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                {selectedOption === "Other" && (
                                    <div className="col-xs-12">
                                        <div className="styled-input wide">
                                            <input
                                                type="text"
                                                id="input"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                            <label>Description</label>
                                        </div>
                                    </div>
                                )}
                                {selectedOption === "Create Company" && (
                                    <>
                                        <div className="col-xs-12">
                                            <div className="styled-input wide">
                                                <input
                                                    type="text"
                                                    id="input"
                                                    value={companyName}
                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                    required
                                                />
                                                <label>Company Name</label>
                                            </div>
                                        </div>
                                        <input type="hidden" value={userId} />
                                        <div className="col-xs-12">
                                            <div className="styled-input wide">
                                                <input
                                                    type="text"
                                                    id="input"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <label>Company Email</label>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="styled-input wide">
                                                <input
                                                    type="text"
                                                    id="input"
                                                    value={companyDescription}
                                                    onChange={(e) => setCompanyDescription(e.target.value)}
                                                    required
                                                />
                                                <label>Description</label>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="col-xs-12">
                                    <button
                                        type="submit"
                                        id="btn-apply"
                                        className="btn-lrg submit-btn"
                                    >
                                        Send
                                        <span className="first"></span>
                                        <span className="second"></span>
                                        <span className="third"></span>
                                        <span className="fourth"></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
};
