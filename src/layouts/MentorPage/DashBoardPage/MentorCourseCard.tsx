import React from "react";
import '../../../css/InternDashboard/CourseCard.css'
interface CourseCardProps {
    mentorId : number;
    courseId : number;
    courseName: string;
    mentorName: string;
}
const MentorCourseCard:React.FC<CourseCardProps> = ({mentorId, courseId, courseName, mentorName}) =>{
    return(
        <div className="course-card">
            <div className="card-img"></div>
            <h3>{courseName}</h3>
        </div>
    )
}
export default MentorCourseCard;