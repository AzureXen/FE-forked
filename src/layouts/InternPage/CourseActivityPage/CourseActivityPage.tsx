
import {useNavigate, useParams} from "react-router-dom";
import CourseActivities from "./CourseActivities";
import CourseName from "./CourseName";
import '../../../css/Intern/ActivityCard.css'
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import NavbarIntern from "../NavbarIntern/NavbarIntern";
import {useEffect, useState} from "react";
import useAuth from "../../../context/useAuth";
import CourseVerify from "../../../apis/InternApis/CourseVerify";
import {useToast} from "../../../context/ToastContext";
import Cookies from "js-cookie";
const CourseActivityPage: React.FC = () => {
    //useToast
    const { showToast } = useToast();
    //----verify if intern is in that course
    const navigate = useNavigate();
    const [isInCourse, setIsInCourse] = useState<boolean>(true);
    const {courseId} = useParams();

    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringInternId = user?.user_id.toString();
    const checkedInternId = StringInternId ?? "";

    const checkedcourseId = courseId ?? "";

    // Verify intern is in course functions
    const verifyInternCourse = async ()=>{
        try{
            const courseVerifyData = await CourseVerify(checkedInternId,checkedcourseId);
            console.log(courseVerifyData);
            if(courseVerifyData.toString()==="false"){
                setIsInCourse(false);
            }
        }catch(error){
            console.error("CourseActivityPage error: ",error);
        }
    }
    useEffect(()=>{
        if(checkedcourseId&&checkedInternId){
            console.log("checking if intern is in that course...");
            verifyInternCourse();
        }
    },[checkedcourseId,checkedInternId])

    useEffect(()=>{
        if(!isInCourse){
            showToast("You are not/no longer in this course!","error");
            navigate("/mentor");
        }
    },[isInCourse])
    if (!user) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <div>
                <HeaderWorkplace/>
            </div>

                <div>
                    <NavbarIntern internId={checkedInternId} selectedPage="Activities"/>
                </div>

            <div className="course-activity-items">
                <div>
                    <CourseName courseId={checkedcourseId} internId={checkedInternId}/>
                </div>
                <hr style={{height: '4px', backgroundColor: 'aliceblue', border: 'none'}}/>
                <div>
                    <CourseActivities courseId={checkedcourseId} internId={checkedInternId}/>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </>
    )
}
export default CourseActivityPage;