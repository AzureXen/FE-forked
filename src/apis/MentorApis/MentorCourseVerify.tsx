import axios from "axios";

const MentorCourseVerify = async (mentorId : string, courseId : string) =>{
    try{
        console.log("MentorCourseVerify");
        console.log("mentorId: ", mentorId);
        console.log("courseId: ", courseId);
        const response =
            await axios.get(`http://localhost:8080/internbridge/mentor/course/verify/${courseId}&${mentorId}`);
        console.log("CourseVerify: ", response.data.toString());
        return response.data.toString();
    }catch(error){
        console.log(error);
    }
}
export default MentorCourseVerify;