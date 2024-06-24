import axios from "axios";

export const ApiGetAllCourseOfMentor = async (id: string) => {
  try {
    const idnew=parseInt(id);
    const response = await axios.get(`http://localhost:8080/internbridge/mentor/course/${idnew}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
