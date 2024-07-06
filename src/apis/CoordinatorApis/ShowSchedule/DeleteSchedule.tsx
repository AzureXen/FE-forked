import axios from "axios";
export const DeleteSchedule = async (scheduleId: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/internbridge/coordinator/deleteSchedule/${scheduleId}`)
        return response.data;
    }  catch (error) {
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