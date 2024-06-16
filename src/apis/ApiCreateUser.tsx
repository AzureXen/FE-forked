import axios from "axios";
import InformationRegisterUser from "../model/InformationRegisterUser";

interface SignupUser{
    jobApplicationId: number;
    fullName: string;
    email: string;
    companyId: number;
    role: string;
}

export const registerInterns = async (users: InformationRegisterUser[]): Promise<void> => {
    try {
        const signupUsers: SignupUser[]=users.map(user =>({
            jobApplicationId: user.jobApplicationId,
            fullName: user.fullName,
            email: user.email,
            companyId: user.companyId,
            role:"ROLE_INTERN"
        }));
        const response = await axios.post("http://localhost:8080/internbridge/auth/signup", signupUsers);
    } catch (error) {
        
    }

}
