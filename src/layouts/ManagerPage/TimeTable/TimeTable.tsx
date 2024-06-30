import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views, NavigateAction, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './CustomToolbar'; // Import the custom toolbar
import "../../../css/Manager/ManagerTimeTable.css";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);

  useEffect(() => {
    const eventsData = [
      {
        title: 'Meeting with John',
        start: '2024-07-01T10:00:00',
        end: '2024-07-01T12:00:00',
      },
      {
        title: 'Lunch Break',
        start: '2024-07-01T13:00:00',
        end: '2024-07-01T14:00:00',
      },
      {
        title: 'Conference',
        start: '2024-07-02T09:00:00',
        end: '2024-07-02T17:00:00',
      },
      {
        title: 'Dentist Appointment',
        start: '2024-07-03T11:00:00',
        end: '2024-07-03T12:00:00',
      },
    ];

    const formattedEvents = eventsData.map(event => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    setEvents(formattedEvents);
  }, []);

  const handleNavigate = (newDate: Date, newView: View, action: NavigateAction) => {
    console.log('Navigating to new date:', newDate);
    console.log('Current view:', newView);
    console.log('Navigate action:', action);
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    console.log('Changing view to:', newView);
    setView(newView);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        view={view}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        components={{
          toolbar: CustomToolbar, // Use the custom toolbar
        }}
      />
    </div>
  );
};

export default MyCalendar;
