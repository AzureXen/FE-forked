import React, { useState, useEffect } from "react";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import InformationRegisterUser from "../../model/InformationRegisterUser";
import { getInformationResigeterUser } from "../../apis/ApiInformationResigeterUser";
import { registerInterns } from "../../apis/ApiCreateUser";
import { Loading } from "../Loading/Loading";
import { useToast } from "../../context/ToastContext";

export const ViewRegisterUser = () => {
  const [userList, setUserList] = useState<InformationRegisterUser[]>([]);
  const [allUsers, setAllUsers] = useState<InformationRegisterUser[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedJobApplication, setSelectedJobApplication] =
    useState<InformationRegisterUser | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(
    undefined
  );
  const [selectedUsers, setSelectedUsers] = useState<InformationRegisterUser[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchUserList();
  }, [pageNo, pageSize]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allUsers.filter((user) =>
        user.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserList(filtered);
      setTotalItems(filtered.length);
      setTotalPages(Math.ceil(filtered.length / pageSize));
    } else {
      setUserList(allUsers.slice(pageNo * pageSize, (pageNo + 1) * pageSize));
      setTotalItems(allUsers.length);
      setTotalPages(Math.ceil(allUsers.length / pageSize));
    }
  }, [searchTerm, allUsers, pageNo, pageSize]);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const data = await getInformationResigeterUser(0, 1000); // Fetch a large number of records
      if (data) {
        setAllUsers(data.userList);
        setUserList(data.userList.slice(pageNo * pageSize, (pageNo + 1) * pageSize));
        setTotalItems(data.totalItems);
        setTotalPages(Math.ceil(data.totalItems / pageSize));
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

  const openPopup = (user: InformationRegisterUser) => {
    setSelectedJobApplication(user);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJobApplication(null);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusFilter(
      value === "" ? undefined : value === "2" ? null : parseInt(value, 10)
    );
    setPageNo(0);
  };

  const handleCheckboxChange = (user: InformationRegisterUser) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user)) {
        return prevSelectedUsers.filter(
          (selectedUser) => selectedUser !== user
        );
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await registerInterns(selectedUsers);
      setSelectedUsers([]);
      fetchUserList();
    } catch (error) {
      console.error("Error registering users:", error);
    } finally {
      showToast("Success to register", "success");
      setSubmitting(false);
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
            placeholder="Search by Company Name"
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
          {userList.length > 0 ? (
            <table className="table rounded" id="table">
              <thead className="header">
                <tr>
                  <th>Select</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Company Name</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.jobApplicationId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user)}
                        onChange={() => handleCheckboxChange(user)}
                      />
                    </td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.companyName}</td>
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
        <button
          onClick={handleSubmit}
          disabled={selectedUsers.length === 0 || submitting}
        >
          {submitting ? "Registering..." : "Register Selected Users"}
        </button>
      </div>
    </div>
  );
};
