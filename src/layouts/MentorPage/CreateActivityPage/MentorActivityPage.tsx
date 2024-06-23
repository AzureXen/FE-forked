import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MentorActivities from "./MentorActivities";
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";


const MentorActivityPage = () =>{
    const [user, setUser] = useState<{ user_id: number } | null>(null);
    const {courseId} = useParams()
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
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
            <div className="course-activity-items">
                <MentorActivities mentorId={checkedMentorId} courseId={checkedCourseId}/>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}
export default MentorActivityPage