export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface UserInfoResponse {
    user_id: number;
    username: string;
    email: string;
    role: string;
    company_id: number;
    fullName: string;
  }
  
  export interface MessageResponse {
    message: string;
  }
  