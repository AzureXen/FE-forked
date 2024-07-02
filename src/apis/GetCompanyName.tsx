import axios from "axios";

const fetchCompanyName = async (companyId : string) =>{
    const response
        = await axios.get(`http://localhost:8080/internbridge/companyName/${companyId}`);
    return response.data.companyName;
}
export default fetchCompanyName;