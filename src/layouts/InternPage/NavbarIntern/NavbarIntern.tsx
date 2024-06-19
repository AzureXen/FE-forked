import React,{useState} from "react";
import {Link} from "react-router-dom";
import '../../../css/InternDashboard/NavbarIntern.css'
import DropDownCourses from "./DropDownCourses";
interface NavbarProps{
    internId : string;
    selectedPage : string;
}
const NavbarIntern :React.FC<NavbarProps> = ({internId, selectedPage})=>{
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const handleClick = ()=>{
        setIsOpenDropDown(prevState => !prevState);
    }

    return(
        <div className="NavbarIntern">
            <Link
                className={`NavbarInternItem ${
                    selectedPage === "Dashboard" ? "SelectedPage" : ""
                }`}
                to={`/intern/${internId}`}
            >Dashboard</Link>
            <div className={'NavbarInternItem ' +
                `${selectedPage === "Activities" ? "SelectedPage" : ""}`}
                 onClick = {handleClick}>
                Activities
                {isOpenDropDown && (
                    <DropDownCourses internId={internId}></DropDownCourses>
                )}
            </div>
            <Link
                className={`NavbarInternItem ${
                    selectedPage === "Feedbacks" ? "SelectedPage" : ""
                }`}
                to={`/intern/${internId}`}
            >Feedbacks</Link>
        </div>
    )
}
export default NavbarIntern;