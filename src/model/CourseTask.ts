
export default class CourseTask {
    activity_id : number;
    course_id : number;
    activity_content : string;
    start_date : Date;
    end_date : Date;
    status : Boolean;
    constructor(activity_id : number, course_id : number, activity_content : string
    ,start_date : Date, end_date : Date, status : Boolean){
        this.activity_id = activity_id;
        this.course_id = course_id;
        this.activity_content = activity_content;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
    }
}