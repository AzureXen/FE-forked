
export default class CreateCompanyRequest {
    companyName: string;
    companyDescription: string;
    location: string;
    constructor(
        companyName: string,
        companyDescription: string,
        location: string
    ) {
       this.companyName=companyName;
       this.companyDescription=companyDescription;
       this.location=location;
    }

}