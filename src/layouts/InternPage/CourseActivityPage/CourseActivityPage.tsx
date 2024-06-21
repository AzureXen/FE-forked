
import { useParams} from "react-router-dom";
import CourseActivities from "./CourseActivities";
import CourseName from "./CourseName";
import '../../../css/InternDashboard/ActivityCard.css'
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import NavbarIntern from "../NavbarIntern/NavbarIntern";
import {useEffect, useState} from "react";
const CourseActivityPage: React.FC = () => {
    const {courseId} = useParams();

    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringInternId = user?.user_id.toString();
    const checkedInternId = StringInternId ?? "";

    const checkedcourseId = courseId ?? "";

    if (!user) {
        return <p>Loading...</p>;
    }
    console.log(checkedInternId);
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
                <hr style={{height: '4px', backgroundColor: 'aqua', border: 'none'}}/>
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