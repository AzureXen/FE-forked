import React, { useState, useEffect } from "react";
import "../../../css/managertable.css";
import { useToast } from "../../../context/ToastContext";
import CourseMentorModel from "../../../model/CourseMentorModel";
import { ApiViewAllCourseMentor } from "../../../apis/ApiViewAllCourseMentor";
import { Loading } from "../../Loading/Loading";
import { InsertActivitesPopup } from "../../popup/InsertActivitesPopup";
import { ApiViewAllCourseTaskByTable } from "../../../apis/MentorApis/ApiViewAllCourseTaskByTable";
import { CourseAndAllTaskResponse } from "../../../model/CourseAndAllTaskResponse";
import "../../../css/Mentor/ViewAllActivitiesByTable.css";

export const ViewAllActivitesByTable = () => {
  const [courses, setCourses] = useState<CourseAndAllTaskResponse[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] =useState<CourseMentorModel | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(
    undefined
  );
  const { showToast } = useToast();
  const [user, setUser] = useState<{ user_id: number, company_id: number } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
        fetchActivities();
    }
  }, [pageNo, pageSize, searchTerm, statusFilter, user]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      if (user) {
        console.log(user.user_id);
        const data = await ApiViewAllCourseTaskByTable(
          user.user_id,
          user.company_id,
          pageNo,
          pageSize
        );
        if (data) {
          setCourses(data.courseList);
          setTotalItems(data.totalItems);
          setTotalPages(Math.ceil(data.totalItems / pageSize));
        }
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPageNo: number) => {
    if (newPageNo >= 0 && newPageNo < totalPages) {
      setPageNo(newPageNo);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPageNo(0);
  };

  const openPopup = (course: CourseMentorModel) => {
    setSelectedCourse(course);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCourse(null);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusFilter(
      value === "" ? undefined : value === "2" ? null : parseInt(value, 10)
    );
    setPageNo(0);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // await DeleteCompany(id);
        showToast("User deleted successfully", "success");
        fetchActivities();
      } catch (error) {
        showToast("Failed to delete user", "error");
      }
    }
  };

  const filteredList = courses.filter((course) => {
    return (
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseId
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="application-container">
      <h1>Course List</h1>
      <div className="filter-controls">
        <div className="input-group d-flex flex-row justify-content-center">
          <input
            type="text"
            className="input-search"
            placeholder="Search by Course Name, Course ID"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="input-group-prepend" id="icon">
            <span className="input-group-text" id="basic-addon1">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        <select
          value={statusFilter === null ? "2" : statusFilter}
          onChange={handleStatusChange}
          id="filter"
        >
          <option value={""}>Filter</option>
          <option value={"2"}>Pending</option>
          <option value={0}>Reject</option>
          <option value={1}>Accept</option>
        </select>
      </div>
      {loading ? (
        <div className="loading-overlay">
          <p>
            <Loading />
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          {filteredList.length > 0 ? (
            <table className="table rounded" id="table">
              <thead className="header">
                <tr>
                  <th>Course Name</th>
                  <th>Mentor Name</th>
                  <th>Activities</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((course) => (
                  <tr key={course.courseId}>
                    <td>{course.courseName}</td>
                    <td>
                      {course.mentorName}
                    </td>
                    <td>
                      {course.taskList.map((task)=>(
                        <div className="task-card" key={task.id}>
                            <p className="content">Task: {task.taskContent}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {/* <button onClick={() => openPopup(course)}>Add Activities</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      )}
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
      <div className="page-size-controls">
        <label>
          Page Size:
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
      {isPopupOpen && selectedCourse && (
        <InsertActivitesPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          courseId={selectedCourse.courseId}
        />
      )}
    </div>
  );
};
