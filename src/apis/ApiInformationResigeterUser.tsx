import axios from "axios";
import InformationRegisterUser from "../model/InformationRegisterUser";

interface ApiResponse {
    jobApplications: any[];
    totalItems: number;
    totalPages: number;
}

export const getInformationResigeterUser = async (pageNo = 0, pageSize = 5): Promise<{userList: InformationRegisterUser[], totalItems: number, totalPages: number} | null> => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/admin/jobApplication?pageNo=${pageNo}&pageSize=${pageSize}`);
        
        // Accessing the jobApplications array from the response data
        const { jobApplications, totalItems, totalPages } = response.data as ApiResponse;

        // Mapping over the jobApplications array to create an array of InformationRegisterUser objects
        const userList: InformationRegisterUser[] = jobApplications.map((userData: any) => {
            return new InformationRegisterUser(
                userData.jobApplicationId,
                userData.fullName,
                userData.email,
                userData.companyId,
                userData.companyName,
                userData.role
            );
        });

        return { userList, totalItems, totalPages };
    } catch (error) {
        console.error("Error fetching course data", error);
        return null;
    }
};
