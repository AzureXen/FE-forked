// src/apis/courseApi.ts
import axios from "axios";

export const ApiViewReq = async (pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/admin/request?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course data:", error);
        throw error;
    }
};

