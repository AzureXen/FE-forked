import axios from "axios";
import JobData from "../model/PostJob";

export const postJob = async (jobData: JobData) => {
  try {
    const formData = new FormData();
    formData.append("field_id", jobData.field_id.toString());
    formData.append("company_id", jobData.company_id.toString());
    formData.append("job_name", jobData.job_name);
    formData.append("job_description", jobData.job_description); 

    const response = await axios.post(
      "http://localhost:8080/internbridge/manager/postjob",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"  // Ensure this is set correctly
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};
