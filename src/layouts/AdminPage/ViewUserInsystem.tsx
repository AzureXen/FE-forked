import React, { useState, useEffect } from "react";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { getInformationResigeterUser } from "../../apis/ApiInformationResigeterUser";
import { Loading } from "../Loading/Loading";
import { useToast } from "../../context/ToastContext";
import { ViewRegisterInternsSystem } from "../../apis/ApiViewUser";
import UserInSysTem from "../../model/UserInSysTem";
import { UpdateUserInSystemPopup } from "../popup/UpdateUserInSystemPopup";
import { DeleteUser } from "../../apis/ApiDeleteUser";

export const ViewUserInsystem = () => {
  const [allUsers, setAllUsers] = useState<UserInSysTem[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<UserInSysTem[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedUserInSystem, setSelectedUserInSystem] = useState<UserInSysTem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(undefined);
  const { showToast } = useToast();

  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, allUsers]);

  useEffect(() => {
    paginateUsers();
  }, [pageNo, pageSize, filteredUserList]);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const data = await ViewRegisterInternsSystem(0, 1000000); // Fetch all users
      if (data) {
        setAllUsers(data.userList);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = allUsers;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUserList(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  const paginateUsers = () => {
    const start = pageNo * pageSize;
    const end = start + pageSize;
    return filteredUserList.slice(start, end);
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

  const openPopup = (user: UserInSysTem) => {
    setSelectedUserInSystem(user);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUserInSystem(null);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusFilter(value === "" ? undefined : value === "2" ? null : parseInt(value, 10));
    setPageNo(0);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await DeleteUser(id);
        showToast("User deleted successfully", "success");
        fetchUserList();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error occurred:', error.message);
          showToast(error.message, "error");
        } else {
          console.error('Unexpected error:', error);
          showToast("An unexpected error occurred", "error");
        }
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
      </div>
      {loading ? (
        <div className="loading-overlay">
          <p>
            <Loading />
          </p>
        </div>
      ) : (
        <div className="table-responsive mt-5">
          {filteredUserList.length > 0 ? (
            <table className="table rounded" id="table">
              <thead className="header">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Company Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginateUsers().map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.companyName}</td>
                    <td>
                      <button onClick={() => openPopup(user)}>Update</button>
                      <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      <UpdateUserInSystemPopup
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                        userInSysTem={selectedUserInSystem}
                      />
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
      <div className="page-size-controls">
        <label>
          Page Size:
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
    </div>
  );
};
