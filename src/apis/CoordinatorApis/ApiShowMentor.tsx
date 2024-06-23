import axios from 'axios';

const apiShowMentor = async (companyId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/company/mentor/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching mentors:', error);
        throw error;
    }
};

export default apiShowMentor;
