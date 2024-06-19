import axios from "axios";
import JobByCompanyResponse from "../model/JobByCompanyResponse";

export const getAllJobByCompanyResponse = async (companyId: number, pageNo: number, pageSize: number): Promise<{ jobs: JobByCompanyResponse[], totalItems: number, totalPages: number }> => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/manager/viewJob`, {
            params: {
                companyid: companyId,
                pageNo: pageNo,
                pageSize: pageSize
            }
        });

        const jobsData = response.data.jobs;
        const totalItems = response.data.totalItems;
        const totalPages = response.data.totalPages;
        
        const jobs: JobByCompanyResponse[] = jobsData.map((job: any) => {
            return new JobByCompanyResponse(job.id, job.jobName, job.jobDescription, pageNo, pageSize, totalItems, totalPages);
        });

        return { jobs, totalItems, totalPages };
    } catch (error) {
        console.error("Error fetching job data", error);
        return { jobs: [], totalItems: 0, totalPages: 0 }; // Return empty array and 0 values in case of error
    }
};
