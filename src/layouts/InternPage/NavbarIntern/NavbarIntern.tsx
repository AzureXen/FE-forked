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
                to={`/intern`}
            >Dashboard</Link>
            <div className={'NavbarInternItem ' +
                `${selectedPage === "Activities" ? "SelectedPage" : ""}`}
                 onClick = {handleClick}>
                Activities
                {isOpenDropDown && (
                    <DropDownCourses internId={internId}></DropDownCourses>
                )}
            </div>
        </div>
    )
}
export default NavbarIntern;