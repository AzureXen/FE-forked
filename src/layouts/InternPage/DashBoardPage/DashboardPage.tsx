
import OnGoingCourses from './OnGoingCourses'
import '../../../css/InternDashboard/CourseCard.css'
import '../../../css/InternDashboard/Dashboard.css'
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import { useParams} from "react-router-dom";
import NavbarIntern from "./NavbarIntern";
export const DashboardPage:React.FC = () =>{
    const {internId} = useParams<{internId : string}>();

    const checkedInternId = internId ?? '';
    return(
        <>
        <div>
            <HeaderWorkplace/>
        </div>
            <div>
                <NavbarIntern internId={checkedInternId} selectedPage="Dashboard"/>
            </div>
            <div className="dashboard-container">
                <p className="highlight1">On Going Courses:</p>
                <div className="course-container">
                    <OnGoingCourses internId={checkedInternId}></OnGoingCourses>
                </div>
            </div>
        <div>
            <Footer />
        </div>
        </>
    )
}