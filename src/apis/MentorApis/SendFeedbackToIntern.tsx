
import axios from "axios";

const sendFeedbackToIntern = async (feedbackContent: string, mentorId: string, internId: string) => {
    try{
        const response = await axios.post(`http://localhost:8080/internbridge/mentor/sendFeedback/${mentorId}&${internId}`,
            {
                "feedback": feedbackContent
            }).then(response => {
            console.log("sendFeedbackToIntern: Success.");
        })
        console.log(response);

    }
    catch(error){
        console.log("sendFeedbackToIntern error: ", error);
    }
}
export default sendFeedbackToIntern;