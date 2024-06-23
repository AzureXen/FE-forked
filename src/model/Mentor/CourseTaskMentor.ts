

export default class CourseTaskMentor{
    taskId : number;
    taskContent : string;
    startDate : Date;
    endDate : Date;
    mentorId : number;
    constructor(taskId : number, taskContent : string, startDate : Date, endDate : Date
    , mentorId : number){
        this.taskId = taskId;
        this.taskContent = taskContent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.mentorId = mentorId;
    }
}