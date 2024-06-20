export default class JobByCompanyResponse {
    id: number;
    jobName: string;
    jobDescription: string;
    pageNo: number;
    pageSize: number;
    totalItems: number;
    totalPages: number
    constructor(
        id: number,
        jobName: string,
        jobDescription: string,
        pageNo: number,
        pageSize: number,
        totalItems: number,
        totalPages: number
    ) {
        this.id = id;
        this.jobName = jobName;
        this.jobDescription = jobDescription;
        this.pageNo=pageNo;
        this.pageSize=pageSize;
        this.totalItems=totalItems;
        this.totalPages=totalPages;
    }

}