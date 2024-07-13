
export default class CourseFeedback{
    courseId: number;
    courseName: string;
    companyId: number;
    companyName: string;
    mentorId: number;
    mentorName: string;
    startDate: Date;
    endDate: Date;
    status: Boolean;
        constructor(course_id: number, course_name: string, company_id: number, company_name:string , mentor_id: number
    , mentor_name: string, start_date: Date, end_date: Date, status: boolean) {
        this.courseId = course_id;
        this.courseName = course_name;
        this.companyId = company_id;
        this.companyName = company_name;
        this.mentorId = mentor_id;
        this.mentorName = mentor_name
        this.startDate = start_date;
        this.endDate = end_date;
        this.status = status;
    }
}