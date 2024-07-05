import axios from "axios";

export const ApiReport = async (companyId:number,userId: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/internbridge/manager/report/${companyId}&${userId}`)
    return response.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error; // Optionally, rethrow the error if you want to handle it at the call site
  }
};
