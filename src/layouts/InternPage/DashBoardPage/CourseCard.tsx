import React from 'react';
import { useNavigate} from "react-router-dom";

interface CourseCardProps {
    internId : number;
    courseId : number;
    courseName: string;
    mentorName: string;
    type: string;
  }
const CourseCard : React.FC<CourseCardProps> = ({ internId, courseId, courseName, mentorName , type}) => {
    const navigate = useNavigate();
    const handleCourseClick = (type:string) => {
        if(type==="OnGoing") navigate(`/intern/course/${courseId}`);
        else navigate(`/intern/sendFeedback/${courseId}`);
    }
    if (type==="OnGoing"){
        return (
            <div className="course-card" onClick = {()=> handleCourseClick("OnGoing")}>
                <div className="card-img"></div>
                <h3>{courseName}</h3>
                <p>Mentor: {mentorName}</p>
            </div>
        );
    }
    else return (
        <div className="course-card" onClick={() => handleCourseClick("Ended")}>
            <div className="card-img"></div>
            <h3>{courseName}</h3>
            <p>Mentor: {mentorName}</p>
        </div>
    )
};

export default CourseCard;
