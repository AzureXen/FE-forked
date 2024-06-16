export class JobData {
    field_id: number;
    company_id: number;
    job_name: string;
    job_description: string;
  
    constructor(field_id: number, company_id: number, job_name: string, job_description: string) {
      this.field_id = field_id;
      this.company_id = company_id;
      this.job_name = job_name;
      this.job_description = job_description;
    }
  }
  export default JobData;
