import axios from "axios";
export const ApiDeleteJobInCompany = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/internbridge/manager/delete?job_id=${id}`)
        return response.data;
    } catch (error) {

    }
};