import React, {useEffect, useState} from "react";
import CourseTask from "../../../model/Intern/CourseTask";
import fetchActivityCourseIntern from "../../../apis/InternApis/CourseActivity";
import ActivityCard from "./ActivityCard";
import '../../../css/Intern/ActivityCard.css'
interface CAProps{
    courseId : string;
    internId : string;
}
const CourseActivities : React.FC<CAProps> =({courseId,internId}) => {
    const [activities, setActivities] = useState<CourseTask[]>([]);
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const data = await fetchActivityCourseIntern(courseId,internId);
                setActivities(data);
            }catch(error){
                console.log("Found an error while fetching activities for course: ", error);
            }
        }
        fetchData();
    }, []);
    return(
        <div className="course-activity-cards-container">
            {activities.map(activities=>(
                <ActivityCard
                    key = {activities.course_id}
                    activityId={activities.activity_id}
                    activityDescription={activities.activity_content}
                    startDate={activities.start_date}
                    endDate={activities.end_date}
                    status = {activities.status}
                    intern_id={internId}
                />
            ))}
        </div>
    )
}
export default CourseActivities