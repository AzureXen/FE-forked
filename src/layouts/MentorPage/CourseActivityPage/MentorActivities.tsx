import React, {useState, useEffect } from 'react';
import CourseTaskMentor from "../../../model/Mentor/CourseTaskMentor";
import fetchActivitiesMentor from "../../../apis/MentorApis/ActivitiesMentor";
import MentorActivityCard from "./MentorActivityCard";
interface MentorActivitiesProps{
    mentorId : string;
    courseId : string;
}
const MentorActivities:React.FC<MentorActivitiesProps> = ({mentorId,courseId})=>{
    const [activities, setActivities] = useState<CourseTaskMentor[]>([]);
    useEffect(()=>{
        try{
            const fetchData = async ()=>{
                const data = await fetchActivitiesMentor(courseId,mentorId);
                setActivities(data);
            }
            fetchData();
        }catch(error){
            console.log("MentorActivities: error fetching activities ", error);
        }
    }
    ,[])
    console.log(activities);
    return(
        <div className="course-activity-cards-container">
            {activities.map(activities => (
                <MentorActivityCard
                    key={activities.taskId}
                    taskId={activities.taskId.toString()}
                    taskContent={activities.taskContent}
                    startDate={activities.startDate}
                    endDate={activities.endDate}
                    courseId={courseId}
                />
            ))}
        </div>
    )
}

export default MentorActivities