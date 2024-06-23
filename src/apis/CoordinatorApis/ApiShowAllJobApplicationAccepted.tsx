import axios from "axios";

export const ApiShowAllJobApplicationAccepted = async (companyId:string, pageNo = 0, pageSize = 6) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/internbridge/coordinator/jobApplication`,
      {},
      {
        params: {
          companyId: companyId,
          pageNo: pageNo,
          pageSize: pageSize
        },
        withCredentials: true,
      }
    );
    console.log('API response:', response.data); // Add this line
    return response.data;
  } catch (error) {
    console.error('API error:', error); // Add this line
    throw error; // Add this line to ensure the error is propagated
  }
};
