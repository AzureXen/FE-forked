import React from "react";
import {useState, useEffect} from "react";
import fetchCourseName from "../../../apis/InternApis/CourseName";
import '../../../css/Intern/Dashboard.css'
interface CourseId{
    courseId: string;
    internId: string;
}
const CourseName:React.FC<CourseId> = ({courseId, internId}) => {
    const [courseName, setCourseName] = useState<string>("");
    useEffect( ()=>{
        const fetchData = async ()=>{
            try{
                const data = await fetchCourseName(courseId, internId);
                console.log(data);
                setCourseName(data);
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
export default CourseName