export default class InternInSystem {
    id: number;
    fullName: string;
    email: string;
    role: string;
    companyName: string;
    detail:string;

    constructor(
        id: number,
        fullName: string,
        email: string,
        role: string,
        companyName: string,
        detail:string

    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.companyName=companyName;
        this.detail=detail;
    }
}