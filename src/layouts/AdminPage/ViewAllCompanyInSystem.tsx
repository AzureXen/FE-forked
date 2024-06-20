import React, { useState, useEffect } from "react";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import InformationRegisterUser from "../../model/InformationRegisterUser";
import { getInformationResigeterUser } from "../../apis/ApiInformationResigeterUser";
import { registerInterns } from "../../apis/ApiCreateUser";
import { Loading } from "../Loading/Loading";
import { useToast } from "../../context/ToastContext";
import { CompanyResponseAllInfo } from "../../model/CompanyResponse";
import { ApiViewAllCompanyInSystem } from "../../apis/ApiViewAllCompanyInAdmin";
import { DeleteCompany } from "../../apis/ApiDeleteCompany";

export const ViewAllCompanyInSystem = () => {
  const [companyList, setCompanyList] = useState<CompanyResponseAllInfo[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] =useState<CompanyResponseAllInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(undefined);
  const [selectedCompanyInSystem, setSelectedCompanyInSystem] = useState<CompanyResponseAllInfo[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchUserList();
  }, [pageNo, pageSize]);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const data = await ApiViewAllCompanyInSystem(pageNo, pageSize);
      if (data) {
        setCompanyList(data.companyList);
        setTotalItems(data.totalItems);
        setTotalPages(Math.ceil(data.totalPages));
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
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

  const openPopup = (company: CompanyResponseAllInfo) => {
    setSelectedCompany(company);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCompany(null);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusFilter(
      value === "" ? undefined : value === "2" ? null : parseInt(value, 10)
    );
    setPageNo(0);
  };


  const handleSubmit = async () => {
    setSubmitting(true);
    try {
    //   await registerInterns(selectedUsers);
    //   setSelectedUsers([]);
      fetchUserList();
    } catch (error) {
      console.error("Error registering users:", error);
    } finally {
      showToast("Success to register", "success");
      setSubmitting(false);
    }
  };
  const filteredUserList = companyList.filter(
    (user) =>
      (user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
  );
  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await DeleteCompany(id);
        showToast("User deleted successfully", "success");
        fetchUserList();
      } catch (error) {
        showToast("Failed to delete user", "error");
      }
    }
  };
  return (
    <div className="application-container">
      <h1>User List</h1>
      <div className="filter-controls">
        <div className="input-group d-flex flex-row justify-content-center">
          <input
            type="text"
            className="input-search"
            placeholder="Search by Full Name, Email, Company Name"
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
      {loading || submitting ? ( // Display loading state when loading or submitting
        <div className="loading-overlay">
          <p>
            <Loading />
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          {filteredUserList.length > 0 ? (
            <table className="table rounded" id="table">
              <thead className="header">
                <tr>
                  <th>Company Name</th>
                  <th>Discription</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUserList.map((company) => (
                  <tr key={company.id}>
                    <td>{company.companyName}</td>
                    <td>{company.companyDescription}</td>
                    <td>{company.location}</td>
                    <td>
                      <button onClick={() => openPopup(company)}>Update</button>
                      <button onClick={() => handleDeleteUser(company.id)}>Delete</button>
                      {/* <UpdateJobApplicationPopup
                                                isOpen={isPopupOpen}
                                                onClose={closePopup}
                                                jobApplication={selectedJobApplication}
                                            /> */}
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
      <div className="page-size-controls">
        <label>
          Page Size:
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
      <div className="submit-controls">

      </div>
    </div>
  );
};
