import axios from "axios";

export const fetchInterns = async (companyId: number, pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/search/filter/${companyId}`,{
            params: {
                role: "ROLE_INTERN",
                pageNo: pageNo,
                pageSize: pageSize
              }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching interns data:", error);
        throw error;
    }
};
