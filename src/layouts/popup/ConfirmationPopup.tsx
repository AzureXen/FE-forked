import React, { useEffect, useState } from "react";
import "../../css/popup.css";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  const [animationClass, setAnimationClass] = useState("popup-entering");
  const [isClosing, setIsClosing] = useState(false);

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

  if (isClosing) return null;

  return (
    <div className={`blur-background ${animationClass}`}>
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className="popup-content text-center">
          <i className="fas fa-exclamation-circle fa-3x text-warning"></i>
          <h2>Are you sure?</h2>
          <p>{message}</p>
          <button className="btn btn-secondary me-3 mt-3" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger ms-3 mt-3" onClick={onConfirm}>
            Yes, delete it!
          </button>
        </div>
      </div>
    </div>
  );
};
