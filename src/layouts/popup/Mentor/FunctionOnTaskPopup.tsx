import React, { useEffect, useState } from "react";
import "../../../css/popup.css";
import { Task } from "../../../model/CourseAndAllTaskResponse";
import { UpdateTaskPopup } from "./UpdateTaskPopup";

interface FunctionOnTaskPopupProps {
  message: string;
  onCancel: () => void;
  onDelete: () => void;
  isOpen: boolean;
  task: Task | null;
  onTaskUpdate: () => void;
}

export const FunctionOnTaskPopup: React.FC<FunctionOnTaskPopupProps> = ({
  message,
  onCancel,
  onDelete,
  isOpen,
  task,
  onTaskUpdate,
}) => {
  const [animationClass, setAnimationClass] = useState("popup-entering");
  const [isClosing, setIsClosing] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [taskId, setTaskId] = useState<number>(0);

  useEffect(() => {
    if (task) {
      console.log("function task popup: " + task.id);
      setTaskId(task.id);
    }
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
  }, [isOpen, task]);

  const onEdit = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleUpdateClose = () => {
    setIsEditPopupOpen(false);
    onCancel();
    onTaskUpdate();
  };

  if (isClosing) return null;

  return isEditPopupOpen ? (
    <UpdateTaskPopup
      isOpen={isEditPopupOpen}
      onClose={closeEditPopup}
      onCloseFunctionOnTask={handleUpdateClose}
      taskId={taskId}
      task={task}
    />
  ) : (
    <div className={`blur-background ${animationClass}`}>
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className="popup-content text-center">
          <i className="fas fa-exclamation-circle fa-3x text-warning"></i>
          <h2>What do you want to do?</h2>
          <p>{message}</p>
          <button className="btn btn-secondary mt-3 Cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger ms-3 mt-3 Delete" onClick={onDelete}>
            Yes, delete it!
          </button>
          <button className="btn btn-primary ms-3 mt-3 Edit" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
