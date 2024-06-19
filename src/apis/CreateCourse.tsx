import CreateCourse from '../model/CreateCourse';
import axios from "axios";


const fetchCreateCourse = async (comapnyId: number): Promise<CreateCourse | null> => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/intern/courseName/${comapnyId}`);
        const data = response.data;
        return new CreateCourse(
            data.mentor.id,
            data.courseDescription,
            data.start_date,
            data.end_date,

        );
    } catch (error) {
        console.error("Error fetching course data", error);
        return null;
    }
}
export default fetchCreateCourse;
