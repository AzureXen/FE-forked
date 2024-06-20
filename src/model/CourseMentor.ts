

export default class CourseMentor {
    course_id: number;
    course_name: string;
    company_id: number;
    company_name: string;
    mentor_id: number;
    mentorName: string;
    startDate: Date;
    endDate: Date;
    status: boolean;
    constructor(course_id: number, course_name: string, company_id: number, company_name: string, mentor_id: number
    ,mentor_name: string, startDate: Date, endDate: Date, status: boolean) {
        this.course_id = course_id;
        this.course_name = course_name;
        this.company_id = company_id;
        this.company_name = company_name;
        this.mentor_id = mentor_id;
        this.mentorName = mentor_name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}