import React, { useState } from 'react';
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import { NavbarManager } from "../HeaderAndFooter/Navbar/NavbarManager";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { ViewRegisterUser } from './ViewRegisterUser';

export const AdminPage: React.FC = () => {
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
        <ViewRegisterUser/>
      </div>
      <Footer />
    </div>
  );
}
