import React, { useState, useEffect } from "react";
import { getJobApplication } from "../../apis/ApiJobApplication";
import { Job, JobApplication, JobApplicationResponse } from "../../model/JobApplication";
import { downloadCV } from "../../apis/ApiDownloadCV";
import "../../css/managertable.css";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";
import InformationRegisterUser from "../../model/InformationRegisterUser";
import { registerInterns } from "../../apis/ApiCreateUser";
import { useToast } from "../../context/ToastContext";
import { Loading } from "../Loading/Loading";

export const ViewApplication = () => {
  const [allJobList, setAllJobList] = useState<Job[]>([]);
  const [currentJobList, setCurrentJobList] = useState<JobApplication[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(undefined);
  const [selectedJobApplication, setSelectedJobApplication] = useState<JobApplication | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<InformationRegisterUser[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { showToast } = useToast();
  const [user, setUser] = useState<{ company_id: number } | null>(null);
  const [companyId, setCompanyId] = useState<string>("");

  const openPopup = (application: JobApplication) => {
    setSelectedJobApplication(application);
    console.log("View application stauts:" +application.status);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJobApplication(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCompanyId(parsedUser.company_id.toString());
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchJobApplications();
    }
  }, [user]);

  const fetchJobApplications = async () => {
    setLoading(true);
    try {
      const data: JobApplicationResponse = await getJobApplication(0, 10000, parseInt(companyId));
      console.log(data);
      // Assign job reference to each job application
      const jobListWithJobRef = data.jobList.map((job) => ({
        ...job,
        jobApplications: job.jobApplications.map((application) => ({
          ...application,
          job: job
        }))
      }));
      setAllJobList(jobListWithJobRef);
      setTotalItems(data.totalItems);
      setTotalPages(Math.ceil(data.totalItems / pageSize));
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPageNo: number) => {
    if (newPageNo >= 0 && newPageNo < totalPages) {
      setPageNo(newPageNo);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  const handleDownloadCV = async (id: number, fileName: string, jobName: string) => {
    try {
      const cvBlob = await downloadCV(id);
      const url = window.URL.createObjectURL(new Blob([cvBlob], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `CV_${fileName}_${jobName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPageNo(0);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log("filter: "+value);
    setStatusFilter(value === "" ? undefined : value === "Pend" ? null : parseInt(value, 10));
    console.log("status: "+statusFilter);
    setPageNo(0);
  };

  useEffect(() => {
    if (allJobList.length > 0) {
      const filteredJobList = allJobList
        .map((job) => ({
          ...job,
          jobApplications: job.jobApplications.filter(
            (application) =>
              (application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                application.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.jobName.toLowerCase().includes(searchTerm.toLowerCase())) &&
              (statusFilter === undefined || application.status === statusFilter)
          ),
        }))
        .filter((job) => job.jobApplications.length > 0)
        .flatMap((job) => job.jobApplications);
        console.log(filteredJobList);
      setTotalItems(filteredJobList.length);
      setTotalPages(Math.ceil(filteredJobList.length / pageSize));
      setCurrentJobList(filteredJobList.slice(pageNo * pageSize, (pageNo + 1) * pageSize));
    }
  }, [searchTerm, pageNo, pageSize, allJobList, statusFilter]);

  const handleUpdateStatus = (id: number, newStatus: number) => {
    if (newStatus === 0) {
      setAllJobList((prevJobList) =>
        prevJobList.map((job) => ({
          ...job,
          jobApplications: job.jobApplications.filter((application) => application.id !== id),
        }))
      );
    } else {
      setAllJobList((prevJobList) =>
        prevJobList.map((job) => ({
          ...job,
          jobApplications: job.jobApplications.map((application) =>
            application.id === id ? { ...application, status: newStatus } : application
          ),
        }))
      );
    }
  };

  const handleUserSelect = (user: InformationRegisterUser) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.find((u) => u.jobApplicationId === user.jobApplicationId)) {
        return prevSelected.filter((u) => u.jobApplicationId !== user.jobApplicationId);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setLoading(true);
    try {
      await registerInterns(selectedUsers);
      showToast("Register successfully", "success");
      fetchJobApplications();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error registering users:", error);
      showToast("Error registering users", "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

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
    <div className="application-container">
      <h1>Job Applications</h1>
      <div className="filter-controls">
        <div className="input-group d-flex flex-row justify-content-center">
          <input
            type="text"
            className="input-search"
            placeholder="Search by Email, Full Name, or Job Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="input-group-prepend" id="icon">
            <span className="input-group-text" id="basic-addon1">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        <select value={statusFilter === null ? "2" : statusFilter} onChange={handleStatusChange} id="filter">
          <option value={""}>Filter</option>
          <option value={"Pend"}>Pending</option>
          <option value={1}>Accept</option>
          <option value={2}>Pending Interview</option>
          <option value={3}>Absent</option>
          <option value={4}>Passed</option>
          <option value={5}>Pending Rescheduling</option>
        </select>
      </div>
      {loading ? (
        <p><Loading /></p>
      ) : (
        <div className="table-responsive">
          {currentJobList.length > 0 ? (
            <table className="table rounded table-hover" id="table">
              <thead className="header">
                <tr>
                  <th>Select</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Status</th>
                  <th>Job Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentJobList.map((application,index ) => (
                  <tr key={application.id} className={index % 2 ===0 ?"table-primary": ""}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.some((user) => user.jobApplicationId === application.id)}
                        onChange={() =>
                          handleUserSelect(
                            new InformationRegisterUser(
                              application.id,
                              application.fullName,
                              application.email,
                              application.job.company.id,
                              application.job.company.companyName,
                              "ROLE_INTERN"
                            )
                          )
                        }
                      />
                    </td>
                    <td>{application.email}</td>
                    <td>{application.fullName}</td>
                    <td>
                      <p className={changeColorByStatus(application.status) + " rounded"}>
                        {getStatusLabel(application.status)}
                      </p>
                    </td>
                    <td>{application.job.jobName}</td>
                    <td>
                      <button
                        className="button-delete"
                        onClick={() => handleDownloadCV(application.id, application.fullName, application.job.jobName)}
                      >
                        Download CV
                      </button>
                      <button className="button-update" onClick={() => openPopup(application)}>
                        Review CV
                      </button>
                      <UpdateJobApplicationPopup
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                        jobApplication={selectedJobApplication}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No job applications found.</p>
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
          <div className="submit-controls">
            <button onClick={handleSubmit} disabled={selectedUsers.length === 0 || submitting}>
              {submitting ? "Registering..." : "Register Selected Users"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
