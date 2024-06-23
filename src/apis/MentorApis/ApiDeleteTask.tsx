import axios from "axios";
export const ApiDeleteTask = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/internbridge/mentor/task/delete/${id}`)
        return response.data;
    } catch (error) {

    }
};