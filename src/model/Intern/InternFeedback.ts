
export default class InternFeedback{
    internId: number;
    senderName: string;
    content:string;
    constructor(internId:number, senderName:string, content:string){
        this.internId = internId;
        this.senderName = senderName;
        this.content = content
    }
}