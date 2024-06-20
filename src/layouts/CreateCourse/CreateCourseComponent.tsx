import React, { useState } from 'react';
import createCourse from '../../apis/CreateCourseApi';
import { Loading } from '../Loading/Loading';

const CreateCourseComponent: React.FC = () => {
    const [mentorId, setMentorId] = useState<number | null>(null);
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeDateFormat = (date: string) => {
        const newDate = date.split('-');
        return `${newDate[1]}-${newDate[2]}-${newDate[0]}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mentorId === null) {
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
            setSuccessMessage('Course created successfully!');
            setError(null);

            // Reset form fields
            setMentorId(null);
            setCourseDescription('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            console.error('Error creating course:', error);
            setError('Error creating course');
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
                    <div className="container rounded mb-5" id="job-block">
                        <div className="row input-container">
                            <h1 id="h1-apply-now">Create Course Now</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="col-xs-12">
                                    <div className="styled-input wide">
                                        <input
                                            type="number"
                                            id="input"
                                            value={mentorId ?? ''}
                                            onChange={(e) => setMentorId(parseInt(e.target.value))}
                                            required
                                        />
                                        <label>Mentor ID</label>
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
                </>
            )}
        </div>
    );
};

export default CreateCourseComponent;