import OnGoingCourses from './OnGoingCourses';
import '../../../css/InternDashboard/CourseCard.css';
import '../../../css/InternDashboard/Dashboard.css';
import { HeaderWorkplace } from "../../HeaderAndFooter/HeaderWorkplace";
import { Footer } from "../../HeaderAndFooter/Footer";
import NavbarIntern from "../NavbarIntern/NavbarIntern";
import { useEffect, useState } from 'react';

export const DashboardPage: React.FC = () => {
    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
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
                    {checkedInternId && <OnGoingCourses internId={checkedInternId} />}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
