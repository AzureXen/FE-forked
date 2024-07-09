import axios from "axios";
import CourseIntern from "../../model/Intern/CourseIntern";

const fetchEndedCourses = async(internId : string) =>{
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/intern/course/endedCourse/${internId}`)
        return response.data.endedCourseByInternResponse.map( (courseIntern : any) => new CourseIntern(
            courseIntern.courseId,
            courseIntern.companyId,
            courseIntern.courseName,
            courseIntern.mentorName,
            parseInt(internId),
            courseIntern.feedback,
        ) );
    }catch(error){
        console.log("fetchEndedCourses error: ", error);
    }
}
export default fetchEndedCourses;