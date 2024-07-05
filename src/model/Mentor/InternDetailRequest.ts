

export default class InternDetailRequest{
    workHistory: string;
    educationBackground: string;
  
    constructor(workHistory: string, educationBackground: string) {
      this.workHistory = workHistory;
      this.educationBackground = educationBackground;
    }
}