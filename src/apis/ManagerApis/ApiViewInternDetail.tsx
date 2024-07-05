
import axios from "axios";
import InternDetail from "../../model/Intern/InternDetail";

export const ApiViewInternDetail = async (internId:number) =>{
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/intern/detail/${internId}`);
        console.log(response);
        return new InternDetail(
            response.data.id,
            response.data.workHistory,
            response.data.educationBackground
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {

                throw new Error(error.response.data);
            } else if (error.request) {
                throw new Error("No response received from the server");
            } else {
                throw new Error("Error in setting up the request");
            }
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
