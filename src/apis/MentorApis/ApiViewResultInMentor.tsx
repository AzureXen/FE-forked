import axios from "axios";

export const ApiViewResultInMentor = async (mentorId: number, courseId: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/internbridge/mentor/course/internResult/${courseId}&${mentorId}`)
    return response.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error; // Optionally, rethrow the error if you want to handle it at the call site
  }
};
