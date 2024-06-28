import {useEffect, useState} from "react";
import MentorCourses from "./MentorCourses";
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import OnGoingCourses from "../../InternPage/DashBoardPage/OnGoingCourses";
import {Footer} from "../../HeaderAndFooter/Footer";
import { NavbarMentor } from "../../HeaderAndFooter/Navbar/NavbarMentor";
import useAuth from "../../../context/useAuth";


const MentorDashboard: React.FC = () => {
    const [user, setUser] = useState<{ user_id: number } | null>(null);
    useAuth(['ROLE_MENTOR']);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
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
                <p className="highlight1">On Going Courses:</p>
                <div className="course-container">
                    <MentorCourses mentorId={checkedMentorId}/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}
export default MentorDashboard;