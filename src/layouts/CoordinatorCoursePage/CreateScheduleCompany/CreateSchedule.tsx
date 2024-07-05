import React, { useState, useEffect } from "react";
import { useToast } from "../../../context/ToastContext";
import { Loading } from "../../Loading/Loading";
import { ViewAcceptedJobApplicationPopup } from "../../popup/Coordinator/ViewAcceptedJobApplicationPopup";
import { ApiCreateScheduleForInterview } from "../../../apis/CoordinatorApis/ApiCreateScheduleForInterview";
import { ApiGetAllCourseOfMentor } from "../../../apis/MentorApis/ApiGetAllCourseOfMentor";
import AddScheduleRequest from "../../../model/AddScheduleRequest";
import CourseMentorModel from "../../../model/CourseMentorModel";
import "../../../css/Coordinator/CreateScheduleCoordinator.css";

export const CreateSchedule: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const [startDate, setStartDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [courses, setCourses] = useState<CourseMentorModel[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [user, setUser] = useState<{ user_id: number; company_id: number } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedApplications, setSelectedApplications] = useState<AddScheduleRequest[]>([]);
  const [time, setTime] = useState<string>("");
  const [acceptedApplications, setAcceptedApplications] = useState<AddScheduleRequest[]>([]); // New state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCompanyId(parsedUser.company_id.toString());
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiGetAllCourseOfMentor(companyId);
        setCourses(data.courses);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);

      const formattedStartDate = formatDate(startDate) + ' ' + formatTime(time);

      const scheduleRequest = {
        time: formattedStartDate,
        applicationId: selectedApplications.map((jobApplication) => ({ applicationId: jobApplication.applicationId })),
        location: location,
      };

      console.log('Request Payload:', scheduleRequest);

      const data = await ApiCreateScheduleForInterview(selectedApplications, formattedStartDate, location);
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

  const handleSelectApplications = (applications: AddScheduleRequest[]) => {
    setSelectedApplications(applications);
    setAcceptedApplications((prev) => [...prev, ...applications]);
  };

  return (
    <div className="job-detail">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <div className="container rounded mb-5 mt-5 d-flex justify-content-center align-items-center" id="job-block">
            <div className="row input-container">
              <h1 id="h1-apply-now">Create Schedule</h1>
              <form onSubmit={handleSubmit}>
                <div className="col-xs-12">
                  <label htmlFor="startDate" style={{ display: "block" }}>
                    Start Date
                  </label>
                  <div className="styled-input wide">
                    <input
                      type="date"
                      id="input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12">
                  <label htmlFor="time" style={{ display: "block" }}>
                    Start Time
                  </label>
                  <div className="styled-input wide">
                    <input
                      type="time"
                      id="input"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12">
                  <label htmlFor="location" style={{ display: "block" }}>
                    Location
                  </label>
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12">
                  <button
                    type="button"
                    id=""
                    className="btn-lrg insert rounded"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Add Accepted Job Applications ({acceptedApplications.length})
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
            <ViewAcceptedJobApplicationPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              companyId={companyId}
              onSelectApplications={handleSelectApplications}
            />
          )}
        </>
      )}
    </div>
  );
};
