import axios from "axios";
export const ApiGetSchedule = async (companyId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/manager/viewSchedule?companyid=${companyId}`)
        return response.data;
    } catch (error) {

    }
};