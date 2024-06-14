import axios from "axios";

const BASE_URL = "http://localhost:8080/internbridge/applyjob";

export const applyJob = async (
  jobId: number,
  email: string,
  fullName: string,
  cv: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("jobId", jobId.toString());
  formData.append("email", email);
  formData.append("fullName", fullName);
  formData.append("cv", cv);

  const response = await axios.post("http://localhost:8080/internbridge/applyjob", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
