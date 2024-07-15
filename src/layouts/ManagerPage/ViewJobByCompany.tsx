import React, { useState, useEffect } from "react";
import "../../css/managertable.css";
import JobByCompanyResponse from "../../model/JobByCompanyResponse";
import { getAllJobByCompanyResponse } from "../../apis/ApiJobByCompanyResponse";
import { Loading } from "../Loading/Loading";
import { useToast } from "../../context/ToastContext";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";
import { UpdateJobInCompanyPopup } from "../popup/UpdateJobInCompanyPopup";
import { ApiDeleteJobInCompany } from "../../apis/ManagerApis/ApiDeleteJobInCompany";
import { ConfirmDialog } from "../popup/ConfirmationPopup";
import { motion} from "framer-motion";
import Cookies from "js-cookie";

export const ViewJobByCompany = () => {
  const [jobList, setJobList] = useState<JobByCompanyResponse[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { showToast } = useToast();
  const [user, setUser] = useState<{ company_id: number } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedJobInSystem, setSelectedJobInSystem] =
    useState<JobByCompanyResponse | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [allJob, setAllJob] = useState<JobByCompanyResponse[]>([]);
  const [filteredJobNewList, setFilteredJobNewList] = useState<JobByCompanyResponse[]>([]);
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (user?.company_id) {
      fetchJobList();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, allJob]);

  useEffect(() => {
    setTotalItems(filteredJobNewList.length);
    setTotalPages(Math.ceil(filteredJobNewList.length / pageSize));
  }, [filteredJobNewList, pageSize]);

  const fetchJobList = async () => {
    setLoading(true);
    try {
      if(user){
        const data=await getAllJobByCompanyResponse(user.company_id, 0, 100000);
        setAllJob(data.jobs);
        console.log(jobList)
      }
    } catch (error) {
      console.error("Error fetching schedule list:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = allJob;

    if (searchTerm) {
      filtered = filtered.filter((job) =>
        job.jobName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobNewList(filtered);
  };

  const paginateJob = () => {
    const start = pageNo * pageSize;
    const end = start + pageSize;
    return filteredJobNewList.slice(start, end);
  };


  const formatParagraphs = (text: string) => {
    return text.split("\\n").map((str, index) => <p key={index}>{str}</p>);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPageNo(0);
  };

  const openPopup = (job: JobByCompanyResponse) => {
    setSelectedJobInSystem(job);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJobInSystem(null);
  };

  const refreshJobList = () => {
    fetchJobList();
  };

  const openConfirmDialog = (jobId: number) => {
    setJobToDelete(jobId);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
    setJobToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (jobToDelete !== null) {
      try {
        const data = await ApiDeleteJobInCompany(jobToDelete);
        showToast(data, "success");
        fetchJobList();
      } catch (error) {
        showToast("Failed to delete job", "error");
      } finally {
        closeConfirmDialog();
      }
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="application-container mt-5 mb-5">
      <h1>Job List</h1>
      <div className="filter-controls">
        <div className="input-group d-flex flex-row justify-content-center mb-5">
          <input
            type="text"
            className="input-search"
            placeholder="Search by Job Name or Description"
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
          {filteredJobNewList.length > 0 ? (
            <table className="table rounded tableJob table-hover" id="table">
              <thead className="header">
                <tr>
                  <th>Job Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginateJob().map((job) => (
                  <tr key={job.id}>
                    <td className="jobDes">{job.jobName}</td>
                    <td className="jobDes">{formatParagraphs(job.jobDescription)}</td>
                    <td>
                      <button onClick={() => openPopup(job)} className="mt-5 button-update">
                        Update
                      </button>
                      <button onClick={() => openConfirmDialog(job.id)} className="mt-5 button-delete">
                        Delete
                      </button>
                      <UpdateJobInCompanyPopup
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                        jobInComay={selectedJobInSystem}
                        onJobUpdated={refreshJobList}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No jobs found.</p>
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
      <ConfirmDialog
        message="This action is irreversible. Do you want to proceed?"
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirmDialog}
        isOpen={isConfirmDialogOpen}
      />
    </motion.div>
  );
};
