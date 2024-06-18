
import React, { useState, useEffect } from 'react';
import fetchCoursesForIntern from '../../../apis/CourseIntern';
import CourseCard from './CourseCard';
import Course from '../../../model/CourseIntern'

interface OnGoingCourseProps{
    internId: string;
}

const OnGoingCourses : React.FC<OnGoingCourseProps>= ({internId} ) => {
    const [courseIntern, setCourseIntern] = useState<Course[]>([]);

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

    return (
            <div>
                {courseIntern.map(courseIntern => (
                    <CourseCard
                        key={courseIntern.course_id}
                        internId= {courseIntern.intern_id}
                        courseId = {courseIntern.course_id}
                        courseName={courseIntern.course_description}
                        mentorName={courseIntern.course_mentor}
                    />
                ))}
            </div>
    );
};

export default OnGoingCourses;
