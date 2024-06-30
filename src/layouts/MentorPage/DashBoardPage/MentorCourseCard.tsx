import React from "react";
import '../../../css/Intern/CourseCard.css'
import {useNavigate} from "react-router-dom";
import useAuth from "../../../context/useAuth";
interface CourseCardProps {
    mentorId : number;
    courseId : number;
    courseName: string;
    mentorName: string;
}

const MentorCourseCard:React.FC<CourseCardProps> = ({mentorId, courseId, courseName, mentorName}) =>{
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/mentor/${courseId}`);
    }
    return(
        <div onClick={handleClick} className="course-card">
            <div className="card-img"></div>
            <h3>{courseName}</h3>
        </div>
    )
}
export default MentorCourseCard;