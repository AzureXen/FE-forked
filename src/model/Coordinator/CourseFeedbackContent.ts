
export default class CourseFeedbackContent{
    internId: number;
    internName: string;
    feedbackContent: string;
    constructor(internId: number, internName: string, feedbackContent: string) {
        this.internId = internId;
        this.internName = internName;
        this.feedbackContent = feedbackContent;
    }
}