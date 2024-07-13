
import axios from "axios";
import CourseIntern from "../../model/Intern/CourseIntern"
const fetchCoursesForIntern = async (internId : string) => {
    try {
        console.log("fetchCourseForIntern: ");
        console.log("InternId: ", internId);
        const response =
            await axios.get(`http://localhost:8080/internbridge/intern/allCourse/${internId}`)
            
            return response.data.map((courseIntern: any) => new CourseIntern(
                courseIntern.courseId,
                courseIntern.companyId,
                courseIntern.courseName,
                courseIntern.mentorName,
                parseInt(internId),
                false,
            ));
            
    } catch (error) {
        console.error("Error fetching courses for intern", error);
        throw error;
    }
};

export default fetchCoursesForIntern;