import React, { useState, useEffect } from "react";
import "../../../css/managertable.css"; // Nhớ import CSS đã tạo
import { HelpResponse } from "../../../model/Home/HelpResponse";
import { useToast } from "../../../context/ToastContext";
import { ApiViewReq } from "../../../apis/Admin/ApiViewReq";
import { Loading } from "../../Loading/Loading";
import { motion } from "framer-motion";
import { ApiUpdateStatusRequest } from "../../../apis/Admin/ApiUpdateStatusRequest";

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const AdminViewRequest: React.FC = () => {
  const [helps, setHelps] = useState<HelpResponse[]>([]);
  const [helpsList, setHelpsList] = useState<HelpResponse[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const { showToast } = useToast();
  const [user, setUser] = useState<{ company_id: number } | null>(null);
  const [loadingRequestId, setLoadingRequestId] = useState<number | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 580); // 580ms debounce delay

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserList();
    }
  }, [pageNo, pageSize, debouncedSearchTerm, filter, user]);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      if (user) {
        console.log("company: " + user.company_id);
        const data = await ApiViewReq(0, 100000);
        if (data) {
          setHelps(data.requests);
          console.log(data);
          setTotalItems(data.courses.length);
          setTotalPages(Math.ceil(data.courses.length / pageSize));
        }
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (helps.length > 0) {
      const filteredCourses = helps.filter((help) => {
        const matchesSearchTerm =
          help.requestType
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          help.requestContent
            .toString()
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase());
        if (filter === "") {
          return matchesSearchTerm;
        }

        const [typeFilter, statusFilter] = filter.split(":");

        const matchesTypeFilter =
          typeFilter === "" ||
          help.requestType.toLowerCase().includes(typeFilter.toLowerCase());

        const matchesStatusFilter =
          statusFilter === "" ||
          (statusFilter === "null" && help.requestStatus === null) ||
          (statusFilter === "true" && help.requestStatus === true) ||
          (statusFilter === "false" && help.requestStatus === false);

        return matchesSearchTerm && matchesTypeFilter && matchesStatusFilter;
      });

      const paginatedCourses = filteredCourses.slice(
        pageNo * pageSize,
        (pageNo + 1) * pageSize
      );
      setTotalItems(filteredCourses.length);
      setTotalPages(Math.ceil(filteredCourses.length / pageSize));
      setHelpsList(paginatedCourses);
    }
  }, [debouncedSearchTerm, pageNo, pageSize, helps, filter]);

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setLoading(true);
    setPageNo(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    setPageNo(0);
  };
  const handleUpdate = async (id: number) => {
    try {
      setLoadingRequestId(id);
      await ApiUpdateStatusRequest(id);
      showToast("User deleted successfully", "success");
      fetchUserList();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error occurred:", error.message);
        showToast(error.message, "error");
      } else {
        console.error("Unexpected error:", error);
        showToast("An unexpected error occurred", "error");
      }
    }finally{
      setLoadingRequestId(null);
    }
  };
  const getStatusLabel = (status: boolean | null) => {
    switch (status) {
      case false:
        return "Pending";
      case true:
        return "Completed";
      default:
        return;
    }
  };

  const changeColorByStatus = (status: boolean | null) => {
    switch (status) {
      case false:
        return "Pending";
      case true:
        return "Passed";
      case null:
        return "Finished";
      default:
        return;
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="application-container mt-5">
          <h1>Request List</h1>
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
            <select value={filter} onChange={handleFilterChange} id="filter">
              <option value={""}>Filter by Type and Status</option>
              <option value={"Create Company:"}>Create Company</option>
              <option value={"Other:"}>Other</option>
              <option value={":false"}>Pending</option>
              <option value={":true"}>Completed</option>
              <option value={"Create Company:false"}>
                Create Company - Pending
              </option>
              <option value={"Create Company:true"}>
                Create Company - Completed
              </option>
              <option value={"Other:false"}>Other - Pending</option>
              <option value={"Other:true"}>Other - Completed</option>
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
              {helpsList.length > 0 ? (
                <table className="table rounded" id="table">
                  <thead className="header">
                    <tr>
                      <th>No</th>
                      <th>Help Type</th>
                      <th>User name</th>
                      <th>Help Description</th>
                      <th>Company Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {helpsList.map((help, index) => (
                      <tr key={help.id}>
                        <td>{index + 1 + pageNo * pageSize}</td>
                        <td>
                          <strong>{help.requestType}</strong>
                        </td>
                        <td>{help.user ? help.user.fullName : "None"}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: help.requestContent,
                          }}
                        ></td>
                        <td>
                          <p
                            className={
                              changeColorByStatus(help.requestStatus) +
                              " rounded"
                            }
                          >
                            {getStatusLabel(help.requestStatus)}
                          </p>
                        </td>
                        <td>
                        <button
                            className="button-delete"
                            onClick={() => handleUpdate(help.id)}
                            disabled={loadingRequestId === help.id}
                          >
                            {loadingRequestId === help.id ? "Waiting..." : "Approve"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No help requests found.</p>
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
        </div>
      </motion.div>
    </div>
  );
};
