import axios from "axios";
import CourseMentor from "../../model/Mentor/CourseMentor";
const fetchCourseCoordinator = async (coordinatorId: string) => {
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/feedback/course/${coordinatorId}  `)
        console.log("fetchCourseCoordinator: fetched data: ", response.data);
        return response.data.map( (courseCoordinator: any) => new CourseMentor(
            courseCoordinator.courseId,
            courseCoordinator.courseName,
            courseCoordinator.companyId,
            courseCoordinator.companyName,
            courseCoordinator.mentorId,
            courseCoordinator.mentorName,
            courseCoordinator.startDate,
            courseCoordinator.endDate,
            courseCoordinator.status,

        ) )
    }catch(error){
        console.log("fetchCourseMentor: found an error. ",error);
    }
}
export default fetchCourseCoordinator