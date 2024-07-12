import React, { useState, useEffect } from "react";
import CourseIntern from "../../../model/Intern/CourseIntern";
import fetchEndedCourses from "../../../apis/InternApis/EndedCourseIntern";
import CourseCard from "./CourseCard";


interface endedCoursesProps{
    internId : string;
}
const EndedCourses :React.FC<endedCoursesProps> = ({internId}) =>{
    const [endedCourses, setEndedCourses] = useState<CourseIntern[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const data = await fetchEndedCourses(internId);
                setEndedCourses(data);
            }catch(error){
                console.log("EndedCourses error: ",error);
            }
        }
        fetchData();
    },[])
    //COURSES THAT ARE AVAILABLE TO FEEDBACK (courses that are ended AND have not been feedback
    const [FACourses, setFACourses] = useState<CourseIntern[]>([]);
    useEffect(() => {
        const filteredCourses = endedCourses.filter(course => !course.feedback);
        setFACourses(filteredCourses);
    }, [endedCourses]);

    const showMoreCourses = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };
    if(FACourses.length>0){
        return (
            <div>
                <p className="highlight1" style={{display:"block"}}>Courses to feedback:</p>
                {FACourses.slice(0, visibleCount).map(courseIntern => (
                    <CourseCard
                        key={courseIntern.course_id}
                        internId={courseIntern.intern_id}
                        courseId={courseIntern.course_id}
                        courseName={courseIntern.course_description}
                        mentorName={courseIntern.course_mentor}
                        type="Ended"
                    />
                ))}
                {visibleCount < FACourses.length && (
                    <p style={{
                        color: "blue", cursor: "pointer",
                        fontWeight: "bold", marginLeft: "1rem", fontSize: "large"
                    }} onClick={showMoreCourses}>Show More</p>
                )}
            </div>
        );
    }
    return (
        <p></p>
    )
}
export default EndedCourses;