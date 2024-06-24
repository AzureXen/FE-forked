import React, { useState, useEffect } from 'react';
import createCourse from '../../../apis/CoordinatorApis/CreateCourseApi';
import apiShowMentor from '../../../apis/CoordinatorApis/ApiShowMentor';
import { Loading } from '../../Loading/Loading';
import { Footer } from '../../HeaderAndFooter/Footer';
import { HeaderWorkplace } from '../../HeaderAndFooter/HeaderWorkplace';
import { useToast } from '../../../context/ToastContext';

const CreateCourseComponent: React.FC = () => {
    const [mentorId, setMentorId] = useState<number>(0);
    const [mentors, setMentors] = useState<{ user_id: number, fullName: string }[]>([]);
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<{ company_id: number } | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchMentors(user.company_id);
        }
    }, [user]);

    const fetchMentors = async (companyId: number) => {
        try {
            const mentorData = await apiShowMentor(companyId);
            console.log(mentorData);

            if (Array.isArray(mentorData)) {
                setMentors(mentorData);
            } else {
                console.error("API response is not an array:", mentorData);
                setError("Error fetching mentors");
            }
        } catch (error) {
            console.error("Error fetching mentors:", error);
            setError("Error fetching mentors");
        }
    };

    const changeDateFormat = (date: string) => {
        const newDate = date.split('-');
        return `${newDate[1]}-${newDate[2]}-${newDate[0]}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mentorId === 0) {
            setError('Mentor ID is required');
            return;
        }

        const newCourse = {
            mentorId: mentorId,
            courseDescription: courseDescription,
            startDate: changeDateFormat(startDate),
            endDate: changeDateFormat(endDate)
        };

        console.log('Submitting new course:', newCourse);
        setIsLoading(true);

        try {
            const response = await createCourse(newCourse);
            console.log('Course created successfully:', response);
            showToast(response, "success");
            setError('');
            setMentorId(0);
            setCourseDescription('');
            setStartDate('');
            setEndDate('');
        }  catch (error: unknown) {
            if (error instanceof Error) {
              console.error('Error occurred:', error.message);
              showToast(error.message, "error");
            } else {
              console.error('Unexpected error:', error);
              showToast("An unexpected error occurred", "error");
            }
          } finally {
            setIsLoading(false);
        }
    };

    return (
        
        <div className="job-detail">
            {isLoading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <>
                    <div>
                        <div className="container rounded mb-5" id="job-block">
                            <div className="row input-container">
                                <h1 id="h1-apply-now">Create Course Now</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="col-xs-12">
                                        <div className="styled-input wide">
                                            <select
                                                id="input"
                                                value={mentorId}
                                                onChange={(e) => setMentorId(parseInt(e.target.value))}
                                                required
                                            >
                                                <option value={0} disabled>Select Mentor</option>
                                                {mentors.map((mentor) => (
                                                    <option key={mentor.user_id} value={mentor.user_id}>
                                                        {mentor.fullName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="styled-input wide">
                                            <input
                                                type="text"
                                                id="input"
                                                value={courseDescription}
                                                onChange={(e) => setCourseDescription(e.target.value)}
                                                required
                                            />
                                            <label>Course Description</label>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="styled-input wide">
                                            <input
                                                type="date"
                                                id="input"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                required
                                            />
                                            <label>Start Date</label>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="styled-input wide">
                                            <input
                                                type="date"
                                                id="input"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                required
                                            />
                                            <label>End Date</label>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <button
                                            type="submit"
                                            id="btn-apply"
                                            className="btn-lrg submit-btn"
                                        >
                                            Create
                                            <span className="first"></span>
                                            <span className="second"></span>
                                            <span className="third"></span>
                                            <span className="fourth"></span>
                                        </button>
                                    </div>
                                </form>
                                {error && <p className="error-message">{error}</p>}
                                {successMessage && <p className="success-message">{successMessage}</p>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateCourseComponent;
