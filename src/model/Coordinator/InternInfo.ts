export default class InternInfo {
    id: number;
    email:string;
    fullName: string;
    constructor(
        id: number,
        email:string,
        fullName: string,
    ) {
        this.id = id;
        this.email=email;
        this.fullName=fullName;
    }
}