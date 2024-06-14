
export default class ActivityCourse{
    activtiy_id : number;
    course_id : number;
    task_content : string;
    start_date : Date;
    end_date : Date;
    constructor(activity_id : number, course_id : number, task_content : string
    ,start_date : Date, end_date : Date,){
        this.activtiy_id = activity_id;
        this.course_id = course_id;
        this.task_content = task_content;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}