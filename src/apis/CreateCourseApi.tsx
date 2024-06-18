import axios from 'axios';

interface CreateCourseRequest {
    mentorId: number;
    courseDescription: string;
    startDate: string;
    endDate: string;
}

const createCourse = async (createCourseRequest: CreateCourseRequest, companyId: number) => {
    try {
        console.log(`Sending request to create course: ${JSON.stringify(createCourseRequest)} for company ID: ${companyId}`);
        const response = await axios.post(`http://localhost:8080/internbridge/coordinator/createCourse/${companyId}`, createCourseRequest, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in createCourse API call:', error);
        throw error;
    }
};

export default createCourse;
