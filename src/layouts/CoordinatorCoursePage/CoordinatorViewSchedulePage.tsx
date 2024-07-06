import React, { useState } from "react";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { NavbarCoordinator } from "../HeaderAndFooter/Navbar/NavbarCoordinator";
import CreateCourseComponent from "./CreateCourse/CreateCourseComponent";
import { AddListInternToCourse } from "./AddIntern/AddListInternToCourse";
import useAuth from "../../context/useAuth";
import { ViewSchedule } from "./ViewSchedule/ViewSchedule";

export const CoordinatorViewSchedulePage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  

  return (
    <>
      <HeaderWorkplace />
      <div>
        <NavbarCoordinator/>
      </div>
      <div>
        <ViewSchedule/>
      </div>
      <Footer />
    </>
  );
};
