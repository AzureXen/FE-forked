
export default class CourseIntern{
    course_id: number;
    company_id: number;
    course_description: string;
    course_mentor: string;
    intern_id : number;
    constructor(course_id: number, company_id: number, course_description: string,
                course_mentor: string, intern_id : number) {
        this.course_id = course_id;
        this.company_id = company_id;
        this.course_description = course_description;
        this.course_mentor = course_mentor;
        this.intern_id = intern_id;
    }

}