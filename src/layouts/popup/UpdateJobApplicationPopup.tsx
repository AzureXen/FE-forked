import React from 'react';
import '../../css/popup.css'; // Nhớ import CSS đã tạo
import { JobApplication } from '../../model/JobApplication';

interface UpdateJobApplicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobApplication: JobApplication | null;
}

export const UpdateJobApplicationPopup: React.FC<UpdateJobApplicationPopupProps> = ({ isOpen, onClose, jobApplication }) => {
  if (!isOpen || !jobApplication) return null;

  return (
    <div className='blur-background'>
      <div className='d-flex align-items-center justify-content-center h-100'>
        <div className='popup-content'>
          <h2>Update Job Application</h2>
          <p>Full Name: {jobApplication.fullName}</p>
          <p>ID: {jobApplication.id}</p>
          <p>Email: {jobApplication.email}</p>
          <p>Status: {jobApplication.status}</p>
          <p>Content for the popup goes here.</p>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};