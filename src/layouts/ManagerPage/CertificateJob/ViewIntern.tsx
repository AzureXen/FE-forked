import React, { useState, useEffect } from "react";
import "../../../css/managertable.css"; // Make sure this CSS is correctly referenced
import UserInSysTem from "../../../model/UserInSysTem";
import { useToast } from "../../../context/ToastContext";
import { ViewRegisterInternsSystem } from "../../../apis/ApiViewUser";
import { DeleteUser } from "../../../apis/ApiDeleteUser";
import { Loading } from "../../Loading/Loading";
import { ApiViewIntern } from "../../../apis/ManagerApis/ApiViewIntern";
import { CertificateJob } from "./CertificateJob";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import InternInSystem from "../../../model/Manager/InternInSystem";
import { UpdateUserInSystemPopup } from "../../popup/UpdateUserInSystemPopup";

export const ViewIntern = () => {
  const [allUsers, setAllUsers] = useState<InternInSystem[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<InternInSystem[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<InternInSystem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedUserInSystem, setSelectedUserInSystem] =
    useState<InternInSystem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<number | null | undefined>(
    undefined
  );
  const { showToast } = useToast();
  const [userId, setUserId] = useState<number>();
  const [companyId, setCompanyId] = useState<number>();
  const [fullNameOnGoingUser, setFullNameOnGoingUser] = useState<string>("");
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
    fullName: string;
  } | null>(null);
  const [userPdfUrls, setUserPdfUrls] = useState<{ [key: number]: string | undefined }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.user_id);
      setCompanyId(parsedUser.company_id);
      setFullNameOnGoingUser(parsedUser.fullName);
    }
  }, []);

  useEffect(() => {
    if (userId && companyId) {
      fetchUserList();
    }
  }, [userId, companyId]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, allUsers]);

  useEffect(() => {
    paginateUsers();
  }, [pageNo, pageSize, filteredUserList]);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      if (userId != null && companyId != null) {
        const data = await ApiViewIntern(0, 1000000, userId, companyId);
        if (data) {
          setAllUsers(data.userInfoResponses);
        }
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
      filtered = filtered.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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

  const openPopup = (user: InternInSystem) => {
    setSelectedUserInSystem(user);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUserInSystem(null);
    fetchUserList();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusFilter(
      value === "" ? undefined : value === "2" ? null : parseInt(value, 10)
    );
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
          console.error("Error occurred:", error.message);
          showToast(error.message, "error");
        } else {
          console.error("Unexpected error:", error);
          showToast("An unexpected error occurred", "error");
        }
      }
    }
  };

  const handleSendCertificate = (user: InternInSystem) => {
    setSelectedUser(user);
  };

  const handlePdfUrlUpdate = (userId: number, pdfUrl: string | undefined) => {
    setUserPdfUrls((prevUrls) => ({
      ...prevUrls,
      [userId]: pdfUrl,
    }));
  };

  return (
    <div className={`mt-4 ${selectedUser ? 'container-fluid' : 'container-fluid smaller'}`}>
      <div className="row">
        <motion.div
          className={`application-container ${selectedUser ? 'col-md-6' : 'col-md-12'}`}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Intern List</h1>
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
                <table className="table rounded table-hover" id="table">
                  <thead className="header">
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Company Name</th>
                      <th>Intern Info</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginateUsers().map((user, index) => (
                      <tr key={user.id} className={index % 2 === 0 ? "table-primary" : ""}>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.companyName}</td>
                        <td className="detail" dangerouslySetInnerHTML={{ __html: user.detail }}></td>
                        <td>
                          <button className="button-edit" onClick={() => openPopup(user)}>
                            Edit
                          </button>
                          <UpdateUserInSystemPopup
                            isOpen={isPopupOpen}
                            onClose={closePopup}
                            userInSysTem={selectedUserInSystem}
                          />
                          <button className="button-send-certificate" onClick={() => handleSendCertificate(user)}>
                            View Certificate
                          </button>
                          {userPdfUrls[user.id] && (
                            <a href={userPdfUrls[user.id]} target="_blank" rel="noopener noreferrer">
                              <button className="button-link">
                                Click to link to Certificate
                              </button>
                            </a>
                          )}
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
        </motion.div>
        <div className={`${selectedUser ? 'col-md-6' : 'position-out'}`}>
          <Fade>
            {selectedUser && (
              <CertificateJob
                user={selectedUser}
                onComplete={() => setSelectedUser(null)}
                managerName={fullNameOnGoingUser}
                resetPdfUrl={() => handlePdfUrlUpdate(selectedUser.id, undefined)}
                updatePdfUrl={(url: string) => handlePdfUrlUpdate(selectedUser.id, url)}
              />
            )}
          </Fade>
        </div>
      </div>
    </div>
  );
};
