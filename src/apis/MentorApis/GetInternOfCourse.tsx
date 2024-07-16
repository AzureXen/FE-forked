
import axios from "axios";
import Intern from "../../model/Intern/Intern";

const fetchInternOfCourse = async (mentorId:string, courseId:string) =>{
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/mentor/course/allIntern/${courseId}&${mentorId}`)
        return response.data.internResponseList.map( (intern:any)=> new Intern(
            intern.internId,
            intern.internName,
            intern.email,
        ) )
    }catch(error){
        console.log("GetInternOfCourse Error: ", error);
    }
}
export default fetchInternOfCourse;