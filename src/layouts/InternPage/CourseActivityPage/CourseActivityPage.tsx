
import { useParams} from "react-router-dom";
import CourseActivities from "./CourseActivities";
import CourseName from "./CourseName";
import '../../../css/InternDashboard/ActivityCard.css'
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import NavbarIntern from "../DashBoardPage/NavbarIntern";
const CourseActivityPage = (() => {
    const {courseId, internId} = useParams();
    const checkedcourseId = courseId ?? '';
    const checkedInternId = internId ?? '';
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
                    <CourseName courseId={checkedcourseId}/>
                </div>
                <hr style={{height: '4px', backgroundColor: 'aqua', border: 'none'}}/>
                <div>
                    <CourseActivities courseId={checkedcourseId}/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
})
export default CourseActivityPage;