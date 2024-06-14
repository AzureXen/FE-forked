
import "./App.css";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "./layouts/HomePage/HomePage";
import LoginPage from "./layouts/LoginPage/LoginPage";
import AuthService from "./service/AuthService";
import { ToastProvider } from "./context/ToastContext";

import { JobpPage } from "./layouts/JobPage/JobPage";
import { JobDetailPage } from "./layouts/JobDetailPage/JobDetailPage";
import { ManagerPage } from "./layouts/ManagerPage/ManagerPage";
import {DashboardPage} from "./layouts/InternPage/DashBoardPage/DashboardPage";
import CourseActivityPage from "./layouts/InternPage/CourseActivityPage/CourseActivityPage";
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
            <Route path="/intern/:internId" element={<DashboardPage />} />
            <Route path="/intern/:internId/course/:courseId" element={<CourseActivityPage />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ToastProvider>
  );
};
