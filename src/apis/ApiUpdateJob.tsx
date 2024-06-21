import React from "react";
import axios from "axios";

export const ApiUpdateJob = async (job_discription: string, job_id: number) => {
  const formData = new FormData();
  formData.append("job_id", job_id.toString());
  formData.append("job_discription", job_discription);
  try {
    const response = await axios.put(
      "http://localhost:8080/internbridge/manager/updateJob",
      formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
