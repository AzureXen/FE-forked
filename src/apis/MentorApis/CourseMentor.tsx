import axios from "axios";
import "../../model/CourseMentor"
import CourseMentor from "../../model/CourseMentor";
const fetchCourseMentor = async (mentorId: string) => {
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/mentor/course/${mentorId}`)
        return response.data.courses.map( (courseMentor: any) => new CourseMentor(
            courseMentor.courseId,
            courseMentor.courseName,
            courseMentor.companyId,
            courseMentor.companyName,
            courseMentor.mentorId,
            courseMentor.mentorName,
            new Date(courseMentor.startDate),
            new Date(courseMentor.endDate),
            courseMentor.status,
        ) )
    }catch(error){
        console.log("fetchCourseMentor: found an error. ",error);
    }
}
export default fetchCourseMentor