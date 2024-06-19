import React, { useState } from "react";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { CreateCompanyPage } from "./CreateCompany";
import { NavbarAdmin } from "../HeaderAndFooter/Navbar/NavbarAdmin";
import { CreateUser } from "./CreateUser";

export const AdminCreateUser: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <HeaderWorkplace />
      <div>
        <NavbarAdmin/>
      </div>
      <div>
        <CreateUser/>
      </div>
      <Footer />
    </>
  );
};
