import axios from 'axios';
import { JobApplicationAcceptedRequest } from '../../model/Coordinator/JobApplicationAccepted';


export const getJobApplication = async (pageNo = 0, pageSize = 6, companyid?: number): Promise<JobApplicationAcceptedRequest> => {
  const response = await axios.post<JobApplicationAcceptedRequest>(
    `http://localhost:8080/internbridge/coordinator/jobApplication?companyid=${companyid}&pageNo=${pageNo}&pageSize=${pageSize}`, 
    {}, // Gửi một đối tượng rỗng trong phần body
    {
      withCredentials: true, // Thêm withCredentials để gửi cookie
    }
  );
  return response.data;
};
