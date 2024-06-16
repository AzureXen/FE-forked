import React, { useState, useEffect } from "react";
import { getJobApplication } from "../../apis/ApiJobApplication";
import { Job, JobApplication, JobApplicationResponse} from "../../model/JobApplication";
import { downloadCV } from "../../apis/ApiDownloadCV";
import "../../css/managertable.css";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";

export const ViewApplication = () => {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(
    undefined
  );
  const [selectedJobApplication, setSelectedJobApplication] =
    useState<JobApplication | null>(null);

  const openPopup = (application: JobApplication) => {
    setSelectedJobApplication(application);
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJobApplication(null);
  };

  const [user, setUser] = useState<{ company_id: number } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchJobApplications = async () => {
        setLoading(true);
        try {
          console.log("Fetching job applications with params:", { pageNo, pageSize, companyId: user.company_id });
          const data: JobApplicationResponse = await getJobApplication(pageNo, pageSize, user.company_id);
          console.log("Fetched data:", data);
          setJobList(data.jobList);
          setTotalItems(data.totalItems);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error("Error fetching job applications:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchJobApplications();
    }
  }, [pageNo, pageSize, user]);


  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  const handleDownloadCV = async (
    id: number,
    fileName: string,
    jobName: string
  ) => {
    try {
      const cvBlob = await downloadCV(id);
      const url = window.URL.createObjectURL(
        new Blob([cvBlob], { type: "application/pdf" })
      );
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
    setStatusFilter(value === "" ? undefined : value === "2" ? null : parseInt(value, 10));
    setPageNo(0);
  };
  const handleUpdateStatus = (id: number, newStatus: number) => {
    if (newStatus === 0) { // 0 means 'Reject'
      setJobList((prevJobList) =>
        prevJobList.map((job) => ({
          ...job,
          jobApplications: job.jobApplications.filter(
            (application) => application.id !== id
          ),
        }))
      );
    } else {
      setJobList((prevJobList) =>
        prevJobList.map((job) => ({
          ...job,
          jobApplications: job.jobApplications.map((application) =>
            application.id === id ? { ...application, status: newStatus } : application
          ),
        }))
      );
    }
  };

  const filteredJobList = jobList
    .map((job) => ({
      ...job,
      jobApplications: job.jobApplications.filter(
        (application) =>
          (application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            job.jobName.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (statusFilter === undefined || application.status === statusFilter)
      ),
    }))
    .filter((job) => job.jobApplications.length > 0);

    const getStatusLabel = (status: number | null) =>{
      switch(status){
        case 0:
          return "Reject";
        case 1:
          return "Accept";
        case null:
          return "Pending";
        default:
          return;
      }
    }

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
          <option value={"2"}>Pending</option>
          <option value={0}>Reject</option>
          <option value={1}>Accept</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          {filteredJobList.length > 0 ? (
            <table className="table rounded" id="table">
              <thead className="header">
                <tr>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Status</th>
                  <th>Job Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobList.map((job) =>
                  job.jobApplications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.email}</td>
                      <td>{application.fullName}</td>
                      <td>{getStatusLabel(application.status)}</td>
                      <td>{job.jobName}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDownloadCV(
                              application.id,
                              application.fullName,
                              job.jobName
                            )
                          }
                        >
                          Download CV
                        </button>
                        <button onClick={() => openPopup(application)}>
                          Update
                        </button>
                        <UpdateJobApplicationPopup
                          isOpen={isPopupOpen}
                          onClose={closePopup}
                          jobApplication={selectedJobApplication}
                          onUpdateStatus={handleUpdateStatus}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p>No job applications found.</p>
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
      )}
    </div>
  );
};
