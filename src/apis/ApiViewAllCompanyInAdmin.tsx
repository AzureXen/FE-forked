import axios from 'axios';

export const ApiViewAllCompanyInSystem = async (pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/admin/viewCompany`, {
            params: {
                pageNo,
                pageSize
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}
