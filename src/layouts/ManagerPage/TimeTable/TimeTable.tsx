import React, { useState, useEffect } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  NavigateAction,
  View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar"; // Import the custom toolbar
import "../../../css/Manager/ManagerTimeTable.css";
import EventComponent from "./EventComponent";
import { ApiGetSchedule } from "../../../apis/MentorApis/ApiGetSchedule";
import { Footer } from "../../HeaderAndFooter/Footer";
import { NavbarManager } from "../../HeaderAndFooter/Navbar/NavbarManager";
import { HeaderWorkplace } from "../../HeaderAndFooter/HeaderWorkplace";
import { motion } from "framer-motion";
const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);
  const [companyId, setCompanyId] = useState<string>("");
  const [user, setUser] = useState<{ company_id: number;fullName: string;} | null>(null);
  const [fullNameOnGoingUser, setFullNameOnGoingUser] = useState<string>("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCompanyId(parsedUser.company_id.toString());
      setFullNameOnGoingUser(parsedUser.fullName);
    }
  }, []);

  useEffect(() => {
    if (companyId && fullNameOnGoingUser) {
      fetchEvents();
    }
  }, [companyId,fullNameOnGoingUser]);

  const fetchEvents = async () => {
    try {
      const eventsData = await ApiGetSchedule(parseInt(companyId, 10));
      const formattedEvents = eventsData.map((event: any) => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        description: event.description,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleNavigate = (
    newDate: Date,
    newView: View,
    action: NavigateAction
  ) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };
  const text1 = `Timetable's ${fullNameOnGoingUser}`.split(" ");
  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace/>
      <div>
        <NavbarManager/>
      </div>
      <motion.div
      className="container-app-time"
      initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
      >
      <h1 className="time-h1">
              {text1.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.1 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>
        <Calendar
          className="mb-5 mt-5"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 1000 }}
          date={currentDate}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          view={view}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
          }}
        />
      </motion.div>
      <Footer/>
    </div>
  );
};

export default MyCalendar;
