import React, { useState } from "react";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { NavbarCoordinator } from "../HeaderAndFooter/Navbar/NavbarCoordinator";
import CreateCourseComponent from "./CreateCourse/CreateCourseComponent";
import { CreateSchedule } from "./CreateScheduleCompany/CreateSchedule";

export const CoordinatorCreateSchedulePage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <HeaderWorkplace />
      <div>
        <NavbarCoordinator/>
      </div>
      <div>
        <CreateSchedule/>
      </div>
      <Footer />
    </>
  );
};
