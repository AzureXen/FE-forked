import axios from "axios";

const CourseVerify = async (internId : string, courseId : string) =>{
    try{
        const response =
            await axios.get(`http://localhost:8080/internbridge/intern/course/verify/${internId}&${courseId}`);
        console.log("CourseVerify: ", response.data.toString());
        return response.data.toString();
    }catch(error){
        console.log(error);
    }
}
export default CourseVerify;