import axios from "axios";
import ActivitesRequest from "../../model/ActivitesRequest";
export const ApiAddActivities = async (activitesRequest: ActivitesRequest,courseId: number) => {
    try {
        const response = await axios.post(`http://localhost:8080/internbridge/mentor/addactivities/${courseId}`,activitesRequest, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        
    }
  };