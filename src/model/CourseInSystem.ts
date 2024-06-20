export default class CourseInSystem {
    courseId: number;
    courseName: string;
    companyId: number;
    companyName: string;
    mentorId: number;
    mentorName: string;
    startDate: Date;
    endDate: Date;

    constructor(courseId: number, courseName: string, companyId: number, companyName: string, mentorId: number, mentorName: string, startDate: Date, endDate: Date) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.companyId = companyId;
        this.companyName = companyName;
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.startDate = startDate;
        this.endDate = endDate;
    };
}