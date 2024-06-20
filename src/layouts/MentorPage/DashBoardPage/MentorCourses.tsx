import React, {useState, useEffect } from 'react';
import CourseMentor from "../../../model/CourseMentor";
import fetchCourseMentor from "../../../apis/MentorApis/CourseMentor";
import MentorCourseCard from "./MentorCourseCard";

interface MentorCoursesProps{
    mentorId : string;
}
const MentorCourses: React.FC<MentorCoursesProps> = ({mentorId}) => {
    const [courses, setCourses] = useState<CourseMentor[]>([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                 const data = await fetchCourseMentor(mentorId);
                 setCourses(data);
            }catch(error){
                console.log("MentorCourses: found and error while fetching ", error);
            }
        }
        fetchData();
    }
    ,[])
    return(
        <div>
            {courses.map(courseMentor => (
                <MentorCourseCard
                    key={courseMentor.course_id}
                    mentorId={courseMentor.mentor_id}
                    courseId={courseMentor.course_id}
                    courseName={courseMentor.course_name}
                    mentorName={courseMentor.mentorName}
                />
            ))}
        </div>
    )
}
export default MentorCourses;