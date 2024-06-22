import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../css/JobDetail.css";
import logoSample from "../../images/logoSample-.png";
import { Loading } from "../../Loading/Loading";
import { useToast } from "../../../context/ToastContext";
import ActivitesRequest from "../../../model/ActivitesRequest";
import { ApiAddActivities } from "../../../apis/MentorApis/ApiAddActivities";
import CourseMentorModel from "../../../model/CourseMentorModel";
import fetchCourseMentor from "../../../apis/MentorApis/CourseMentor";
import { ApiGetAllCourseOfMentor } from "../../../apis/MentorApis/ApiGetAllCourseOfMentor";

export const AddActivities: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const [taskContent, setTaskContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [courses, setCourses] = useState<CourseMentorModel[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [user, setUser] = useState<{user_id: number;company_id: number;} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
        if(user){
            setCompanyId(user.company_id.toString());
            console.log(companyId)
        }
        try {
          const data = await ApiGetAllCourseOfMentor(parseInt(companyId));
          setCourses(data.courses);
        } catch (error) {
          console.log("Error:", error);
        }
      
    };
    fetchData();
  }, [companyId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (courseId) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        const courseData: ActivitesRequest = {
          taskContent,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };

        const data = await ApiAddActivities(courseData, parseInt(courseId));
        setMessage(data);
        showToast(data, "success");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    } finally {
      setLoading(false);
    }
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
              <h1 id="h1-apply-now">Create Activities Now</h1>
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
                        Select Your Course
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
                  <label htmlFor="startDate" style={{ display: "block" }}>
                    Task content
                  </label>
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={taskContent}
                      onChange={(e) => setTaskContent(e.target.value)}
                      required
                    />
                  </div>
                </div>
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
                  <label htmlFor="startDate" style={{ display: "block" }}>
                    End Date
                  </label>

                  <div className="styled-input wide">
                    <input
                      type="date"
                      id="input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
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
        </>
      )}
    </div>
  );
};
