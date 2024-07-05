import React from "react";
import {useState, useEffect} from "react";
import fetchCourseName from "../../../apis/InternApis/CourseName";
import '../../../css/Intern/Dashboard.css'
import fetchCourseNameMentor from "../../../apis/MentorApis/CourseNameMentor";
interface CourseId{
    courseId: string;
    mentorId: string;
}
const CourseNameMentor:React.FC<CourseId> = ({courseId, mentorId}) => {
    const [courseName, setCourseName] = useState<string>("");
    useEffect( ()=>{
        const fetchData = async ()=>{
            try{
                const data = await fetchCourseNameMentor(courseId, mentorId);
                console.log("CourseNameMentor: ")
                console.log(data);
                if(data===null){
                    setCourseName("")
                }
                else setCourseName(data);
            }catch(error){
                console.log("Error fetching course name", error);
            }
        }
            fetchData();
        },[courseId])
    return(
        <h1 className="highlight1">{courseName}</h1>

    )
}
export default CourseNameMentor