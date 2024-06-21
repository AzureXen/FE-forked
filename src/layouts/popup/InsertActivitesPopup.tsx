import React, { useEffect, useState } from "react";
import "../../css/popup.css";
import { useToast } from "../../context/ToastContext";
import ActivitesRequest from "../../model/ActivitesRequest";
import { ApiAddActivities } from "../../apis/MentorApis/ApiAddActivities";

interface InsertActivitesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number | null;
}

export const InsertActivitesPopup: React.FC<InsertActivitesPopupProps> = ({
  isOpen,
  onClose,
  courseId,
}) => {
  const [animationClass, setAnimationClass] = useState("popup-entering");
  const [isClosing, setIsClosing] = useState(false);
  const { showToast } = useToast();
  const [taskContent, setTaskContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (courseId) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        const courseData: ActivitesRequest = {
          taskContent,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };

        await ApiAddActivities(courseData, courseId);
        showToast("Activities added successfully!", "success");
        onClose();
      }
    } catch (error) {
      showToast("Error adding activities!", "error");
    }
  };

  if (isClosing) return null;

  return (
    <div className={`blur-background ${animationClass}`}>
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className={`popup-content`}>
          <h2>Add Activities For Course {courseId}</h2>
          <form onSubmit={handleSubmit}>
            <div className="col-xs-12">
            <label htmlFor="startDate" style={{ display: "block" }}>
                Task content
              </label>
            <div className="styled-input wide">
           
                <input
                  type="text"
                  id="input"
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-xs-12">
              <label htmlFor="startDate" style={{ display: "block" }}>
                Start Date
              </label>

              <div className="styled-input wide">
                <input
                  type="date"
                  id="input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-xs-12">
              <label htmlFor="startDate" style={{ display: "block" }}>
                End Date
              </label>

              <div className="styled-input wide">
                <input
                  type="date"
                  id="input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Activities
            </button>
          </form>
          <i
            className="fa-solid fa-x position-absolute top-0 end-0"
            id="x-button"
            onClick={onClose}
          ></i>
          <button
            className="btn btn-secondary position-absolute bottom-0 start-50 translate-middle-x close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
