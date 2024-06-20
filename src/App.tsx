
import "./App.css";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./layouts/HomePage/HomePage";
import LoginPage from "./layouts/LoginPage/LoginPage";
import AuthService from "./service/AuthService";
import { ToastProvider } from "./context/ToastContext";

import { JobpPage } from "./layouts/JobPage/JobPage";
import { JobDetailPage } from "./layouts/JobDetailPage/JobDetailPage";
import { ManagerPage } from "./layouts/ManagerPage/ManagerPage";
import { DashboardPage } from "./layouts/InternPage/DashBoardPage/DashboardPage";
import CourseActivityPage from "./layouts/InternPage/CourseActivityPage/CourseActivityPage";
import { LoadingSpinner2 } from "./layouts/Loading/LoadingSpinner2";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PostJobPage } from "./layouts/ManagerPage/PostJobPage";
import { AdminPage } from "./layouts/AdminPage/AdminPage";
import { ErrorPage } from "./layouts/404Page/ErrorPage";
import { ForgotPasswordPage } from "./layouts/ForgotPasswordPage/ForgotPasswordPage";
import { ForgotPasswordPage2 } from "./layouts/ForgotPasswordPage/ForgotPasswordPage2";
import { VerificationForgotPage } from "./layouts/ForgotPasswordPage/VerificationForgotPage";
import { SuccessPage } from "./layouts/SuccessPage/SuccessPage";
import { AdminCreateCompanyPage } from "./layouts/AdminPage/AdminCreateCompanyPage";
import { AdminViewUserInSystem } from "./layouts/AdminPage/AdminViewUserInSystem";

import ShowCourse from "./layouts/ShowCourse/ShowCourse";
import CreateCourse from "./model/CreateCourse";
import CreateCourseComponent from "./layouts/CreateCourse/CreateCourseComponent";
import { AdminCreateUser } from "./layouts/AdminPage/AdminCreateUser";
import { ManagerViewJobByCompany } from "./layouts/ManagerPage/ManagerViewJobByCompany";
import { AdminViewAllCompanyPage } from "./layouts/AdminPage/AdminViewAllCompanyPage";
import { MentorViewAllCoursePage } from "./layouts/MentorPage/Page/MentorViewAllCoursePage";
export const App = () => {

  const currentUser = AuthService.getCurrentUser();


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
              <Route path="/Workplace/Manager/viewJob" element={<ManagerViewJobByCompany/>}/>
              <Route path="/Admin" element={<AdminPage />} />
              <Route path="/intern" element={<DashboardPage />} />
              <Route path="/intern/:internId/course/:courseId" element={<CourseActivityPage />} />
              <Route path="/coordinator/course/:courseId" element={<ShowCourse />} />
              <Route path="coordinator/createCourse/:companyId" element={<CreateCourseComponent />} />
              <Route path="verify" element={<ForgotPasswordPage/>}/>
              <Route path="/forgotPassword" element={<ForgotPasswordPage2/>}/>
              <Route path="/verifyPassword" element={<VerificationForgotPage/>}/>
              <Route path="/Admin/CreateCompany" element={<AdminCreateCompanyPage/>}/>
              <Route path="/Admin/ViewUser" element={<AdminViewUserInSystem/>}/>
              <Route path="Admin/CreateUser" element={<AdminCreateUser/>}/>
              <Route path="/Admin/ViewAllCompany" element={<AdminViewAllCompanyPage/>}/>
              <Route path="/Mentor/ViewCourse" element={<MentorViewAllCoursePage/>}/>
              <Route path="*" element={<ErrorPage/>} />
              <Route path="/s" element={<SuccessPage/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
};
