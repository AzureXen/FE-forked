import axios from 'axios';
import { LoginRequest } from '../model/Auth';

export const forgotPassword = async (forgotPasswordRequest: LoginRequest) => {
    try {
        const response = await axios.post(`http://localhost:8080/internbridge/changePassword`, forgotPasswordRequest, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};