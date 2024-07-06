import React, { useState, useEffect } from "react";
import "../../../css/managertable.css";
import { useToast } from "../../../context/ToastContext";
import { DeleteUser } from "../../../apis/ApiDeleteUser";
import { Loading } from "../../Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { ApiShowSchedule } from "../../../apis/CoordinatorApis/ShowSchedule/ApiShowSchedule";
import ScheduleResponse from "../../../model/Coordinator/ScheduleResponse";
import { DeleteSchedule } from "../../../apis/CoordinatorApis/ShowSchedule/DeleteSchedule";

export const ViewSchedule = () => {
  const [allSchedules, setAllSchedules] = useState<ScheduleResponse[]>([]);
  const [filteredScheduleList, setFilteredScheduleList] = useState<ScheduleResponse[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { showToast } = useToast();
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
    fullName: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (user?.user_id && user?.company_id) {
      fetchScheduleList();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, allSchedules]);

  useEffect(() => {
    setTotalItems(filteredScheduleList.length);
    setTotalPages(Math.ceil(filteredScheduleList.length / pageSize));
  }, [filteredScheduleList, pageSize]);

  const fetchScheduleList = async () => {
    setLoading(true);
    try {
      const data = await ApiShowSchedule(0, 100000, user!.company_id);
      if (data) {
        setAllSchedules(data.schedules);
      }
    } catch (error) {
      console.error("Error fetching schedule list:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = allSchedules;

    if (searchTerm) {
      filtered = filtered.filter((schedule) =>
        schedule.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredScheduleList(filtered);
  };

  const paginateUsers = () => {
    const start = pageNo * pageSize;
    const end = start + pageSize;
    return filteredScheduleList.slice(start, end);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPageNo(0);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await DeleteSchedule(id);
        showToast("Schedule deleted successfully", "success");
        fetchScheduleList();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error occurred:", error.message);
          showToast(error.message, "error");
        } else {
          console.error("Unexpected error:", error);
          showToast("An unexpected error occurred", "error");
        }
      }
    }
  };

  return (
    <motion.div
      className="application-container mt-5"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Schedule List</h1>
      <div className="filter-controls">
        <div className="input-group d-flex flex-row justify-content-center">
          <input
            type="text"
            className="input-search"
            placeholder="Search by Full Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="input-group-prepend" id="icon">
            <span className="input-group-text" id="basic-addon1">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="loading-overlay">
          <p>
            <Loading />
          </p>
        </div>
      ) : (
        <div className="table-responsive mt-5">
          {filteredScheduleList.length > 0 ? (
            <table className="table rounded table-hover" id="table">
              <thead className="header">
                <tr>
                  <th>Title</th>
                  <th>Candidate Name</th>
                  <th>Start time</th>
                  <th>End time</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginateUsers().map((schedule, index) => (
                  <tr key={schedule.id} className={index % 2 === 0 ? "table-primary" : ""}>
                    <td>{schedule.title}</td>
                    <td>{schedule.name}</td>
                    <td>{schedule.start}</td>
                    <td>{schedule.end}</td>
                    <td>{schedule.description}</td>
                    <td>
                      <button className="button-delete" onClick={() => handleDeleteUser(schedule.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
      <div className="pagination-controls pagination-style-one m-t-20 justify-content-center align-items-center">
        <a onClick={() => handlePageChange(0)} aria-disabled={pageNo === 0}>
          <i className="fa fa-angle-double-left" aria-hidden="true"></i>
        </a>
        <a onClick={() => handlePageChange(pageNo - 1)} aria-disabled={pageNo === 0}>
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
        <a onClick={() => handlePageChange(pageNo + 1)} aria-disabled={pageNo >= totalPages - 1}>
          Next
        </a>
        <a onClick={() => handlePageChange(totalPages - 1)} aria-disabled={pageNo >= totalPages - 1}>
          <i className="fa fa-angle-double-right" aria-hidden="true"></i>
        </a>
      </div>
    </motion.div>
  );
};
