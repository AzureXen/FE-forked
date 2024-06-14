export default class Company{
    company_id : number;
    company_name : string;
    company_description: string;
    company_location: string;
    constructor(company_id: number, company_name : string
                , company_description : string, company_location : string){
        this.company_id = company_id;
        this.company_name = company_name;
        this.company_description = company_description;
        this.company_location = company_location;
    }
}