import axios from 'axios';

const deleteCourse = async (courseId: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/internbridge/coordinator/course/delete/${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
            if (error.response) {
                throw new Error(`Error deleting course: ${error.response.status} ${error.response.statusText}`);
            } else if (error.request) {
                throw new Error('Network error: No response received from the server.');
            } else {
                throw new Error('Error deleting course: ' + error.message);
            }
        } else {
            throw new Error('Error deleting course: ' + (error as Error).message);
        }
    }
};

export default deleteCourse;
