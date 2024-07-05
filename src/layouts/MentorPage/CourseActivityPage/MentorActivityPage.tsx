import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MentorActivities from "./MentorActivities";
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import CourseNameMentor from "./CourseNameMentor";
import { NavbarMentor } from "../../HeaderAndFooter/Navbar/NavbarMentor";
import useAuth from "../../../context/useAuth";
import {useToast} from "../../../context/ToastContext";
import CourseVerify from "../../../apis/InternApis/CourseVerify";
import MentorCourseVerify from "../../../apis/MentorApis/MentorCourseVerify";


const MentorActivityPage = () =>{
    //useToast
    const { showToast } = useToast();
    //----verify if mentor is in that course
    const navigate = useNavigate();
    const [isInCourse, setIsInCourse] = useState<boolean>(true);

    const [user, setUser] = useState<{ user_id: number } | null>(null);
    const {courseId} = useParams()
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    useAuth(['ROLE_MENTOR']);

    const StringMentorId = user?.user_id.toString(); // Convert to string
    const checkedMentorId = StringMentorId ?? ""; // prevent from being unidentified

    const checkedCourseId = courseId ?? "";

    const verifyInternCourse = async ()=>{
        try{
            const courseVerifyData = await MentorCourseVerify(checkedMentorId,checkedCourseId);
            console.log(courseVerifyData);
            if(courseVerifyData.toString()==="false"){
                setIsInCourse(false);
            }
        }catch(error){
            console.error("CourseActivityPage error: ",error);
        }
    }
    useEffect(()=>{
        if(checkedCourseId&&checkedMentorId){
            console.log("checking if Mentor is in that course...");
            verifyInternCourse();
        }
    },[checkedCourseId,checkedMentorId])

    useEffect(()=>{
        if(!isInCourse){
            showToast("You are not/no longer in this course!","error");
            navigate("/mentor");
        }
    },[isInCourse])

    if (!user) {
        return <p>Loading...</p>;
    }
    return(
        <>
            <div>
                <HeaderWorkplace/>
            </div>
            <div>
            <NavbarMentor/>
            </div>
            <div className="course-activity-items">
                <div>
                    (<CourseNameMentor courseId={checkedCourseId} mentorId={checkedMentorId}/>)
                </div>
                <hr style={{height: '4px', backgroundColor: 'aliceblue', border: 'none'}}/>
                <div>
                    <MentorActivities mentorId={checkedMentorId} courseId={checkedCourseId}/>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </>
    )
}
export default MentorActivityPage