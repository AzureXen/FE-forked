export default class CourseShow {
    mentorId: number;
    mentorName: string;
    companyId: number;
    companyName: string;
    courseDescription: string;

    constructor(mentorId: number, mentorName: string, companyId: number, companyName: string, courseDescription: string) {
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.companyId = companyId;
        this.companyName = companyName;
        this.courseDescription = courseDescription;
    }
}