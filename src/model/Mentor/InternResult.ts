

export default class InternResult {
    internId: number;
    internName: string;
    totalTask: number;
    completedTasks: number;
    result: number;
    constructor(
    internId: number,
    internName: string,
    totalTask: number,
    completedTasks: number,
    result: number
    ) {
        this.internId=internId;
        this.internName=internName;
        this.totalTask=totalTask;
        this.completedTasks=completedTasks;
        this.result=result;
    }
}