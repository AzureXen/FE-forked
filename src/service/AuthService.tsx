import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginRequest, UserInfoResponse, MessageResponse } from '../model/Auth';

const API_URL = 'http://localhost:8080/internbridge/auth/';

class AuthService {
  async login(loginRequest: LoginRequest): Promise<UserInfoResponse | MessageResponse> {
    const response = await axios.post<UserInfoResponse | MessageResponse>(
      `${API_URL}signin`,
      loginRequest,
      { withCredentials: true }
    );
    if ('userInfo' in response.data) {
      const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      Cookies.set("user", JSON.stringify(response), { expires });
    }
    return response.data;
  }

  async logout(): Promise<void> {
    await axios.post(`${API_URL}signout`, {}, { withCredentials: true });
    Cookies.remove('user');
  }

  getCurrentUser() {
    const userStr = Cookies.get('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService();
