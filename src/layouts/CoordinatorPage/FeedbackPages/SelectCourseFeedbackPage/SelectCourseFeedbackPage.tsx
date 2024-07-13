import {useEffect, useState} from "react";
import {HeaderWorkplace} from "../../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../../HeaderAndFooter/Footer";
import {NavbarCoordinator} from "../../../HeaderAndFooter/Navbar/NavbarCoordinator";
import SelectFeedbackCourses from "./SelectFeedbackCourses";


const SelectCourseFeedbackPage = () =>{

    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringCoordinatorId = user?.user_id.toString(); // Convert to string
    const checkedCoordinatorId = StringCoordinatorId ?? ""; // prevent from being unidentified
    if (!user) {
        return <p>Loading...</p>;
    }

    return(
        <>
            <div>
                <HeaderWorkplace/>
            </div>
            <NavbarCoordinator/>
            <div className="dashboard-container">
                <p className="highlight1">View Course Feedbacks</p>
                <div className="course-container">
                    <SelectFeedbackCourses coordinatorId={checkedCoordinatorId}/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}
export default SelectCourseFeedbackPage;