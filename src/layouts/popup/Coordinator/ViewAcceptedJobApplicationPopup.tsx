import React, { useEffect, useState } from "react";
import "../../../css/popup.css";
import { useToast } from "../../../context/ToastContext";
import { Job } from "../../../model/Coordinator/JobApplicationAccepted";
import { ApiShowAllJobApplicationAccepted } from "../../../apis/CoordinatorApis/ApiShowAllJobApplicationAccepted";
import { Loading } from "../../Loading/Loading";
import AddScheduleRequest from "../../../model/AddScheduleRequest";
import "../../../css/Coordinator/ViewAcceptedJobApplicationPopup.css";

interface ViewAcceptedJobApplicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string | null;
  onSelectApplications: (applications: AddScheduleRequest[]) => void;
}

export const ViewAcceptedJobApplicationPopup: React.FC<
  ViewAcceptedJobApplicationPopupProps
> = ({ isOpen, onClose, companyId, onSelectApplications }) => {
  const [animationClass, setAnimationClass] = useState("popup-entering");
  const [isClosing, setIsClosing] = useState(false);
  const { showToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(4);
  const [jobList, setJobList] = useState<Job[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(
    undefined
  );
  const [selectedUsers, setSelectedUsers] = useState<Job[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedJobApplication, setSelectedJobApplication] =
    useState<Job | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAnimationClass("popup-entering");
      setTimeout(() => {
        setAnimationClass("popup-entered");
      }, 100);
    } else {
      setAnimationClass("popup-exiting");
      setTimeout(() => {
        setIsClosing(true);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchJobApplicationList = async () => {
      setLoading(true);
      try {
        console.log("falkfnewlkfn" + companyId);
        if (companyId) {
          const data = await ApiShowAllJobApplicationAccepted(
            companyId,
            pageNo,
            pageSize
          );

          if (data) {
            setJobList(data.jobApplications);
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

    fetchJobApplicationList();
  }, [companyId, pageNo, pageSize]);

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
      // Your submit logic here
      const selectedApplications = selectedUsers.map((user) => ({
        applicationId: user.jobApplicationId,
      }));
      onSelectApplications(selectedApplications);
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPageNo(0);
  };
  const filteredUserList = jobList.filter(
    (job) =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (job: Job) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(job)) {
        return prevSelectedUsers.filter((selectedUser) => selectedUser !== job);
      } else {
        return [...prevSelectedUsers, job];
      }
    });
  };

  const openPopup = (job: Job) => {
    setSelectedJobApplication(job);
    setIsPopupOpen(true);
  };

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  };
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUserList);
    }
    setSelectAll(!selectAll);
  };
  if (isClosing) return null;
  const getStatusLabel = (status: number | null) => {
    switch (status) {
      case 0:
        return "Reject";
      case 1:
        return "Accept";
      case 2:
          return "Pending Interview";
      case 3:
          return "Absent";
      case 4:
          return "Passed";
      case 5:
          return "Pending Rescheduling"
      case null:
        return "Pending";
      default:
        return;
    }
  };

  const changeColorByStatus = (status: number | null) => {
    switch (status) {
      case 1:
        return "Accept";
      case 2:
          return "Pending-Interview";
      case 3:
          return "Absent";
      case 4:
          return "Passed";
      case 5:
          return "Pending-rescheduling"
      case null:
        return "Pending";
      default:
        return;
    }
  };
  return (
    <div className={`blur-background ${animationClass}`}>
      <div className="container d-flex align-items-center justify-content-center">
      <div className="application-list-container container-fluid">
      <div className="application-container-popup">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          <h1>Application List</h1>
          <div className="filter-controls">
            <div className="input-group d-flex flex-row justify-content-center">
              <input
                type="text"
                className="input-search "
                placeholder="Search now"
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
          {loading || submitting ? (
            <div className="loading-overlay">
              <p>
                <Loading />
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              {filteredUserList.length > 0 ? (
                <table className="table rounded table-hover" id="table">
                  <thead className="header">
                    <tr>
                      <th>
                        {" "}
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />{" "}
                        Select
                      </th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Company Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUserList.map((job,index) => (
                      <tr key={job.jobApplicationId} className={index % 2 === 0 ? "table-primary" : ""}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(job)}
                            onChange={() => handleCheckboxChange(job)}
                          />
                        </td>
                        <td>{job.fullName}</td>
                        <td>{job.email}</td>
                        <td>{job.companyName}</td>
                        <td>
                        <p className={changeColorByStatus(job.status) + " rounded"}>
                        {getStatusLabel(job.status)}
                      </p>
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
          <div className="container d-flex justify-content-around">
       
            <div className="submit-controls col-md-12">
              <button
                className="add-application"
                onClick={handleSubmit}
                disabled={selectedUsers.length === 0 || submitting}
              >
                {submitting ? "Registering..." : "Add Selected Application"}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
