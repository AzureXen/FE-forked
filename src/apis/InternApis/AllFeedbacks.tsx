import axios from 'axios';
import InternFeedback from "../../model/Intern/InternFeedback";


const fetchAllFeedbacks = async(internId:string) =>{
    try{
        console.log("internId: " + internId);
        const response = await axios(`http://localhost:8080/internbridge/intern/getAllFeedback/${internId}`)
        return response.data.feedbackResponses.map( (internFeedback : any) => new InternFeedback(
            parseInt(internId),
            internFeedback.senderName,
            internFeedback.content,
        ) );
    }catch(error){
        console.log("fetchAllFeedbacks: error while fetching ",error);
    }
}
export default fetchAllFeedbacks;