
import axios from "axios";
import Intern from "../../model/Intern/Intern";

const fetchInternOfCourse = async (coordinatorId:String, courseId:String) =>{
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/course/allIntern/${courseId}&${coordinatorId}`)
        console.log("fetchInternOfCourse:");
        console.log("coordinatorId: ", coordinatorId);
        console.log("courseId: ", courseId)
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