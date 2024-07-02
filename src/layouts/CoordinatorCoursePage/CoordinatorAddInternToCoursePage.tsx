import React, { useState } from "react";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { NavbarCoordinator } from "../HeaderAndFooter/Navbar/NavbarCoordinator";
import CreateCourseComponent from "./CreateCourse/CreateCourseComponent";
import { AddListInternToCourse } from "./AddIntern/AddListInternToCourse";
import useAuth from "../../context/useAuth";

export const CoordinatorAddInternToCoursePage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
    useAuth(['ROLE_COORDINATOR']);


    const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <HeaderWorkplace />
      <div>
        <NavbarCoordinator/>
      </div>
      <div>
        <AddListInternToCourse/>
      </div>
      <Footer />
    </>
  );
};
