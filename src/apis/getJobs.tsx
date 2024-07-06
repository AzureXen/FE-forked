import axios from 'axios';

const API_URL = 'http://localhost:8080/internbridge/jobs';

export interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  location: string;
}
export interface Field{
  id:string;
  fieldName: string;
}
export interface Job {
  id: number;
  jobName: string;
  jobDescription: string;
  company: Company; 
  field: Field;
}

export interface SearchJobsResponse {
  jobs: Job[];
  totalItems: number;
}

export const getJobs = async (jobName: string, pageNo: number = 0, pageSize: number = 5,fieldId: number): Promise<SearchJobsResponse> => {
  
  if(fieldId){
    console.log("co field nha"+fieldId)
    const response = await axios.get<SearchJobsResponse>(`${API_URL}/${jobName}`, {
      params: {
        fieldId,
        pageNo,
        pageSize,
      },
    });
    return response.data;
  }else{
    console.log(fieldId)
    const response = await axios.get<SearchJobsResponse>(`${API_URL}/${jobName}`, {
      params: {
        pageNo,
        pageSize,
      },
    });
    return response.data;
  }
};
