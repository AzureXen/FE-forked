import React, { useState } from "react";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { NavbarCoordinator } from "../HeaderAndFooter/Navbar/NavbarCoordinator";
import CreateCourseComponent from "./CreateCourse/CreateCourseComponent";
import useAuth from "../../context/useAuth";

export const CoordinatorCreateCoursePage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  useAuth(['ROLE_INTERNSHIP_COORDINATOR']);

  return (
    <>
      <HeaderWorkplace />
      <div>
        <NavbarCoordinator/>
      </div>
      <div>
        <CreateCourseComponent/>
      </div>
      <Footer />
    </>
  );
};
