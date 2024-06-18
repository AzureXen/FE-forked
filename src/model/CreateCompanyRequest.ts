
export default class CreateCompanyRequest {
    companyName: string;
    companyDiscription: string;
    location: string;
    constructor(
        companyName: string,
        companyDiscription: string,
        location: string
    ) {
       this.companyName=companyName;
       this.companyDiscription=companyDiscription;
       this.location=location;
    }

}