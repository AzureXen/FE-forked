import React, {useState} from "react";
import '../../../css/InternDashboard/ActivityCard.css'
import TaskSetDone from "../../../apis/InternApis/TaskSetDone";

interface ActivityCard {
    activityId: number;
    activityDescription: string;
    startDate: Date;
    endDate: Date;
    status: Boolean;
    intern_id : string;
}
const CourseActivityCard:React.FC<ActivityCard> = ({activityId, activityDescription, startDate, endDate, status,intern_id})=>{
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();

    const [currentStatus,setCurrentStatus] = useState(status);
    const handleClick = async () => {
        console.log("Clicked button 'set as done'!");
        try {
            const result = await TaskSetDone(intern_id, activityId.toString());
            console.log("Got the result: ")
            console.log(result);
            if (result) {
                setCurrentStatus(true);
            }
        } catch (error) {
            console.error("Failed to set task as done:", error);
        }
    };

    return(
        <div className="course-activity-card">
            <div className="id-description-holder">
                <div className="activity-id">{activityId}</div>
                <div className="activity-description">{activityDescription}</div>
            </div>

            <div className="date-range">
                <div className="start-date">Start date: {formattedStartDate}</div>
                <div className="end-date">End date: {formattedEndDate}</div>
            </div>

            <div className = "task-status">
                {
                    currentStatus ?
                        (<p className="done-message">You have done this task!</p>)
                        :
                        (<p onClick={handleClick} className="set-done-button">Set as done</p>)
                }
            </div>

        </div>
    )
}
export default CourseActivityCard;