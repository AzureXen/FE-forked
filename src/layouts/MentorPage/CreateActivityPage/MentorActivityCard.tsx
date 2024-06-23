import React from "react";

interface ActivityCardProps{
    taskId:string;
    taskContent:string;
    startDate:Date;
    endDate:Date;
    courseId:string;
}
const MentorActivityCard:React.FC<ActivityCardProps> = ({taskId, taskContent, startDate, endDate, courseId}) =>{
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();


    return(
        <div className="course-activity-card">
            <div className="id-description-holder">
                <div className="activity-id">{taskId}</div>
                <div className="activity-description">{taskContent}</div>
            </div>

            <div className="date-range">
                <div className="start-date">Start date: {formattedStartDate}</div>
                <div className="end-date">End date: {formattedEndDate}</div>
            </div>

        </div>
    )
}
export default MentorActivityCard;