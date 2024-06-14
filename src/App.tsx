import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./layouts/HeaderAndFooter/Footer";
import "./style.css";
import { AboutUs } from "./layouts/HeaderAndFooter/AboutUs";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./layouts/HeaderAndFooter/Header";
import { HomePage } from "./layouts/HomePage/HomePage";
import LoginPage from "./layouts/LoginPage/LoginPage";
import AuthService from "./service/AuthService";
import { ToastProvider } from "./context/ToastContext";

import { JobpPage } from "./layouts/JobPage/JobPage";
import { JobDetailList } from "./layouts/JobDetailPage/JobDetailList";
import { JobDetailPage } from "./layouts/JobDetailPage/JobDetailPage";
import { ManagerPage } from "./layouts/ManagerPage/ManagerPage";
import { LoadingSpinner2 } from "./layouts/Loading/LoadingSpinner2";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const App = () => {

  const currentUser =AuthService.getCurrentUser();


  return (
    <ToastProvider>
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/login" element={ currentUser ? <Navigate to="/home"/>: <LoginPage/>} />
            <Route path="/jobs" element={<JobpPage/>} />
            <Route path="/jobs/search=:id" element={<JobpPage/>} />
            <Route path="/jobs/:id" element={<JobDetailPage/>} />
            <Route path="/Workplace/Manager" element={<ManagerPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
    </ToastProvider>
  );
};
