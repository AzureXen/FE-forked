import React from 'react';
import '../../../css/InternDashboard/CourseCard.css'
import { useNavigate} from "react-router-dom";

interface CourseCardProps {
    internId : number;
    courseId : number;
    courseName: string;
    mentorName: string;
  }
const CourseCard : React.FC<CourseCardProps> = ({ internId, courseId, courseName, mentorName }) => {
    const navigate = useNavigate();
    const handleCourseClick = () => {
        navigate(`/intern/course/${courseId}`);
    }
    return (
        <div className="course-card" onClick = {handleCourseClick}>
            <div className="card-img"></div>
            <h3>{courseName}</h3>
            <p>Mentor: {mentorName}</p>
        </div>
    );
};

export default CourseCard;
