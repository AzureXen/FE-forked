export interface CourseAndAllTaskResponse {
    courseId: number;
    courseName: string;
    companyId: number;
    companyName: string;
    mentorName: string;
    taskList: Task[];
}

export interface Task {
    id: number;
    taskContent: string;
    startDate: string;
    endDate: string;
}
