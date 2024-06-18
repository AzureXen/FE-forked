import axios from "axios";
import InformationRegisterUser from "../model/InformationRegisterUser";

export const ViewRegisterInternsSystem = async (pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/admin/search?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        
    }

}