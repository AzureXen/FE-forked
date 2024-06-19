import axios from "axios"

export const ApiGetAllCompany = async () =>{
    
    try{
        const response = await axios.get("http://localhost:8080/internbridge/admin/AllCompany");
        return response.data;
    } catch (error){
        console.log(error);
        
    }

}