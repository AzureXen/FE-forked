import axios from "axios";
import CourseTaskMentor from "../../model/Mentor/CourseTaskMentor";

const fetchActivitiesMentor = async (courseId : string, mentorId : string) =>{
    try{
        console.log("fetching activities mentor")
        console.log("courseId: " + courseId);
        console.log("mentorId: " + mentorId);
        const response =
            await axios.get(`http://localhost:8080/internbridge/mentor/course/task/${courseId}&${mentorId}`);
        return response.data.map( (mentorTask : any ) => {
            return new CourseTaskMentor(
                mentorTask.id,
                mentorTask.taskContent,
                mentorTask.startDate,
                mentorTask.endDate,
                parseInt(courseId),
            )
        } )
    }catch(error){
        console.log("fetchActivitiesMentor: ",error);
    }
}
export default fetchActivitiesMentor;