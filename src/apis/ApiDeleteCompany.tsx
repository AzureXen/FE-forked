import axios from "axios";
export const DeleteCompany = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/internbridge/admin/company/delete/${id}`)
        return response.data;
    } catch (error) {
        
    }
  };