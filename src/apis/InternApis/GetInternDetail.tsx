
import axios from "axios";
import InternDetail from "../../model/Intern/InternDetail";

const fetchInternDetail = async (internId:string) =>{
    try{
        console.log("Started fetching intern detail with id: ", internId);
        const response = await axios.get(`http://localhost:8080/internbridge/intern/detail/${internId}`);
        console.log(response);
        return new InternDetail(
            response.data.id,
            response.data.workHistory,
            response.data.educationBackground
        );
    }catch(error){
        console.log("fetchInternDetail: Found an error: ", error);
    }
}
export default fetchInternDetail;