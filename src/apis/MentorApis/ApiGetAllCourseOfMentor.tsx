import axios from "axios";

export const ApiGetAllCourseOfMentor = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/internbridge/mentor/course/3`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
