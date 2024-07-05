import React, { useEffect, useState } from 'react';
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import { NavbarManager } from "../HeaderAndFooter/Navbar/NavbarManager";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { ViewEmployee } from './ViewEmployee/ViewEmployee';

export const ViewEmployeePage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState<{ role: string } | null>(null);


  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace/>
      <div>
        <NavbarManager/>
      </div>
      <div>
        <ViewEmployee/>
      </div>
      <Footer />
    </div>
  );
}
