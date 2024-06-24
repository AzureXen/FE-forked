import axios from "axios";

export const ApiGetAllCourseInSystem = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/internbridge/coordinator/course/companyId=${id}`,{
        params:{
            pageNo: 0,
            pageSize: 999
        }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
