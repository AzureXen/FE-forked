import axios from "axios";
export const DeleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/internbridge/admin/userAccount/delete/id=${id}`)
        return response.data;
    } catch (error) {
        
    }
  };