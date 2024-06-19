import React, { useEffect, useState } from 'react';
import CreateCourse from '../../model/CreateCourse';
import fetchCreateCourse from '../../apis/CreateCourse';
import axios from 'axios';
import { Footer } from '../HeaderAndFooter/Footer';
import { HeaderSmaller } from '../HeaderAndFooter/HeaderSmaller';

const CreateCourseComponent: React.FC = () => {
    const [mentorId, setMentorId] = useState<number | null>(null);
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCreateCourse(1); // Assuming 1 is the company ID
                if (data) {
                    setMentorId(data.mentor_id);
                    setCourseDescription(data.courseDescription);
                    setStartDate(data.start_date.toISOString().substring(0, 10)); // Convert date to string for input field
                    setEndDate(data.end_date.toISOString().substring(0, 10)); // Convert date to string for input field
                }
            } catch (error) {
                setError("Error fetching course data");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');

        if (mentorId === null) {
            setError('Mentor ID is required');
            return;
        }

        const newCourse = new CreateCourse(
            mentorId,
            courseDescription,
            new Date(startDate),
            new Date(endDate)
        );

        try {
            const response = await axios.post('http://localhost:8080/internbridge/coordinator/createCourse/1', newCourse, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Course created successfully:', response.data);

            // Reset form fields
            setMentorId(null);
            setCourseDescription('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div>
            <HeaderSmaller />
            <h2>Create New Course</h2>
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
            <Footer />
        </div>
    );
};

export default CreateCourseComponent;
