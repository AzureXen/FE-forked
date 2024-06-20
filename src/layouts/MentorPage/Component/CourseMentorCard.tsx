
import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCardMentor';
import Course from '../../../model/CourseIntern'
import CourseMentorModel from '../../../model/CourseMentorModel';
import { ApiViewAllCourseMentor } from '../../../apis/ApiViewAllCourseMentor';

interface OnGoingCourseProps{
    mentorId: number;
}

export const CourseMentorCard : React.FC<OnGoingCourseProps>= ({mentorId} ) => {
    const [courseMentor, setCourseMentor] = useState<CourseMentorModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ApiViewAllCourseMentor(mentorId,0,10);
                setCourseMentor(data.courses);
            } catch (error) {
                console.error("Error fetching course interns", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
              <div className='container-fuild '>

              {courseMentor.map(courseMentor => (
                    <CourseCard
                        key={courseMentor.courseId}
                        internId= {courseMentor.mentorId}
                        courseId = {courseMentor.courseId}
                        courseName={courseMentor.courseName}
                        mentorName={courseMentor.mentorName}
                    />
                ))}
              </div>
                </>
    );
};

