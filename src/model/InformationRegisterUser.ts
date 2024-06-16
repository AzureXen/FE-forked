export default class InformationRegisterUser {
    jobApplicationId: number;
    fullName: string;
    email: string;
    companyId: number;
    companyName: string;
    role: string;

    constructor(
        jobApplicationId: number,
        fullName: string,
        email: string,
        companyId: number,
        companyName: string,
        role: string,

    ) {
        this.jobApplicationId = jobApplicationId;
        this.fullName = fullName;
        this.email = email;
        this.companyId = companyId;
        this.companyName = companyName;
        this.role=role;

    }
}