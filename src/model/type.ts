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