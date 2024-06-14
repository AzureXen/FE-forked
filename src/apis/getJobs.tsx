import axios from 'axios';

const API_URL = 'http://localhost:8080/internbridge/jobs';

export interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  location: string;
}

export interface Job {
  id: number;
  jobName: string;
  jobDescription: string;
  company: Company; 
}

export interface SearchJobsResponse {
  jobs: Job[];
  totalItems: number;
}

export const getJobs = async (jobName: string, pageNo: number = 0, pageSize: number = 5): Promise<SearchJobsResponse> => {
  const response = await axios.get<SearchJobsResponse>(`${API_URL}/${jobName}`, {
    params: {
      pageNo,
      pageSize,
    },
  });
  return response.data;
};
