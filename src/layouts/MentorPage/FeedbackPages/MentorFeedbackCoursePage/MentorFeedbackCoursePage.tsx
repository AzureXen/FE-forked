import {useEffect, useState} from "react";
import {HeaderWorkplace} from "../../../HeaderAndFooter/HeaderWorkplace";
import {NavbarMentor} from "../../../HeaderAndFooter/Navbar/NavbarMentor";
import {Footer} from "../../../HeaderAndFooter/Footer";
import MentorFeedbackCourses from "./MentorFeedbackCourses";
import Cookies from "js-cookie";


const MentorFeedbackCoursePage = () =>{

    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringMentorId = user?.user_id.toString(); // Convert to string
    const checkedMentorId = StringMentorId ?? ""; // prevent from being unidentified
    if (!user) {
        return <p>Loading...</p>;
    }

    return(
        <>
            <div>
                <HeaderWorkplace/>
            </div>
            <NavbarMentor/>
            <div className="dashboard-container">
                <p className="highlight1">Sending Feedback to Intern in Course:</p>
                <div className="course-container">
                    <MentorFeedbackCourses mentorId={checkedMentorId}/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}
export default MentorFeedbackCoursePage;