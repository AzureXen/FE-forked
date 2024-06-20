
import axios from "axios";
import CourseIntern from "../../model/CourseIntern"
const fetchCoursesForIntern = async (internId : string) => {
    try {
        const response =
            await axios.get(`http://localhost:8080/internbridge/intern/allCourse/${internId}`)
            return response.data.map((courseIntern: any) => new CourseIntern(
                courseIntern.course.id,
                courseIntern.course.company.id,
                courseIntern.course.courseDescription,
                courseIntern.course.mentor.fullName,
                courseIntern.id.internId
            ));
    } catch (error) {
        console.error("Error fetching courses for intern", error);
        throw error;
    }
};

export default fetchCoursesForIntern;