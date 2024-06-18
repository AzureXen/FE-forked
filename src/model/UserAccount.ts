
export default class UserAccount{
    user_id : number;
    company_id : number;
    user_name : number;
    password : string;
    email : string;
    full_name : string;
    date_of_birth : Date;
    role : string;
    verification_code : string;
    
    constructor(user_id : number, company_id : number, user_name : string, password : string,
                email : string, full_name : string, date_of_birth : Date, role : string,
                verification_code : string){
        this.user_id  = user_id ;
        this.company_id  = company_id ;
        this.user_name  = user_id ;
        this.password  = password ;
        this.email  = email ;
        this.full_name  = full_name ;
        this.date_of_birth = date_of_birth ;
        this.role  = role ;
        this.verification_code = verification_code ;
    }
}