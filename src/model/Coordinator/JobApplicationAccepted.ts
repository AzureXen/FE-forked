export interface Job {
    jobApplicationId: number;
    fullName: string;
    email: string;
    companyId: number;
    companyName: string;
    status: number
  }
  
  export interface JobApplicationAcceptedRequest {
    jobApplications: Job[];
    pageNo: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
  