import React, { useEffect, useState } from "react";
import "../../../css/popup.css";
import { useToast } from "../../../context/ToastContext";
import { Loading } from "../../Loading/Loading";
import "../../../css/Coordinator/ViewAcceptedJobApplicationPopup.css";
import { fetchInterns } from "../../../apis/CoordinatorApis/ApiFetchInterns";
import AddInternRequest from "../../../model/Coordinator/AddInternRequest";
import InternInfo from "../../../model/Coordinator/InternInfo";

interface ViewAddInternPopupProps {
    isOpen: boolean;
    onClose: () => void;
    companyId: number | null;
    onSelectIntern: (intern: AddInternRequest[]) => void;
}

export const ViewAddInternPopup: React.FC<ViewAddInternPopupProps> = ({ isOpen, onClose, companyId, onSelectIntern }) => {
    const [animationClass, setAnimationClass] = useState("popup-entering");
    const [isClosing, setIsClosing] = useState(false);
    const { showToast } = useToast();
    // const [taskContent, setTaskContent] = useState<string>("");
    // const [startDate, setStartDate] = useState<string>("");
    // const [endDate, setEndDate] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [pageNo, setPageNo] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(3);
    const [interList, setInternList] = useState<InternInfo[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<number | null | undefined>(undefined);
    const [selectedInterns, setSelectedInterns] = useState<InternInfo[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [selectedInternApplication, setSelectedInternApplication] = useState<InternInfo | null>(null);
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
        const fetchInternApplicationList = async () => {
            setLoading(true);
            try {
                console.log(companyId);
                if (companyId) {
                    console.log(companyId);
                    const data = await fetchInterns(
                        companyId,
                        pageNo,
                        pageSize
                    );
                    console.log(data);
                    if (data) {
                        setInternList(data.userAccountList);
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

        fetchInternApplicationList();
    }, [companyId, pageNo, pageSize]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Your submit logic here
            const selectedIntern = selectedInterns.map((user) => ({
                internId: user.id,
            }));
            onSelectIntern(selectedIntern);
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
    const filteredInternList = interList.filter(
        (intern) =>
        (intern.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intern.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleCheckboxChange = (intern: InternInfo) => {
        setSelectedInterns((prevSelectedInterns) => {
            if (prevSelectedInterns.includes(intern)) {
                return prevSelectedInterns.filter(
                    (selectedIntern) => selectedIntern !== intern
                );
            } else {
                return [...prevSelectedInterns, intern];
            }
        });
    };

    
    const openPopup = (intern: InternInfo) => {
        setSelectedInternApplication(intern);
        setIsPopupOpen(true);
    };

    const handlePageChange = (newPageNo: number) => {
        setPageNo(newPageNo);
        const allSelectedInPage = filteredInternList.every((intern) =>
            selectedInterns.some((selectedIntern) => selectedIntern.id === intern.id)
        );
        setSelectAll(allSelectedInPage);
    };

    const handlePageSizeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNo(0);
    };
    const handleSelectAllChange = () => {
        if (selectAll) {
            const newSelectedInterns = selectedInterns.filter(
                (selectedIntern) => !filteredInternList.some(intern => intern.id === selectedIntern.id)
            );
            setSelectedInterns(newSelectedInterns);
        } else {
            const newSelectedInterns = [
                ...selectedInterns,
                ...filteredInternList.filter(
                    (intern) => !selectedInterns.some(selectedIntern => selectedIntern.id === intern.id)
                )
            ];
            setSelectedInterns(newSelectedInterns);
        }
        setSelectAll(!selectAll);
    };
    if (isClosing) return null;

    return (
        <div className={`blur-background ${animationClass}`}>
            <div className="container d-flex align-items-center justify-content-center h-100">
                <div className="application-container">
                    <button className="close-button" onClick={onClose}>Close</button>
                    <h1 className="h1-add-intern">Add Intern</h1>
                    <div className="filter-controls mb-2">
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
                            {filteredInternList.length > 0 ? (
                                <table className="table rounded" id="table">
                                    <thead className="header">
                                        <tr>
                                            <th> <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAllChange}
                                            />  Select</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInternList.map((intern) => (
                                            <tr key={intern.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedInterns.includes(intern)}
                                                        onChange={() => handleCheckboxChange(intern)}
                                                    />
                                                </td>
                                                <td>{intern.fullName}</td>
                                                <td>{intern.email}</td>
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
                    <div className="page-size-controls col-md-4">
                        <label>
                            Page Size:
                            <select value={pageSize} onChange={handlePageSizeChange}>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </label>
                    </div>
                    <div className="submit-controls col-md-8">
                        <button
                            className="add-application"
                            onClick={handleSubmit}
                            disabled={selectedInterns.length === 0 || submitting}
                        >
                            {submitting ? "Registering..." : "Add Intern"}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
