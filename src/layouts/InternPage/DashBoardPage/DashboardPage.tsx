import OnGoingCourses from './OnGoingCourses';
import '../../../css/Intern/CourseCard.css';
import '../../../css/Intern/Dashboard.css';
import { HeaderWorkplace } from "../../HeaderAndFooter/HeaderWorkplace";
import { Footer } from "../../HeaderAndFooter/Footer";
import NavbarIntern from "../NavbarIntern/NavbarIntern";
import { useEffect, useState } from 'react';
import useAuth from "../../../context/useAuth";
import EndedCourses from "./EndedCourses";
import Cookies from 'js-cookie';

export const DashboardPage: React.FC = () => {
    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const checkedInternId = user?.user_id.toString(); // Convert to string
    return (
        <>
            <div>
                <HeaderWorkplace />
            </div>
            <div>
                {checkedInternId && <NavbarIntern internId={checkedInternId} selectedPage="Dashboard" />}
            </div>
            <div className="dashboard-container">
                <p className="highlight1">On Going Courses:</p>
                <div className="course-container">
                    {checkedInternId && <OnGoingCourses internId={checkedInternId}/>}
                </div>

                <div className="ended-course-container">
                    {checkedInternId && <EndedCourses internId={checkedInternId}/>}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    );
}
