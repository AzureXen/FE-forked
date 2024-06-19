import React, { useState } from 'react';
import createCourse from '../../apis/CreateCourseApi';

const CreateCourseComponent: React.FC = () => {
    const [mentorId, setMentorId] = useState<number | null>(null);
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const changeDateFormat = (date: string) => {
        const newDate = date.split('-')
        return `${newDate[1]}-${newDate[2]}-${newDate[0]}`
    }

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

        try {
            const companyId = 1;
            const response = await createCourse(newCourse, companyId);
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
        }
    };

    return (
        <div>
            <h2>Create New Course</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mentor ID:</label>
                    <input
                        type="number"
                        value={mentorId ?? ''}
                        onChange={(e) => setMentorId(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Course Description:</label>
                    <textarea
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourseComponent;
