// src/apis/courseApi.ts
import axios from "axios";

export const ApiCoordinatorShowCourse = async (companyId: number, pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/course/companyId=${companyId}?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course data:", error);
        throw error;
    }
};

