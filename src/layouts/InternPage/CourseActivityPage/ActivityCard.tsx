import React from "react";
import '../../../css/InternDashboard/ActivityCard.css'

interface ActivityCard {
    activityId: number;
    activityDescription: string;
    startDate: Date;
    endDate: Date;

}
const CourseActivityCard:React.FC<ActivityCard> = ({activityId, activityDescription, startDate, endDate})=>{
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();
    return(
        <div className="course-activity-card">
            <div className="activity-id">{activityId}</div>
            <div className="activity-description">{activityDescription}</div>
            <div className="date-range">
                <div className="start-date">Start date: {formattedStartDate}</div>
                <div className="end-date">End date: {formattedEndDate}</div>
            </div>
        </div>
    )
}
export default CourseActivityCard;