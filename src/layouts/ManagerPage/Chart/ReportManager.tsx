import React, { useEffect, useState } from 'react';
import { HeaderWorkplace } from '../../HeaderAndFooter/HeaderWorkplace';
import { NavbarManager } from '../../HeaderAndFooter/Navbar/NavbarManager';
import MyPieChart from './PieChartManager';
import { Footer } from '../../HeaderAndFooter/Footer';


export const ReportManager: React.FC = () => {


  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace/>
      <div>
        <NavbarManager/>
      </div>
      <div >
        <MyPieChart/>
      </div>
      <Footer/>
    </div>
  );
}
