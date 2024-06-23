export interface Job {
    jobApplicationId: number;
    fullName: string;
    email: string;
    companyId: number;
    companyName: string;
  }
  
  export interface JobApplicationAcceptedRequest {
    jobApplications: Job[];
    pageNo: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
  