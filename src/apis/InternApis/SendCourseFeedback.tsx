import axios from 'axios';
import CourseFeedbackVerify from "./CourseFeedbackVerify";

const InternSendCourseFeedback = async (internId:string, courseId:string, feedbackContent:string) =>{
    // VERIFY IF INTERN HAS ALREADY SENT FEEDBACK OR NOT
    const verify = await CourseFeedbackVerify(internId, courseId);
    if (!verify){
        try{
            const response =
                await axios.post(`http://localhost:8080/internbridge/intern/course/feedback/${internId}&${courseId}`,
                    {
                        "content" : feedbackContent
                    })

            console.log(response);
            return;
        }catch(error){
            console.log("InternSendCourseFeedback: Error. ", error);
        }
    }
    else{
        console.warn("An attempt was made to send feedback despite intern has already sent it.");
    }
}
export default InternSendCourseFeedback;