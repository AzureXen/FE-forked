import axios from "axios";

export const ApiViewAllCourseMentor = async (mentorId: number, pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/mentor/Allcourse/${mentorId}?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course data:", error);
        throw error; // Optionally, rethrow the error if you want to handle it at the call site
    }
};
