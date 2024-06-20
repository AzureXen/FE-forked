import React, { useEffect, useState } from 'react';
import '../../css/popup.css';
import { useToast } from '../../context/ToastContext';
import ActivitesRequest from '../../model/ActivitesRequest';
import { ApiAddActivities } from '../../apis/MentorApis/ApiAddActivities';

interface InsertActivitesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number | null;
}

export const InsertActivitesPopup: React.FC<InsertActivitesPopupProps> = ({ isOpen, onClose, courseId }) => {
  const [animationClass, setAnimationClass] = useState('popup-entering');
  const [isClosing, setIsClosing] = useState(false);
  const { showToast } = useToast();
  const [taskContent, setTaskContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAnimationClass('popup-entering');
      setTimeout(() => {
        setAnimationClass('popup-entered');
      }, 100);
    } else {
      setAnimationClass('popup-exiting');
      setTimeout(() => {
        setIsClosing(true);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (courseId) {
        // Parse the date strings into Date objects
        // const parsedStartDate = new Date(startDate);
        // const parsedEndDate = new Date(endDate);
        
        // const courseData: ActivitesRequest = { 
        //   taskContent, 
        //   startDate: parsedStartDate, 
        //   endDate: parsedEndDate 
        // };

        // await ApiAddActivities(courseData, courseId);
        // showToast('Activities added successfully!', 'success');
        // onClose();
      }
    } catch (error) {
      showToast('Error adding activities!', 'error');
    }
  };

  if (isClosing) return null;

  return (
    <div className={`blur-background ${animationClass}`}>
      <div className='container d-flex align-items-center justify-content-center h-100'>
        <div className={`popup-content`}>
          <h2>Add Activities For Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <textarea
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  required
                ></textarea>
                <label>Task Content</label>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6 col-sm-12">
                <div className="styled-input">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="styled-input">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Activities</button>
          </form>
          <i className="fa-solid fa-x position-absolute top-0 end-0" id='x-button' onClick={onClose}></i>
          <button className="btn btn-secondary position-absolute bottom-0 start-50 translate-middle-x close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
