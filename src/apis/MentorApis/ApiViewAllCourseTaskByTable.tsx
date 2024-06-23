import axios from "axios";

export const ApiViewAllCourseTaskByTable = async (mentorId: number, company_id: number, pageNo: number, pageSize: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/internbridge/mentor/task`, {
      params: {
        user_id: mentorId,
        company_id: company_id,
        pageNo: pageNo,
        pageSize: pageSize
      }
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error; // Optionally, rethrow the error if you want to handle it at the call site
  }
};
