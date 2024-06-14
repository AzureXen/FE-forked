import axios from "axios";
import { Job } from "../model/type";
export const getJobDetail =async (id: number): Promise<Job> =>{
    const response = await axios.get<Job>(`http://localhost:8080/internbridge/jobs/id=${id}`);
    return response.data;
}