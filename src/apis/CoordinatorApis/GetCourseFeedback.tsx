import axios from "axios";
import CourseFeedbackContent from "../../model/Coordinator/CourseFeedbackContent";

const fetchCourseFeedbackContent = async (courseId: string, coordinatorId:string) => {
    try{
        const response = await
            axios.get(`http://localhost:8080/internbridge/coordinator/course/feedback/${courseId}&${coordinatorId}`)
        return response.data.map((courseFeedbackContent : any) => new CourseFeedbackContent(
            courseFeedbackContent.internId,
            courseFeedbackContent.internName,
            courseFeedbackContent.feedbackContent,
        ))

    }catch(error){
        console.log("fetchCourseFeedback error: ", error);
    }
}
export default fetchCourseFeedbackContent;