import axios from "axios";
import CreateCompanyRequest from "../model/CreateCompanyRequest";
export const CreateCompany = async (CreateCompanyRequest: CreateCompanyRequest) => {
    try {
        const response = await axios.post(`http://localhost:8080/internbridge/admin/createCompany`,CreateCompanyRequest, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        
    }
  };