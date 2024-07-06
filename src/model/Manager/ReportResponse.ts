import InternResultResponse from "./InternResultResponse";

export default class ReportResponse{
    internResults: InternResultResponse[];
    reportParagraph: string;

    constructor(internResults: InternResultResponse[], reportParagraph: string) {
        this.internResults = internResults;
        this.reportParagraph = reportParagraph;
    }
}