
export default class InternDetail{
    intern_detail_id : number;
    user_id : number;
    work_hitory : string;
    educational_background : string;
    task_result : string;
    constructor(intern_detail_id : number, user_id : number, work_hitory : string, educational_background : string,
                task_result : string,){
        this.intern_detail_id  = intern_detail_id;
        this.user_id  = user_id ;
        this.work_hitory  = work_hitory ;
        this.educational_background = educational_background ;
        this.task_result  = task_result ;
    }
}