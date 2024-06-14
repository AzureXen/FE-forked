
import OnGoingCourses from './OnGoingCourses'
import '../../../css/CourseCard.css'
import '../../../css/Dashboard.css'
import {HeaderSmaller} from "../../HeaderAndFooter/HeaderSmaller";
import {Footer} from "../../HeaderAndFooter/Footer";
import { useParams} from "react-router-dom";
export const DashboardPage:React.FC = () =>{
    const {internId} = useParams<{internId : string}>();

    const checkedIntenId = internId ?? '';
    return(
        <>
        <div>
            <HeaderSmaller />
        </div>

            <div className="dashboard-container">
                <p className="on-going-courses">On Going Courses:</p>
                <div className="course-container">
                    <OnGoingCourses internId={checkedIntenId}></OnGoingCourses>
                </div>
            </div>
        <div>
            <Footer />
        </div>
        </>
    )
}