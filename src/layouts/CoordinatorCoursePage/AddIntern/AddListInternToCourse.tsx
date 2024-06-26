import React, { useState, useEffect } from "react";
import { useToast } from "../../../context/ToastContext";
import { Loading } from "../../Loading/Loading";
import { ViewAcceptedJobApplicationPopup } from "../../popup/Coordinator/ViewAcceptedJobApplicationPopup";
import { ApiCreateScheduleForInterview } from "../../../apis/CoordinatorApis/ApiCreateScheduleForInterview";
import { ApiGetAllCourseOfMentor } from "../../../apis/MentorApis/ApiGetAllCourseOfMentor";
import AddScheduleRequest from "../../../model/AddScheduleRequest";
import CourseMentorModel from "../../../model/CourseMentorModel";
import "../../../css/Coordinator/CreateScheduleCoordinator.css";
import { ViewAddInternPopup } from "../../popup/Coordinator/ViewAddInternPopup";
import AddInternRequest from "../../../model/Coordinator/AddInternRequest";
import { ApiAddInternToCourse } from "../../../apis/CoordinatorApis/ApiAddInternToCourse";
import { ApiGetAllCourseInSystem } from "../../../apis/CoordinatorApis/ApiGetAllCourseInSystem";

export const AddListInternToCourse: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const [startDate, setStartDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [courses, setCourses] = useState<CourseMentorModel[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [companyId, setCompanyId] = useState<number>(0);
  const [user, setUser] = useState<{ user_id: number; company_id: number } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedApplications, setSelectedApplications] = useState<AddInternRequest[]>([]);
  const [time, setTime] = useState<string>("");
  const [acceptedApplications, setAcceptedApplications] = useState<AddInternRequest[]>([]); // New state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCompanyId(parsedUser.company_id.toString());
    }
  }, [companyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("awefawef"+companyId);
        const data = await ApiGetAllCourseInSystem(companyId);
        setCourses(data.courses);
        console.log(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (companyId) {
      fetchData();
    }
  }, [companyId]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
        console.log("akfjewkjfwekjf awekjf wekjf ewakjf aj fjewakjfn")

      const InternRequest = {
        internId: selectedApplications.map((intern) => ({ internId: intern.internId })),
      };
      console.log('Request Payload:', InternRequest);

      const data = await ApiAddInternToCourse(parseInt(courseId), selectedApplications);
      showToast(data, "success");
    

    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error occurred:', error.message);
          showToast(error.message, "error");
        } else {
          console.error('Unexpected error:', error);
          showToast("An unexpected error occurred", "error");
        }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectApplications = (applications: AddInternRequest[]) => {
    setSelectedApplications(applications);
    setAcceptedApplications(applications);
  };

  return (
    <div className="job-detail">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <div className="container rounded mb-5" id="job-block">
            <div className="row input-container">
              <h1 id="h1-apply-now">Add Intern to Course</h1>
              <form onSubmit={handleSubmit}>
              <div className="col-xs-12">
            <div className="styled-input wide">
              <select
                id="input"
                required
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Course
                </option>
                {courses.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>
          </div>
                <div className="col-xs-12">
                  <button
                    type="button"
                    id=""
                    className="btn-lrg insert rounded"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Add Intern ({acceptedApplications.length})
                  </button>
                </div>
                <div className="col-xs-12">
                  <button
                    type="submit"
                    id="btn-apply"
                    className="btn-lrg submit-btn"
                  >
                    Create
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                    <span className="fourth"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {isPopupOpen && (
            <ViewAddInternPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              companyId={companyId}
              onSelectIntern={handleSelectApplications}
              selectedApplications={selectedApplications} 
            />
          )}
        </>
      )}
    </div>
  );
};
