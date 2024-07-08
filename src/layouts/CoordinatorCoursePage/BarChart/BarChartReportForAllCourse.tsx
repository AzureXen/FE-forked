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
import { ApiViewResultCoordinator } from "../../../apis/CoordinatorApis/ApiViewResultCoordinator";
import { motion} from "framer-motion";

export const BarChartReportForAllCourse: React.FC = () => {
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState<CourseMentorModel[]>([]);
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
  } | null>(null);
  const [companyId, setCompanyId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<InternResult[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCompanyId(parsedUser.company_id.toString());
    }
  }, [companyId]);

  useEffect(() => {
    const fetchDataResult = async () => {
      try {
        setLoading(true);
        if (user) {
          const data = await ApiViewResultCoordinator(parseInt(companyId));
          console.log(data);
          setResult(data.getInternResultFromCourseResponses);
          console.log(data);
        }
        console.log(result);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataResult();
  }, [companyId]);

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
  };

  const paginatedResults = result.slice(
    pageNo * itemsPerPage,
    (pageNo + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(result.length / itemsPerPage);

  return (
    <>
      <motion.div
         initial={{ opacity: 0, x: -200 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 1.0 }}
      className="container rounded mb-5 d-flex justify-content-center align-items-center mt-5" id="job-block">
        <div className="row input-container">
          <h1 id="h1-apply-now">Statistical Chart</h1>

          {loading ? (
            <Loading />
          ) : (
            <div className="col-xs-12">
              <h2 id="h2">Assess By Result</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  className="BarChart"
                  data={paginatedResults}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="internName" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="result" fill="#FF7F24" name="Result (%)" />
                </BarChart>
              </ResponsiveContainer>
              <div>
                <h2 id="h2">Assess By Completed Task</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    className="BarChart"
                    data={paginatedResults}
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="internName" type="category" />
                    <YAxis type="number" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalTask" fill="#8884d8" name="Total Tasks" />
                    <Bar
                      dataKey="completedTasks"
                      fill="#82ca9d"
                      name="Completed Tasks"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="pagination-controls pagination-style-one m-t-20 justify-content-center align-items-center">
                <a onClick={() => handlePageChange(0)} aria-disabled={pageNo === 0}>
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </a>
                <a
                  onClick={() => handlePageChange(pageNo - 1)}
                  aria-disabled={pageNo === 0}
                >
                  Prev
                </a>
                {[...Array(totalPages)].map((_, index) => (
                  <a
                    key={index}
                    className={pageNo === index ? "selected" : ""}
                    id="pagination-number-box"
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  onClick={() => handlePageChange(pageNo + 1)}
                  aria-disabled={pageNo >= totalPages - 1}
                >
                  Next
                </a>
                <a
                  onClick={() => handlePageChange(totalPages - 1)}
                  aria-disabled={pageNo >= totalPages - 1}
                >
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
