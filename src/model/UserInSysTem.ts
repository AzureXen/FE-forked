export default class UserInSysTem {
    id: number;
    fullName: string;
    email: string;
    role: string;
    companyName: string;

    constructor(
        id: number,
        fullName: string,
        email: string,
        role: string,
        companyName: string

    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.companyName=companyName;
    }
}