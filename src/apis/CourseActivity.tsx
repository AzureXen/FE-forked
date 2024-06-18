import axios from 'axios';
import CourseTask from "../model/CourseTask";
const fetchActivityCourseIntern = async (courseId: string) =>{
    try{
        const response =
            await axios.get(`http://localhost:8080/internbridge/intern/course/task/${courseId}`)
        return response.data.tasks.map( (courseTask: any)=> {
            return new CourseTask(
                courseTask.id,
                courseTask.course.id,
                courseTask.taskContent,
                new Date(courseTask.startDate),
                new Date(courseTask.endDate)
            )
        });
    }catch(error){
        console.error("Error while fetching activity course", error);
        throw error;
    }
}
export default fetchActivityCourseIntern;