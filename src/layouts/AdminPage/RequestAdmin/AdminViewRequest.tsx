import React, { useState, useEffect } from "react";
import "../../../css/managertable.css"; // Nhớ import CSS đã tạo
import { HelpResponse } from "../../../model/Home/HelpResponse";
import { useToast } from "../../../context/ToastContext";
import { ApiViewReq } from "../../../apis/Admin/ApiViewReq";
import { Loading } from "../../Loading/Loading";


export const AdminViewRequest = () => {
    const [helps, setHelps] = useState<HelpResponse[]>([]);
    const [helpsList, setHelpsList] = useState<HelpResponse[]>([]);
    const [pageNo, setPageNo] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<number | null | undefined>(
        undefined
    );
    const { showToast } = useToast();
    const [user, setUser] = useState<{ company_id: number } | null>(null);

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
    }, [pageNo, pageSize, searchTerm, statusFilter, user]);

    const fetchUserList = async () => {
        setLoading(true);
        try {
            if (user) {
                console.log("company: " + user.company_id);
                const data = await ApiViewReq(
                    0,
                    100000
                );
                if (data) {
                    setHelps(data.requests);
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
                    help.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    help.requestContent.toString().toLowerCase().includes(searchTerm.toLowerCase());

                const matchesStatusFilter =
                    statusFilter === undefined ||
                    (statusFilter === 2 && help.requestStatus === null) ||
                    help.requestStatus === statusFilter;

                return matchesSearchTerm && matchesStatusFilter;
            });

            const paginatedCourses = filteredCourses.slice(pageNo * pageSize, (pageNo + 1) * pageSize);
            setTotalItems(filteredCourses.length);
            setTotalPages(Math.ceil(filteredCourses.length / pageSize));
            setHelpsList(paginatedCourses);
        }
    }, [searchTerm, pageNo, pageSize, helps, statusFilter]);

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

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setStatusFilter(
            value === "" ? undefined : value === "2" ? null : parseInt(value, 10)
        );
        setPageNo(0);
    };

    const getStatusLabel = (status: number | null) =>{
        switch(status){
          case 0:
            return "Not start";
          case 1:
            return "On going";
          case null:
            return "Finished";
          default:
            return;
        }
    };

    const changeColorByStatus = (status : number | null) =>{
        switch(status){
            case 0:
              return "Not-start";
            case 1:
              return "On-going";
            case null:
              return "Finished";
            default:
              return;
        }
    };
    // ==useAuth(['ROLE_INTERNSHIP_COORDINATOR']);

    return (
        <div>
            <div className="application-container">
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
                    <select
                        value={statusFilter === null ? "2" : statusFilter}
                        onChange={handleStatusChange}
                        id="filter"
                    >
                        <option value={""}>Filter</option>
                        <option value={"2"}>Finished</option>
                        <option value={0}>Not start</option>
                        <option value={1}>On going</option>
                    </select>
                </div>
                {loading ? (
                    <div className="loading-overlay">
                        <p>
                            <Loading/>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {helpsList.map((help,index) => (
                                        <tr key={help.id}>
                                             <td>{index + 1+pageNo*pageSize}</td>
                                            <td>{help.requestType}</td>
                                            <td>{help.user ? help.user.fullName : "None"}</td>
                                            <td dangerouslySetInnerHTML={{ __html: help.requestContent }}></td>                                            {/* <td>
                                                <p className={changeColorByStatus(course.status)+" rounded"}>
                                                {getStatusLabel(course.status)}
                                                </p>
                                            </td> */}
                                            <td>{help.requestStatus}</td>
                                            {/* <td>
                                                <button onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No courses found.</p>
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
            </div>
        </div>
    );
};

