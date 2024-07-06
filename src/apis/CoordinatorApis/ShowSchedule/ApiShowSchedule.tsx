import axios from "axios";

export const ApiShowSchedule = async (pageNo: number, pageSize: number, companyId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/showSchedule/${companyId}?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        
    }

}