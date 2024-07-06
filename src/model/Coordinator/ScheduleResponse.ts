export default class ScheduleResponse{
    id: number;
    title: string;
    applicationId: number;
    name: string;
    start: string;
    end: string;
    description: string;
  
    constructor(
      id: number,
      title: string,
      applicationId: number,
      name: string,
      start: string,
      end: string,
      description: string
    ) {
      this.id = id;
      this.title = title;
      this.applicationId = applicationId;
      this.name = name;
      this.start = start;
      this.end = end;
      this.description = description;
    }
}