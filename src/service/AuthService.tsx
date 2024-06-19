import axios from 'axios';
import { LoginRequest, UserInfoResponse, MessageResponse } from '../model/Auth';

const API_URL = 'http://localhost:8080/internbridge/auth/';

class AuthService {
  async login(loginRequest: LoginRequest): Promise<UserInfoResponse | MessageResponse> {
    const response = await axios.post<UserInfoResponse | MessageResponse>(`${API_URL}signin`, loginRequest);
    if ('userInfo' in response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.userInfo));
    }
    return response.data;
  }

  async logout(): Promise<void> {
    await axios.post(`${API_URL}signout`);
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
  
}

export default new AuthService();
