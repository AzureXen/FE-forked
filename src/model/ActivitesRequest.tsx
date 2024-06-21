export default class ActivitesRequest {
  taskContent: string;
  startDate: string;
  endDate: string;
  constructor(taskContent: string, startDate: string, endDate: string) {
    this.endDate = endDate;
    this.startDate = startDate;
    this.taskContent = taskContent;
  }
}
