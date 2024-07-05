import React, { useEffect, useState } from "react";
import "../../css/popup.css";
import { useToast } from "../../context/ToastContext";
import UserInSysTem from "../../model/UserInSysTem";
import { wait } from "@testing-library/user-event/dist/utils";
import { ApiViewInternDetail } from "../../apis/ManagerApis/ApiViewInternDetail";
import InternDetail from "../../model/Intern/InternDetail";
import InternDetailRequest from "../../model/Mentor/InternDetailRequest";
import { ApiUpdateInternDetail } from "../../apis/ManagerApis/ApiUpdateInternDetail";

interface UpdateUserInSystemPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userInSysTem: UserInSysTem | null;
  //   onUpdateStatus: (id: number, status: number) => void;
}

export const UpdateUserInSystemPopup: React.FC<
  UpdateUserInSystemPopupProps
> = ({ isOpen, onClose, userInSysTem }) => {
  const [animationClass, setAnimationClass] = useState("popup-entering");
  const [isClosing, setIsClosing] = useState(false);
  const { showToast } = useToast();
  const [internDetail, setInternDetail] = useState<InternDetail>();
  const [workHistory, setWorkHistory] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAnimationClass("popup-entering");
      setTimeout(() => {
        setAnimationClass("popup-entered");
      }, 100);
      if (userInSysTem) {
      }
    } else {
      setAnimationClass("popup-exiting");
      setTimeout(() => {
        setIsClosing(true);
      }, 300);
    }
  }, [isOpen, userInSysTem]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInSysTem) {
          const data = await ApiViewInternDetail(userInSysTem.id);
          setEducation(data.education_background);
          setWorkHistory(data.work_history);
        }
      } catch (error) {}
    };
    fetchData();
  }, [userInSysTem]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (userInSysTem) {
        const internReq=new InternDetailRequest(workHistory,education);
        await ApiUpdateInternDetail(internReq, userInSysTem.id);
        showToast('Details updated successfully!', 'success');
        onClose();
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
          <h2>Update Job Application</h2>
          <form onSubmit={handleSubmit}>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input
                  type="text"
                  id="input"
                  value={userInSysTem?.fullName || ""}
                  required
                />
                <label>Name</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="styled-input">
                  <input
                    type="text"
                    id="input"
                    value={userInSysTem?.email || ""}
                    required
                  />
                  <label>Email</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="styled-input" style={{ float: "right" }}></div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input type="text" id="input" value={workHistory} onChange={(e) => setWorkHistory(e.target.value)}/>
                <label>Work History</label>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input type="text" id="input" value={education} onChange={(e) => setEducation(e.target.value)}/>
                <label>Education Background</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
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
