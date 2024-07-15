// src/apis/ApiCompanyLogo.js
import axios from 'axios';

export const getCompanyLogo = async (jobId: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/companyLogo/${jobId}`, { responseType: 'blob' });
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error('Error fetching the company logo:', error);
        throw error;
    }
};
