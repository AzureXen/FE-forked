import axios from "axios";


const fetchCourseName = async (courseId:string,internId:string) => {
    try {
        console.log("fetchCourseName called");
        console.log("courseId:",courseId);
        console.log("internId:",internId);
        const response = await axios.get(`http://localhost:8080/internbridge/intern/courseName/${courseId}&${internId}`)
        return response.data.courseName;
    }catch(error){
        console.log("Found an error while fetching course name ", error);
    }
}
export default fetchCourseName;