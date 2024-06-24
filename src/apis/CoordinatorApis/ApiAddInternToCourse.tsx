import axios from "axios";
import AddInternRequest from "../../model/Coordinator/AddInternRequest";

export const ApiAddInternToCourse = async (courseId: number, internId: AddInternRequest[]) => {
    
    try {
        const InternRequest = {
            internId: internId.map((intern) => ({ internId: intern.internId })),
          };
        const response = await axios.post(`http://localhost:8080/internbridge/coordinator/addIntern/${courseId}`, internId);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            throw new Error(error.response.data);
          } else if (error.request) {
            throw new Error("No response received from the server");
          } else {
            throw new Error("Error in setting up the request");
          }
        } else {
          throw new Error("An unexpected error occurred");
        }
      }
};