import React, { useEffect, useState } from "react";
import "../../../css/popup.css";
import { useToast } from "../../../context/ToastContext";
import ActivitesRequest from "../../../model/ActivitesRequest";
import { ApiUpdateActivities } from "../../../apis/MentorApis/ApiUpdateActivities";
import { Task } from "../../../model/CourseAndAllTaskResponse";

interface UpdateTaskPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseFunctionOnTask: () => void;
  taskId: number | null;
  task: Task | null;
}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = ({
  isOpen,
  onClose,
  onCloseFunctionOnTask,
  taskId,
  task,
}) => {
  const [animationClass, setAnimationClass] = useState("popup-entering");
  const [isClosing, setIsClosing] = useState(false);
  const { showToast } = useToast();
  const [taskContent, setTaskContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAnimationClass("popup-entering");
      setTimeout(() => {
        setAnimationClass("popup-entered");
      }, 100);
      if (task) {
        setTaskContent(task.taskContent);
        setStartDate(task.startDate);
        setEndDate(task.endDate);
      }
    } else {
      setAnimationClass("popup-exiting");
      setTimeout(() => {
        setIsClosing(true);
      }, 300);
    }
  }, [isOpen, task]);

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
      if (taskId) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        const taskData: ActivitesRequest = {
          taskContent,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };

        const data = await ApiUpdateActivities(taskData, taskId);
        setMessage(data);
        showToast(data, "success");
        onCloseFunctionOnTask();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    }
  };

  if (isClosing) return null;

  return (
    <div className={`blur-background ${animationClass}`}>
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className={`popup-content`}>
          <h2>Update Task {taskId}</h2>
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
              Update Task
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
