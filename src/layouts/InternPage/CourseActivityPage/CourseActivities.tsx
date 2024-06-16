import React, {useEffect, useState} from "react";
import CourseTask from "../../../model/CourseTask";
import fetchActivityCourseIntern from "../../../apis/CourseActivity";
import ActivityCard from "./ActivityCard";
import '../../../css/InternDashboard/ActivityCard.css'
interface CAProps{
    courseId : string;
}
const CourseActivities : React.FC<CAProps> =({courseId}) => {
    const [activities, setActivities] = useState<CourseTask[]>([]);
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const data = await fetchActivityCourseIntern(courseId);
                setActivities(data);
            }catch(error){
                console.log("Found an error while fetching activities for course: ", error);
            }
        }
        fetchData()
    }, [courseId]);
    return(
        <div className="course-activity-cards-container">
            {activities.map(activities=>(
                <ActivityCard
                    key = {activities.course_id}
                    activityId={activities.activity_id}
                    activityDescription={activities.activity_content}
                    startDate={activities.start_date}
                    endDate={activities.end_date}/>
            ))}
        </div>
    )
}
export default CourseActivities