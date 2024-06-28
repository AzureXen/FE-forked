import axios from "axios";
export const DeleteUser = async (id: number) => {
    try {
        const response = await axios.put(`http://localhost:8080/internbridge/admin/userAccount/delete/id=${id}`)
        return response.data;
    }  catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            throw new Error(error.response.data);
          } else if (error.request) {
            throw new Error("No response received from the server");
          } else {
            throw new Error("Error in setting up the request");
          }
        } else {
          throw new Error("An unexpected error occurred");
        }
      }
};