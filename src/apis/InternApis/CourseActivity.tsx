import axios from 'axios';
import CourseTask from "../../model/CourseTask";
const fetchActivityCourseIntern = async (courseId: string, internId: string) =>{
    try{
        const response =
            await axios.get(`http://localhost:8080/internbridge/intern/course/task/${courseId}&${internId}`)
        return response.data.internTasks.map( (courseTask: any)=> {
            return new CourseTask(
                courseTask.taskId,
                courseTask.courseId,
                courseTask.taskContent,
                new Date(courseTask.startDate),
                new Date(courseTask.endDate),
                courseTask.status,
            )
        });
    }catch(error){
        console.error("Error while fetching activity course", error);
        throw error;
    }
}
export default fetchActivityCourseIntern;