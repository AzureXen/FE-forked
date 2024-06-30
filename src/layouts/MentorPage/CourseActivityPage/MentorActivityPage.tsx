import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MentorActivities from "./MentorActivities";
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import CourseNameMentor from "./CourseNameMentor";
import { NavbarMentor } from "../../HeaderAndFooter/Navbar/NavbarMentor";
import useAuth from "../../../context/useAuth";


const MentorActivityPage = () =>{
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
                    <CourseNameMentor courseId={checkedCourseId} mentorId={checkedMentorId}/>
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