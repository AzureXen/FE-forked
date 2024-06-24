import axios from 'axios';

interface CreateCourseRequest {
    mentorId: number;
    courseDescription: string;
    startDate: string;
    endDate: string;
}

const createCourse = async (createCourseRequest: CreateCourseRequest) => {
    try {
        // Retrieve user information from local storage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            throw new Error('User not logged in');
        }

        const user = JSON.parse(storedUser);
        const companyId = user.company_id;

        console.log(`Sending request to create course: ${JSON.stringify(createCourseRequest)} for company ID: ${companyId}`);
        const response = await axios.post(`http://localhost:8080/internbridge/coordinator/createCourse/${companyId}`, createCourseRequest, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Response from server:', response.data);
        return response.data;
    }catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            throw new Error(error.response.data);
          } else if (error.request) {
            throw new Error("No response received from the server");
          } else {
            throw new Error("Error in setting up the request");
          }
        } else {
          throw new Error("An unexpected error occurred");
        }
      }
};

export default createCourse;

