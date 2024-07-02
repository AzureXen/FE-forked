export interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  location: string;
}

export interface JobApplication {
  id: number;
  email: string;
  fullName: string;
  status: number;
  job: Job;
}

export interface Job {
  id: number;
  company: Company;
  jobName: string;
  jobApplications: JobApplication[];
}

export interface JobApplicationResponse {
  jobList: Job[];
  pageNo: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}