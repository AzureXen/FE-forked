import axios from "axios";

export const ApiViewIntern = async (pageNo: number, pageSize: number,managerId: number, companyId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/manager/search/${managerId}&${companyId}?role=ROLE_INTERN&pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        
    }

}