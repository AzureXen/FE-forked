import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CourseMentorModel from "../../../model/CourseMentorModel";
import { ApiGetAllCourseOfMentor } from "../../../apis/MentorApis/ApiGetAllCourseOfMentor";
import { Loading } from "../../Loading/Loading";
import InternResult from "../../../model/Mentor/InternResult";
import { ApiViewResultInMentor } from "../../../apis/MentorApis/ApiViewResultInMentor";
import "../../../css/Mentor/BarChart.css";

export const BarChartReport: React.FC = () => {
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState<CourseMentorModel[]>([]);
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
  } | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<InternResult[]>([]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.user_id.toString());
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiGetAllCourseOfMentor(userId);
        setCourses(data.courses);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchDataResult = async () => {
      try {
        setLoading(true);
        if (user) {
          const data = await ApiViewResultInMentor(
            user.user_id,
            parseInt(courseId)
          );
          setResult(data.getListInternResultFromCourse);
        }
        console.log(result);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataResult();
  }, [courseId]);

  return (
    <>
      <div className="container rounded mb-5" id="job-block">
        <div className="row input-container">
          <h1 id="h1-apply-now">View Report Now</h1>
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
          {loading ? (
            <Loading />
          ) : (
            <div className="col-xs-12">
              <h2 id="h2">Access By Result</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  className="BarChart"
                  data={result}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="internName" type="category" />
                  <Tooltip />
                  <Legend />
                  {/* <Bar dataKey="totalTask" fill="#8884d8" name="Total Tasks" />
                <Bar dataKey="completedTasks" fill="#82ca9d" name="Completed Tasks" /> */}
                  <Bar dataKey="result" fill="#FF7F24" name="Result (%)" />
                </BarChart>
              </ResponsiveContainer>
              <div>
              <h2 id="h2">Access By Completed Task</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    className="BarChart"
                    data={result}
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="internName" type="category" /> // Change to
                    XAxis with dataKey="internName"
                    <YAxis type="number" /> // Change to YAxis
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="totalTask"
                      fill="#8884d8"
                      name="Total Tasks"
                    />
                    <Bar
                      dataKey="completedTasks"
                      fill="#82ca9d"
                      name="Completed Tasks"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
