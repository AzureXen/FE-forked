import axios from "axios";
import CourseMentor from "../../model/Mentor/CourseMentor";
const fetchCourseCoordinator = async (companyId: string) => {
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/feedback/course/3  `)
        return response.data.map( (courseCoordinator: any) => new CourseMentor(
            courseCoordinator.id,
            courseCoordinator.courseDescription,
            courseCoordinator.company.id,
            courseCoordinator.company.companyName,
            courseCoordinator.mentor.id,
            courseCoordinator.mentor.fullName,
            courseCoordinator.startDate,
            courseCoordinator.endDate,
            courseCoordinator.status,

        ) )
    }catch(error){
        console.log("fetchCourseMentor: found an error. ",error);
    }
}
export default fetchCourseCoordinator