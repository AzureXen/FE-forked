import React, { useEffect, useState } from 'react';
import { HeaderWorkplace } from '../../HeaderAndFooter/HeaderWorkplace';
import { NavbarAdmin } from '../../HeaderAndFooter/Navbar/NavbarAdmin';
import { AdminViewRequest } from './AdminViewRequest';
import { Footer } from '../../HeaderAndFooter/Footer';


export const AdminViewRequestPage: React.FC = () => {

  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace/>
      <div>
        <NavbarAdmin/>
      </div>
      <div>
        <AdminViewRequest/>
      </div>
      <Footer/>
    </div>
  );
}
