import React, { useState, useEffect } from "react";
import "../../../css/managertable.css";
import { useToast } from "../../../context/ToastContext";
import { Loading } from "../../Loading/Loading";
import { InsertActivitesPopup } from "../../popup/InsertActivitesPopup";
import { ApiViewAllCourseTaskByTable } from "../../../apis/MentorApis/ApiViewAllCourseTaskByTable";
import { CourseAndAllTaskResponse, Task } from "../../../model/CourseAndAllTaskResponse";
import "../../../css/Mentor/ViewAllActivitiesByTable.css";
import { FunctionOnTaskPopup } from "../../popup/Mentor/FunctionOnTaskPopup";
import { ApiDeleteTask } from "../../../apis/MentorApis/ApiDeleteTask";

export const ViewAllActivitesByTable = () => {
  const [courses, setCourses] = useState<CourseAndAllTaskResponse[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseAndAllTaskResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(undefined);
  const { showToast } = useToast();
  const [user, setUser] = useState<{user_id: number;company_id: number;} | null>(null);
  const [isFunctionPopupOpen, setIsFunctionPopupOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
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
  }, [pageNo, pageSize, debouncedSearchTerm, statusFilter, user]);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

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
          const pages = Math.ceil(data.totalItems / pageSize);
          console.log("Total Pages:", pages); // Debugging log
          setTotalPages(pages);
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

  const openPopup = (course: CourseAndAllTaskResponse) => {
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


  const handleTaskAction = (task: Task) => {
    console.log("Selected Task:", task); 
    console.log("task id: "+task.id);
    setSelectedTaskId(task.id);
    setSelectedTask(task);
    setIsFunctionPopupOpen(true);
  };

  const handleCancel = () => {
    setIsFunctionPopupOpen(false);
    setSelectedTaskId(null);
  };

  const handleDelete = async () => {
    if (selectedTaskId !== null) {
      try {
        await ApiDeleteTask(selectedTaskId)
        showToast("Task deleted successfully", "success");
        fetchActivities();
      } catch (error) {
        showToast("Failed to delete task", "error");
      } finally {
        handleCancel();
      }
    }
  };

  const filteredList = courses.filter((course) => {
    return (
      course.courseName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      course.courseId
        .toString()
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    );
  });

  return (
    
    <div className="application-container">
      <h1>Course List</h1>
      <div className="filter-controls ">
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
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredList.map((course) => (
                  <tr key={course.courseId}>
                    <td>{course.courseName}</td>
                    <td>{course.mentorName}</td>
                    <td>
                     <div className="container row">
                     {course.taskList.map((task) => (
                        <div className="col-md-4" key={task.id}>
                          <div className="ag-courses_item col-md-3" onClick={() => handleTaskAction(task)}>
                            <div className="ag-courses-item_link">
                              <div className="ag-courses-item_bg"></div>

                              <div className="ag-courses-item_title">
                                Task: {task.taskContent}
                              </div>
                              <div className="d-flex justify-content-between">
                                <div className="ag-courses-item_date-box">
                                  Start:
                                  <span className="ag-courses-item_date">
                                    {task.startDate}
                                  </span>
                                </div>
                                <div className="ag-courses-item_date-box">
                                  End:
                                  <span className="ag-courses-item_date">
                                    {task.endDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                     </div>
                    </td>
                    {/* <td>
                      <button onClick={() => openPopup(course)}>Add Activities</button>
                    </td> */}
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
      {isFunctionPopupOpen && (
        <FunctionOnTaskPopup
          message="Please choose an action for the task."
          onCancel={handleCancel}
          onDelete={handleDelete}
          isOpen={isFunctionPopupOpen}
          task={selectedTask}
          onTaskUpdate={fetchActivities}
        />
      )}
    </div>
  );
};
