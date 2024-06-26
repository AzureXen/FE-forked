export default class CourseInSystem {
    courseId: number;
    courseName: string;
    companyId: number;
    companyName: string;
    mentorId: number;
    mentorName: string;
    startDate: Date;
    endDate: Date;
    status: number;
    constructor(courseId: number, courseName: string, companyId: number, companyName: string, mentorId: number, mentorName: string, startDate: Date, endDate: Date, status: number) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.companyId = companyId;
        this.companyName = companyName;
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status=status;
    };
}