import React, { useState } from 'react';
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import { NavbarManager } from "../HeaderAndFooter/Navbar/NavbarManager";
import { ViewApplication } from "./ViewApplication";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { ShowCourse } from './ShowCourse';
import { ViewJobByCompany } from './ViewJobByCompany';

export const ManagerViewJobByCompany: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace/>
      <div>
        <NavbarManager/>
      </div>
      <div>
        <ViewJobByCompany/>
        {/* <ShowCourse/> */}
      </div>
      <Footer />
    </div>
  );
}
