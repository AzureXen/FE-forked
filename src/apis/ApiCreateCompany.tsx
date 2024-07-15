import axios from "axios";

export const CreateCompany = async (formData: FormData) => {
  try {
    const response = await axios.post(`http://localhost:8080/internbridge/admin/createCompany`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};
