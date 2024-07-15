import axios from "axios"

export const getField = async () =>{
    
    try{
        const response = await axios.get("http://45.117.177.107:8090/internbridge/field");
        return response.data;
    } catch (error){
        console.log(error);
        
    }

}