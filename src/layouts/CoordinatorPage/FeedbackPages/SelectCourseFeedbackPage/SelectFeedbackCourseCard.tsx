import React from "react";
import '../../../../css/Intern/CourseCard.css'
import {useNavigate} from "react-router-dom";
interface CourseCardProps {
    coordinatorId : number;
    courseId : number;
    courseName: string;
    coordinatorName: string;
}
const SelectFeedbackCourseCard:React.FC<CourseCardProps> = ({coordinatorId, courseId, courseName, coordinatorName}) =>{
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/coordinator/viewFeedback/${courseId}`);
    }
    return(
        <div onClick={handleClick} className="course-card">
            <div className="card-img"></div>
            <h3>{courseName}</h3>
        </div>
    )
}
export default SelectFeedbackCourseCard;