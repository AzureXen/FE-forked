import React from "react";
import '../../../../css/Intern/CourseCard.css'
import {useNavigate} from "react-router-dom";
interface CourseCardProps {
    mentorId : number;
    courseId : number;
    courseName: string;
    mentorName: string;
}
const MentorFeedbackCourseCard:React.FC<CourseCardProps> = ({mentorId, courseId, courseName, mentorName}) =>{
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/mentor/feedback/${courseId}`);
    }
    return(
        <div onClick={handleClick} className="course-card">
            <div className="card-img"></div>
            <h3>{courseName}</h3>
        </div>
    )
}
export default MentorFeedbackCourseCard;