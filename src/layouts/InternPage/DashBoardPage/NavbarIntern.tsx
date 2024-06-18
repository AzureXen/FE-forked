import React from "react";
import {Link} from "react-router-dom";
import '../../../css/InternDashboard/NavbarIntern.css'
interface NavbarProps{
    internId : string;
    selectedPage : string;
}
const NavbarIntern :React.FC<NavbarProps> = ({internId, selectedPage})=>{
    return(
        <div className="NavbarIntern">
            <Link
                className={`NavbarInternItem ${
                    selectedPage === "Dashboard" ? "SelectedPage" : ""
                }`}
                to={`/intern/${internId}`}
            >Dashboard</Link>
            <Link
                className={`NavbarInternItem ${
                    selectedPage === "Activities" ? "SelectedPage" : ""
                }`}
                to={`/intern/${internId}`}
            >Activities</Link>
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