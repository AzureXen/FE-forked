import axios from "axios"

export const ApiViewAllCompanyInSystem = async (pageNo: number, pageSize: number) =>{
    
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/admin/viewCompany?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error){
        console.log(error);
        
    }

}