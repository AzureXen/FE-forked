

export default class InternDetail{
    intern_detail_id:number;
    work_history:string;
    education_background:string;
    constructor(intern_detail_id:number, work_history:string,education_background:string){
        this.intern_detail_id = intern_detail_id;
        this.work_history = work_history;
        this.education_background = education_background;
    }
}