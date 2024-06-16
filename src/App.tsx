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
import { PostJobPage } from "./layouts/ManagerPage/PostJobPage";
import { AdminPage } from "./layouts/AdminPage/AdminPage";
import { ErrorPage } from "./layouts/404Page/ErrorPage";

export const App = () => {

  const currentUser =AuthService.getCurrentUser();


  return (
    <ToastProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
              <Route path="/jobs" element={<JobpPage />} />
              <Route path="/jobs/search=:id" element={<JobpPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/Workplace/Manager" element={<ManagerPage />} />
              <Route path="/Workplace/Manager/postJob" element={<PostJobPage />} />
              <Route path="/Admin" element={<AdminPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
};
