import axios from "axios";

const CourseFeedbackVerify = async (internId:string, courseId:string)=>{
    try{
        const response =
            await axios.get(`http://localhost:8080/internbridge/intern/course/feedback/verify/${internId}&${courseId}`)
        return response.data;
    }catch(error){
        console.log("CourseFeedbackVerify error:", error);
    }
}
export default CourseFeedbackVerify;