export default class CreateCourse {
    mentor_id: number;
    courseDescription: string;
    start_date: Date;
    end_date: Date;

    constructor(mentor_id: number, courseDescription: string, start_date: Date, end_date: Date) {
        this.mentor_id = mentor_id;
        this.courseDescription = courseDescription;
        this.start_date = start_date;
        this.end_date = end_date;

    };
}