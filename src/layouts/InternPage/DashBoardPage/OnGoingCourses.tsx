
import React, { useState, useEffect } from 'react';
import fetchCoursesForIntern from '../../../apis/InternApis/CourseIntern';
import CourseCard from './CourseCard';
import Course from '../../../model/CourseIntern'

interface OnGoingCourseProps{
    internId: string;
}

const OnGoingCourses : React.FC<OnGoingCourseProps>= ({internId} ) => {
    const [courseIntern, setCourseIntern] = useState<Course[]>([]);
    const [visibleCount, setVisibleCount] = useState(5);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCoursesForIntern(internId);
                setCourseIntern(data);
            } catch (error) {
                console.error("Error fetching course interns", error);
            }
        };

        fetchData();
    }, []);
    const showMoreCourses = () => {
        setVisibleCount(prevCount => prevCount + 5); // Increment the count by 5 each time
    };
    return (
            <div>
                {courseIntern.slice(0, visibleCount).map(courseIntern => (
                    <CourseCard
                        key={courseIntern.course_id}
                        internId= {courseIntern.intern_id}
                        courseId = {courseIntern.course_id}
                        courseName={courseIntern.course_description}
                        mentorName={courseIntern.course_mentor}
                    />
                ))}
                {visibleCount < courseIntern.length && (
                    <p style={{color:"blue", cursor:"pointer",
                        fontWeight:"bold", marginLeft:"1rem", fontSize:"large"}} onClick={showMoreCourses}>Show More</p>
                )}
            </div>
    );
};

export default OnGoingCourses;
