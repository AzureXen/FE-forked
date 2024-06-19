import axios from "axios";
import InformationRegisterUser from "../model/InformationRegisterUser";

interface SignupUser{
    jobApplicationId: number |null;
    fullName: string;
    email: string;
    companyId: number;
    role: string;
}

export const registerUser = async (users: InformationRegisterUser[]): Promise<void> => {
    try {
        const signupUsers: SignupUser[]=users.map(user =>({
            jobApplicationId: null,
            fullName: user.fullName,
            email: user.email,
            companyId: user.companyId,
            role: user.role
        }));
        const response = await axios.post("http://localhost:8080/internbridge/auth/signup", signupUsers);
    } catch (error) {
        
    }

}
