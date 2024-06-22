import React, { useEffect, useState } from 'react';
import "../../../css/managertable.css"; // Import CSS
import { HeaderWorkplace } from '../../HeaderAndFooter/HeaderWorkplace';
import { NavbarManager } from '../../HeaderAndFooter/Navbar/NavbarManager';
import { Footer } from '../../HeaderAndFooter/Footer';
import { CourseMentorCard } from '../Component/CourseMentorCard';
import { ViewAllCourseMentor } from '../Component/ViewAllCourseMentor';
import { NavbarMentor } from '../../HeaderAndFooter/Navbar/NavbarMentor';
import { ViewAllActivitesByTable } from '../Component/ViewAllActivitesByTable';

export const MentorViewAllActivitiesInCourse: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState<{ user_id: number } | null>(null);
  const [mentorId, setMentorId] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setMentorId(parsedUser.user_id);
    }
  }, []);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace />
      <div>
      <NavbarMentor/>
      </div>
      <div>
        
        {/* <>
          {mentorId !== 0 && <CourseMentorCard mentorId={mentorId} />}
        </> */}
        <ViewAllActivitesByTable/>
        {/* <ShowCourse/> */}
      </div>
      <Footer />
    </div>
  );
};
