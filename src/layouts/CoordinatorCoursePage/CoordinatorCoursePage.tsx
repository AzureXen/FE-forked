import React, { useState, useEffect } from "react";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { Loading } from "../Loading/Loading";
import { useToast } from "../../context/ToastContext";
import CourseInSystem from "../../model/CourseInSystem";
import deleteCourse from "../../apis/CoordinatorApis/ApiDeleteCourse";
import { ApiCoordinatorShowCourse } from "../../apis/CoordinatorApis/ApiCoordinatorShowCourse";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import { NavbarCoordinator } from "../HeaderAndFooter/Navbar/NavbarCoordinator";
import useAuth from "../../context/useAuth";
import { motion} from "framer-motion";
import Cookies from "js-cookie";

export const ViewCourseInsystemByCoordinator = () => {
    const [courses, setCourses] = useState<CourseInSystem[]>([]);
    const [coursesList, setCoursesList] = useState<CourseInSystem[]>([]);
    const [pageNo, setPageNo] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] =
        useState<CourseInSystem | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<number | null | undefined>(
        undefined
    );
    const { showToast } = useToast();
    const [user, setUser] = useState<{ company_id: number } | null>(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
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
                const data = await ApiCoordinatorShowCourse(
                    user.company_id,
                    0,
                    100000
                );
                if (data) {
                    setCourses(data.courses);
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
        if (courses.length > 0) {
            const filteredCourses = courses.filter((course) => {
                const matchesSearchTerm =
                    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.courseId.toString().toLowerCase().includes(searchTerm.toLowerCase());

                const matchesStatusFilter =
                    statusFilter === undefined ||
                    (statusFilter === 2 && course.status === null) ||
                    course.status === statusFilter;

                return matchesSearchTerm && matchesStatusFilter;
            });

            const paginatedCourses = filteredCourses.slice(pageNo * pageSize, (pageNo + 1) * pageSize);
            setTotalItems(filteredCourses.length);
            setTotalPages(Math.ceil(filteredCourses.length / pageSize));
            setCoursesList(paginatedCourses);
        }
    }, [searchTerm, pageNo, pageSize, courses, statusFilter]);

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

    const openPopup = (course: CourseInSystem) => {
        setSelectedCourse(course);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedCourse(null);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setStatusFilter(
            value === "" ? undefined : value === "2" ? null : parseInt(value, 10)
        );
        setPageNo(0);
    };

    const handleDeleteCourse = async (courseId: number) => {
        if (window.confirm("Are you sure you want to delete this Course?")) {
            try {
                await deleteCourse(courseId);
                showToast("Course deleted successfully", "success");
                setCourses(courses.filter(course => course.courseId !== courseId));
            } catch (error) {
                showToast("Failed to delete course", "error");
            }
        }
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
    useAuth(['ROLE_INTERNSHIP_COORDINATOR']);

    return (
        <div>
            <HeaderWorkplace />
            <NavbarCoordinator/>
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            className="application-container mt-5 mb-5">
                <h1>Course List</h1>
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
                            <Loading />
                        </p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        {coursesList.length > 0 ? (
                            <table className="table rounded table-hover" id="table">
                                <thead className="header">
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Course Name</th>
                                        <th>Course Status</th>
                                        <th>Company name</th>
                                        <th>Mentor ID</th>
                                        <th>Mentor name</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursesList.map((course,index) => (
                                        <tr key={course.courseId} className={index % 2 === 0 ? "table-primary" : ""}>
                                            <td>{course.courseId}</td>
                                            <td>{course.courseName}</td>
                                            <td>
                                                <p className={changeColorByStatus(course.status)+" rounded"}>
                                                {getStatusLabel(course.status)}
                                                </p>
                                            </td>
                                            <td>{course.companyName}</td>
                                            <td>{course.mentorId}</td>
                                            <td>{course.mentorName}</td>
                                            <td>
                                                {new Date(course.startDate).toLocaleDateString("en-GB")}
                                            </td>
                                            <td>
                                                {new Date(course.endDate).toLocaleDateString("en-GB")}
                                            </td>
                                            <td>
                                                <button onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
                                            </td>
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
            </motion.div>
            <Footer />
        </div>
    );
};

export default ViewCourseInsystemByCoordinator;
