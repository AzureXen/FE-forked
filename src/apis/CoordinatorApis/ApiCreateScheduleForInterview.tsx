import axios from "axios";
import AddScheduleRequest from "../../model/AddScheduleRequest";

export const ApiCreateScheduleForInterview = async (
  applications: AddScheduleRequest[],
  time: string,
  location: string
): Promise<string> => {
  try {
    const scheduleRequest = {
      time: time,
      applicationId: applications.map((jobApplication) => ({ applicationId: jobApplication.applicationId })),
      location: location,
    };
    console.log("API", scheduleRequest)
    const response = await axios.post(
      "http://localhost:8080/internbridge/coordinator/schedule/create",
      scheduleRequest
    );
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
