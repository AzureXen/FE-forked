import React, { useEffect, useState } from 'react';
import '../../css/popup.css';
import { useToast } from '../../context/ToastContext';
import JobByCompanyResponse from '../../model/JobByCompanyResponse';
import { ApiUpdateJob } from '../../apis/ApiUpdateJob';

interface UpdateUserInSystemPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobInComay: JobByCompanyResponse | null;
  onJobUpdated: () => void;
}

export const UpdateJobInCompanyPopup: React.FC<UpdateUserInSystemPopupProps> = ({ isOpen, onClose, jobInComay, onJobUpdated }) => {
  const [animationClass, setAnimationClass] = useState('popup-entering');
  const [isClosing, setIsClosing] = useState(false);
  const { showToast } = useToast();
  const [jobDescription, setJobDescription] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAnimationClass('popup-entering');
      setTimeout(() => {
        setAnimationClass('popup-entered');
      }, 100);
      if (jobInComay) {
        setJobDescription(formatTextForTextarea(jobInComay.jobDescription));
      }
    } else {
      setAnimationClass('popup-exiting');
      setTimeout(() => {
        setIsClosing(true);
      }, 300);
    }
  }, [isOpen, jobInComay]);

  const formatTextForTextarea = (text: string) => {
    return text.split("\\n").join("\n");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (jobInComay) {
        const formattedDescription = jobDescription.replace(/\n/g, '\\n');
        await ApiUpdateJob(formattedDescription, jobInComay.id);
        showToast('Job description updated!', 'success');
        onClose();
        onJobUpdated();
      }
    } catch (error) {
      showToast('Error updating job description!', 'error');
    }
  };

  if (isClosing) return null;

  return (
    <div className={`blur-background ${animationClass}`}>
      <div className='container d-flex align-items-center justify-content-center h-100'>
        <div className={`popup-content`}>
          <h2>Update Job Application</h2>
          <form onSubmit={handleSubmit}>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input
                  type="text"
                  id="input"
                  value={jobInComay?.jobName || ''}
                  required
                />
                <label>Name</label>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                ></textarea>
                <label>Job Description</label>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6 col-sm-12">
                <div className="styled-input" style={{ float: "right" }}></div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
          <i className="fa-solid fa-x position-absolute top-0 end-0" id='x-button' onClick={onClose}></i>
          <button className="btn btn-secondary position-absolute bottom-0 start-50 translate-middle-x close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
