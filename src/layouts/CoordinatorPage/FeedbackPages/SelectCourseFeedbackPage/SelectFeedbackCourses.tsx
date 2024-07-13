import React, {useState, useEffect } from 'react';
import CourseMentor from "../../../../model/Mentor/CourseMentor";
import fetchCourseCoordinator from "../../../../apis/CoordinatorApis/CourseCoordinator";
import SelectFeedbackCourseCard from "./SelectFeedbackCourseCard";

interface CoordinatorCoursesProps{
    coordinatorId : string;
}
const SelectFeedbackCourses: React.FC<CoordinatorCoursesProps> = ({coordinatorId}) => {
    const [courses, setCourses] = useState<CourseMentor[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                 const data = await fetchCourseCoordinator(coordinatorId);
                 setCourses(data);
            }catch(error){
                console.log("MentorCourses: found and error while fetching ", error);
            }
        }
        fetchData();
    }
    ,[]);
    const showMoreCourses = () => {
        setVisibleCount(prevCount => prevCount + 6); // Increment the count by 5 each time
    };
    return(
        //reused courseMentor instead of creating new one
        <div>
            {courses.slice(0, visibleCount).map((courseMentor,index) => (
                <SelectFeedbackCourseCard
                    key={index}
                    coordinatorId={courseMentor.mentor_id}
                    courseId={courseMentor.course_id}
                    courseName={courseMentor.course_name}
                    coordinatorName={courseMentor.mentorName}
                />
            ))}
            {visibleCount < courses.length && (
                <p style={{color:"blue", cursor:"pointer",
                    fontWeight:"bold", marginLeft:"1rem", fontSize:"large"}} onClick={showMoreCourses}>Show More</p>
            )}
        </div>
    )
}
export default SelectFeedbackCourses;